import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => (
    <div className={classes.SideDrawer}>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <NavigationItems />
    </div>
);

export default sideDrawer;