import React, { Component } from 'react';
import classes from './Layout.css';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSidedrawer: false
    }
   
    

    sideDrawerTogglehandler = () => {
        const isShowSideDrawer = !this.state.showSidedrawer;
        this.setState({ showSidedrawer: isShowSideDrawer });
    }

    render() {
        return (
            <Aux>
                <Toolbar show={this.state.showSidedrawer} toggle={this.sideDrawerTogglehandler} />
                <SideDrawer show={this.state.showSidedrawer} toggle={this.sideDrawerTogglehandler} />
                <main className={classes.Contents}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;