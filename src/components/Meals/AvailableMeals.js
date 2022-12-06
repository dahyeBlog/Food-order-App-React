import React,{useState, useEffect} from 'react'
import classes from "./AvailableMeals.module.css"
import MealItem from './MealItem/MealItem'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch ('https://food-app-react-bf217-default-rtdb.firebaseio.com/menu.json')

      if(!response.ok) {
        throw new Error('에러가 발생했습니다.')
      }

      const responseData = await response.json()

      const loadedMeals = []

      for(const key in responseData) {
        loadedMeals.push({
          id:key,
          name: responseData[key].name,
          description: responseData[key].des,
          price: responseData[key].price,
          image: responseData[key].image
        })
      }

      setMeals(loadedMeals)

    }

    fetchMeals().catch((error) => {
      console.log(error);
      
    })

  }, [])


  const mealsList = meals.map((meal) => {
  return <MealItem 
    id={meal.id}
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}  
    image={meal.image}/>  
    })



  return (
    <section>
      <div className={classes.mealLists}>
        <ul>{mealsList}</ul>
      </div>
    </section>
  )
}

export default AvailableMeals