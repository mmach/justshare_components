/*
    ./client/components/App.js
*/
import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import Modal from 'react-responsive-modal';
import { CSSTransitionGroup } from 'react-transition-group';
import MODAL_ACTIONS from './actions.js';

class ModalComponent extends React.Component {
  constructor() {
    super();
    this.open = false;
  }

  onOpenModal() {
    this.setState({
      open: true
    });
  }

  onCloseModal() {
    this.props.closeWindow();
  }

  init() {
    this.open = false;
  }

  render() {
    let body = React.createElement("div", null, React.createElement(Modal, {
      open: this.props.modal.open,
      onClose: this.onCloseModal.bind(this),
      center: true,
      closeIconSize: 15,
      classNames: {
        modal: this.props.classWidth
      }
    }, this.props.modalType));
    return body;
  }

}

const mapStateToProps = state => {
  //console.log(state);
  return {
    modal: state.ModalComponentReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeAction: (open, action) => {
      dispatch({
        type: MODAL_ACTIONS.OPEN_MODAL,
        dto: {
          open: open,
          action: action
        }
      });
    },
    closeWindow: () => {
      dispatch({
        type: MODAL_ACTIONS.CLOSE_MODAL,
        dto: {
          open: false
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);