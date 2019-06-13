import React from 'react';
import classes from './Layout.css';
import Aux from '../../Hoc/Aux';

const layout = (props) => {
    return (
        <Aux>
        <div>Toolbar, SideDrawer, BackDrop</div>
        <main className={classes.Contents}>
            {props.children}
        </main>
        </Aux>
    );
}

export default layout;