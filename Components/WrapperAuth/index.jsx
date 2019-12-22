/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, Fade } from 'reactstrap';
import Modal from 'react-responsive-modal'
import { CSSTransitionGroup } from 'react-transition-group';
import MODAL_ACTIONS from './actions.js';
import { BrowserRouter, NavLink, Switch } from 'react-router-dom';


class WrapperAuth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.isLogged = props.isLogged == false ? props.isLogged : true
        this.state.ref = props.ref;
        this.state.fadeIn = true;
        console.log(props);
    }
    componentDidMount() {

    }


    render() {

        if (this.props.auth.is_logged == this.state.isLogged) {
            return this.props.children;
        } else {
            return   <span class="hidden"></span>

        }

    }
}


const mapStateToProps = (state) => {

    return {

        auth: state.AuthReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {



    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WrapperAuth);