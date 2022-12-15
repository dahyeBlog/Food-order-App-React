import React, { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `${props.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <div className={classes.mealItem}>
      <ul>
        <li>
          <h3>{props.name}</h3>
          <div className={classes.mealDec}>{props.description}</div>
          <div className={classes.price}>{price}</div>
          <div className={classes.mealImg}>
          <img src={props.image} alt={props.name} />
          </div>
          <MealItemForm onAddToCart={addToCartHandler} />
        </li>
      </ul>
    </div>
  );
};

export default MealItem;
