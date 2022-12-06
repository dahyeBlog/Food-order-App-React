import React,{useContext} from 'react'
import MealItemForm from './MealItemForm'
import CartContext from '../../../store/cart-context'


const MealItem = (props) => {    
  const cartCtx = useContext(CartContext)

  const price = `${props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`

  
  const addToCartHandler = (amount) => {
    cartCtx.addItem({ 
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,})
    
    
  } 



  return (
    <li>
      <div>
        <h3>{props.name}</h3>
        <div>{props.description}</div>
        <div>{price}</div>
        <img src={props.image} alt={props.name} />
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}

export default MealItem