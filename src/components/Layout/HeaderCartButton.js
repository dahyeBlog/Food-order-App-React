import React,{useContext} from 'react'
import classes from './HeaderCartButton.module.css'
import {BsFillCartFill} from 'react-icons/bs'
import CartContext from '../../store/cart-context'

const HeaderCartButton = (props) => {
const cartCtx = useContext(CartContext)

const {items} = cartCtx

const numberOfCartItems = items.reduce((curNumber, item) => {
  return curNumber + item.amount;
}, 0);


  


  return (
    <button className={classes.button} onClick={props.onClick}>
     <span className={classes.icon}>
      <BsFillCartFill />
      </span>
      <span>Cart</span>
      <span className={classes.budge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
