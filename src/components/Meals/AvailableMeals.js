import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
//import axios from "axios";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  // Getting Meals data using Axios
  //   useEffect(()=>{
  //    axios.get('https://foodkart-8d5ed-default-rtdb.firebaseio.com/meals.json').then(
  //     (response)=>{
  //       const data = response.data;
  //       const loadedMeals = [];

  //       for(const key in data){
  //         loadedMeals.push({
  //           id: key,
  //           name: data[key].name,
  //           description: data[key].description,
  //           price: data[key].price
  //         });
  //     }
  //     setMeals(loadedMeals);
  //   });
  // },[]);

  useEffect(() => {
    const fetchMealsHandler = async () => {
      const response = await fetch(
        "https://foodkart-8d5ed-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMealsHandler().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  let mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
        id={meal.id}
      />
    );
  });

  //DUMMY_MEALS.map((meal)=> <MealItem key={meal.id} name={meal.name} description={meal.description} price={meal.price} id={meal.id}/>);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
