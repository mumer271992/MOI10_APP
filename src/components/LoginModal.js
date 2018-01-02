import React from 'react';
import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Connect, connect } from 'react-redux';
import { login } from '../actions/auth';
import { Modal, Button } from 'react-bootstrap';

class LoginModal extends React.Component {
    state = {
        email: '',
        password: '',
        error: undefined
    }

    emailChangeHandler = (e) => {
        e.persist();
        this.setState(() => ({
            email: e.target.value
        }));
    }

    passwordChangeHandler = (e) => {
        e.persist();
        this.setState(() => ({
            password: e.target.value
        }));
    }

    login = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post(
            'http://api.moi10.com/auth/login',
            {
                email: this.state.email,
                password: this.state.password
            }
        )
        .then(this._handleLoginRespose)
        .catch((err)=> {
            console.log("Error:", err);
        });
    }

    _handleLoginRespose = (res) => {
        console.log("Login Response");
        console.log(res);
        if(true){
            this.props.dispatch(login(res.data.token));
            localStorage.setItem('auth_token',res.data.token);
            console.log(this.props);
            this.props.onSuccess();
        }
    }

    // componentDidMount = () => {
    //     $(ReactDOM.findDOMNode(this.refs.login_modal)).modal({
    //         backdrop: "static",
    //         show: false
    //     });
    // }
    // componentDidUnmount = () => {
    //     $(ReactDOM.findDOMNode(this.refs.login_modal)).off();
    // }
    // show = () => {
    //     $(ReactDOM.findDOMNode(this.refs.login_modal)).modal("show");
    // }
    // hide = () => {
    //     $(ReactDOM.findDOMNode(this.refs.login_modal)).modal("hide");
    // }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                
                <Modal.Body>
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title centered">Login</h2>
                            <form className="form" onSubmit={this.login}>
                                <div className="form-group">
                                <input type="email" className="form-control" id="email" placeholder="Email" 
                                    value={this.state.email}
                                    onChange={this.emailChangeHandler}
                                />
                                </div>
                                <div className="form-group">
                                <input type="password" className="form-control" id="password" placeholder="password"
                                    value={this.state.value}
                                    onChange={this.passwordChangeHandler}
                                />
                                </div>
                                <button type="submit" className="btn btn-success no-border login_button full-width bg-darkblue">
                                Log me in
                                </button>
                            </form>
                            <button type="button" className="btn btn-light facebook-primary-button no-border full-width outline-darkblue">
                                <i className="fa fa-facebook-official" aria-hidden="true"></i>
                                Login with facebook
                            </button>
                            <small id="note" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="foot_note centered">
                            <p>
                                New To MOI10? 
                                <a className="dark-blue" onClick={
                                    ()=> {
                                        this.props.openSignupModal();
                                    }
                                }>Signup</a>
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
    // render() {
    //     return (
    //         <div ref="login_modal" className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //             <div className="modal-dialog small-modal" role="document">
    //                 <div className="modal-content">
    //                     <div className="modal-body">
    //                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    //                             <span aria-hidden="true">&times;</span>
    //                         </button>
    //                         <div className="card">
    //                             <div className="card-body">
    //                                 <h2 className="card-title centered">Login</h2>
    //                                 <form className="form" onSubmit={this.login}>
    //                                     <div className="form-group">
    //                                     <input type="email" className="form-control" id="email" placeholder="Email" 
    //                                         value={this.state.email}
    //                                         onChange={this.emailChangeHandler}
    //                                     />
    //                                     </div>
    //                                     <div className="form-group">
    //                                     <input type="password" className="form-control" id="password" placeholder="password"
    //                                         value={this.state.value}
    //                                         onChange={this.passwordChangeHandler}
    //                                     />
    //                                     </div>
    //                                     <button type="submit" className="btn btn-success no-border login_button full-width bg-darkblue">
    //                                     Log me in
    //                                     </button>
    //                                 </form>
    //                                 <button type="button" className="btn btn-light facebook-primary-button no-border full-width outline-darkblue">
    //                                     <i className="fa fa-facebook-official" aria-hidden="true"></i>
    //                                     Login with facebook
    //                                 </button>
    //                                 <small id="note" className="form-text text-muted">We'll never share your email with anyone else.</small>
    //                             </div>
    //                             <div className="foot_note centered">
    //                                 <p>
    //                                     New To MOI10? 
    //                                     <a className="dark-blue" onClick={
    //                                         ()=> {
    //                                             this.hide();
    //                                             this.props.openSignupModal();
    //                                         }
    //                                     }>Signup</a>
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
}

const mapStateToProps = (state, props) => ({

})

export default connect(mapStateToProps, null,null, {withRef: true})(LoginModal);