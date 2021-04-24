import React, { Component } from  'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary'

const errorHandler = (WrapperdComponents, axios) =>{
    return class extends Component {
        state={
            error: null
        }
        componentWillMount () {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(null, error =>{
                // console.error('inside interceptor')
                this.setState({error: error})
                // return Promise.reject(error);
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
           return  (
           <Aux>
           <Modal show={this.state.error}
           modalClose={this.errorConfirmedHandler}>
              {this.state.error? this.state.error.message: null}
           </Modal>
           <WrapperdComponents {...this.props} />
       </Aux>
           )
        }
        
    }
}

export default errorHandler;