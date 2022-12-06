import React,{Fragment} from 'react'
import classes from './Header.module.css'
import logo from  '../../assets/logo.png'
import mealImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
  return (
    <Fragment>
      <header>
        <img src={logo} alt="logo" className={classes.logo} />
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealImage} alt="food" />
      </div>

    </Fragment>
  )
}

export default Header
