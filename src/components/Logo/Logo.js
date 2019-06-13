import React from 'react';
import classes from './Logo.css';
import BurgerLogo from '../../Assets/images/27.1 burger-logo.png.png';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt='Burger Logo' /> 
    </div>
);

export default logo;