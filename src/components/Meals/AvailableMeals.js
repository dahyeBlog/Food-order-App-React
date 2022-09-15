import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css'

const DUMMY_MEALS = [
  {
    id: 'm1',
    name: '불고기',
    description: '얇게 저민 쇠고기를 양념에 재워 불에 구워 먹는 달콤하고 부드러운 불고기',
    price: 20000,
  },
  {
    id: 'm2',
    name: '닭갈비',
    description: '매콤한 고추장 양념에 버물려 볶은 닭갈비',
    price: 16000,
  },
  {
    id: 'm3',
    name: '삼겹살',
    description: '육질이 부드럽고 고소한 돼지고기를 직접 불판에 구워 먹는 삼겹살',
    price: 12000,
  },
  {
    id: 'm4',
    name: '떡볶이',
    description: '매콤 달달한 떡볶이',
    price: 10000,
  },
];


const AvailableMeals = () => {

  const mealsList = DUMMY_MEALS.map((meal) => (
   <MealItem
    id={meal.id}
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
     <Card>
      <ul>{mealsList}</ul>
     </Card>
    </section>
  )
}

export default AvailableMeals
