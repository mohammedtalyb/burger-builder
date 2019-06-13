import React from 'react';
import classes from './Modal.css'
import BackDrop from '../Backdrop/Backdrop';
import Aux from '../../../Hoc/Aux';

const modal = (props) => {
    return (
        <Aux>
            <BackDrop show={props.show} closeModal={props.closeModal}/>
            <div 
            className={classes.Modal}
            style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                     opacity: props.show ? '1' : '0'}}
            >
            { props.children}
        </div>
        </Aux>
    );
}

export default modal;