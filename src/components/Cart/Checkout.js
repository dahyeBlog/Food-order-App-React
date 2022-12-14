import React,{useState,useRef} from 'react'
import classes from './Checkout.module.css'


const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name:true,
    street:true,
    city:true,
    postalCode:true
  })

  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()

  const isEmpty = (value) => value.trim() === ''
  const isFiveChars = (value) => value.trim().length === 5

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    
    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)
  
    setFormInputsValidity({
      name:enteredNameIsValid,
      street:enteredStreetIsValid,
      city:enteredCityIsValid,
      postalCode:enteredPostalCodeIsValid
    })

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid

    if(!formIsValid) {
    return
  }

  props.onConfirm({
    name:enteredName,
    street:enteredStreet,
    city:enteredCity,
    postalCode:enteredPostalCode
  })
  


  };


const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
const postalCodeControlClasses = `${classes.control} ${
  formInputsValidity.postalCode ? '' : classes.invalid
}`;
const cityControlClasses = `${classes.control} ${
  formInputsValidity.city ? '' : classes.invalid
}`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">이름</label>
        <input type="text" id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>유효한 이름을 작성해 주세요.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>주소</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>유효한 주소를 작성해주세요!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>우편번호</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && <p>유효한 우편번호를(5자리) 작성해주세요!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>도시</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>유효한 도시를 작성해주세요!</p>}
      </div>

      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>


    </form>
  )
}

export default Checkout
