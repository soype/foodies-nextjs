"use server";

import sql from 'better-sqlite3';
import bcrypt from 'bcrypt';
import xss from 'xss';
import { cookies } from 'next/headers';

const db = sql('meals.db');
const saltRounds = 10;


export async function login(formData){

    const userId = formData.get('user');
    const password = formData.get('password');

    if(!userId || !password){
        return {success: false, message: "Username or password missing"};
    }
    
    const sanitizedUser = xss(userId);
    const sanitizedPassword = xss(password);
    
    let userCheck;
    if(sanitizedUser.includes('@')){
        const hashedEmail = await bcrypt.hash(sanitizedUser, saltRounds);
        const checkUserStmt = db.prepare(`
            SELECT * FROM users WHERE email=?
        `)
        userCheck = checkUserStmt.get(hashedEmail);
    }else{
        const checkUserStmt = db.prepare(`
            SELECT * FROM users WHERE username=?
        `)
        userCheck = checkUserStmt.get(sanitizedUser);
    }

    if(userCheck){
        const passwordMatch = await bcrypt.compare(sanitizedPassword, userCheck.password);
        if(passwordMatch){
            const expires = new Date(Date.now() + 10 * 1000);
            const session = {user: userCheck.username, expires};
            cookies().set('session', JSON.stringify(session), {expires, httpOnly: true});
            return { success: true, message: 'Login succesful'};
        }else{
            return { success: false, message: "Wrong password"};
        }
    }else{
        return { success: false, message: 'Username or email not found'};
    }

}