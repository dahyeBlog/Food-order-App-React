import React, { Fragment,useContext,useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  
  const totalAmount = `${cartCtx.totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)
    console.log(userData);
    await fetch(
      "https://food-app-react-bf217-default-rtdb.firebaseio.com/orders.json", 
   {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    }
  );
  setIsSubmitting(false);
  setDidSubmit(true);
  cartCtx.clearCart()
};

const cartItems = (
  <ul className={classes["cart-items"]}>
    {cartCtx.items.map((item) => (
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
      />
    ))}
  </ul>
);

const modalActions = (
  <div className={classes.actions}>
    <button className={classes["button--alt"]} onClick={props.onClose}>
      Close
    </button>
    {hasItems && (
      <button className={classes.button} onClick={orderHandler}>
        Order
      </button>
    )}
  </div>
);
  
const cartModalContent = (
  <Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>총 금액</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && (
      <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
    )}
    {!isCheckout && modalActions}
  </Fragment>
);

const isSubmittingModalContent = <p>주문 데이터 전송 중...</p>

const didSubmitModalContent =<React.Fragment>
<p>주문이 성공적으로 전송되었습니다🎉</p> 
<div className={classes.actions}><button className={classes.button} onClick={props.onClose}>Close</button></div>
</React.Fragment> 

return <Modal onClose={props.onClose}>{!isSubmitting && !didSubmit && cartModalContent}
{isSubmitting && isSubmittingModalContent}
{!isSubmitting && didSubmit && didSubmitModalContent}
</Modal>;

};

export default Cart;