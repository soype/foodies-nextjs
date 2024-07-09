import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {   
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower:true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop(); // Get if it's jpg or png
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`); // where we'll write
    const buffferedImage = await meal.image.arrayBuffer(); // convert image object to buffer so stream can write it

    stream.write(Buffer.from(buffferedImage), (error) => {
        if(error){
            throw new Error('Saving image failed!');
        }
    }); // pass buffered image so that stream writes it

    meal.image = `/images/${fileName}`; // Convert meal.image to just the url so that we only pass that to the DB. Public is not needed.

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)    
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal);

}