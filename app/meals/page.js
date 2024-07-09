import Link from "next/link";
import { Suspense } from "react";

import classes from "./page.module.css";
import { getMeals } from "@/lib/meals";
import ItemGrid from "@/components/itemGrid";

const Meals = async () => {
  const meals = await getMeals();

  return(
    <ItemGrid items={meals} type="meals" />
  )
}

const MealsMainPage = () => {
  
  

  return (
    <>
      <header className={classes.header}>
        <h1>Delicious meals, created{' '} <span className={classes.highlight}>by you</span></h1>
        <p>Choose your favorite recepy! It's easy and fun</p>
        <p className={classes.cta}><Link href="/meals/share">Share your favorite recepy</Link></p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Fetching meals</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

export default MealsMainPage;
