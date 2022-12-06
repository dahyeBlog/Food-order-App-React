import {useRef} from 'react'
import Input from '../../UI/Input'
import classes from "./MealItemForm.module.css"

const MealItemForm = (props) => {
  const amountInputRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault()

    const enteredAmount = amountInputRef.current.value;

    const enteredAmountNumber = +enteredAmount

    if(enteredAmount.trim().length === 0 || 
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {

      return 
    }

    props.onAddToCart(enteredAmountNumber)
  }


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='수량'
        input={{
          id:'amount_'+ props.id,
          type:'number',
          min:'1',
          max:'5',
          step:'1',
          defaultValue:'1',
        }}
       />

      <button>추가</button>
    </form>
  )
}

export default MealItemForm
