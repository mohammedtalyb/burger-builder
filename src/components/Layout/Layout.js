import React from 'react';
import classes from './Layout.css';
import Aux from '../../Hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
    return (
        <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={classes.Contents}>
            {props.children}
        </main>
        </Aux>
    );
}

export default layout;