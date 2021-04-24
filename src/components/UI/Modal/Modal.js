import React, { Component } from 'react'
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.css'

class Modal extends Component{

    // componentDidUpdate(){
    //     console.log('Modal')
    //   }

    shouldComponentUpdate(nextProps, nextState) {
         return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
    componentDidUpdate(){
            console.log('Modal')
          }

    render(){
        return (
            <Aux>
                <div className={classes.Modal}
            style={{
                transform: this.props.show? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show? '1' : '0'
            }}>
                {this.props.children}
            </div>
            <Backdrop show={this.props.show} clicked={this.props.modalClose}/>
        
            </Aux>
            
        );
    }
}  

export default Modal;