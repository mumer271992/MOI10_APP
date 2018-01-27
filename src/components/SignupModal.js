import React from 'react';
import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Modal, Button } from 'react-bootstrap';

class SignupModal extends React.Component {

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: undefined
    }

    nameChangeHandler = (e) => {
        e.persist();
        console.log("Name is changing");
        this.setState(() => ({
            name: e.target.value
        }))
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

    confirmPasswordChnageHandler = (e) => {
        e.persist();
        this.setState(() => ({
            confirmPassword: e.target.value
        }));
    }

    submitSignupRequest = (e) => {
        e.persist();
        e.preventDefault();
        console.log(this.state);
        this.setState(() => ({
            error: undefined
        }));
        if(this.state.password !== this.state.confirmPassword){
            this.setState(() => ({
                error: 'Both passwords should be same'
            }));
            return;
        }

        axios.post(
            'http://api.moi10.com/auth/signup',
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
        )
        .then(this._handleSignupResponse)
        .catch((err)=> {
            console.log("Error: ",err);
        });
    }

    _handleSignupResponse = (res) => {
        console.log("Api response");
        console.log(res);
        if(res.data && res.data.token){
            this.props.dispatch(login({uid: res.data.token, user: res.data.user}));
            localStorage.setItem('auth_token',res.data.token);
            localStorage.setItem('user',JSON.stringify(res.data.user));
            this.props.onSuccess();

        }
    }

    // componentDidMount = () => {
    //     $(ReactDOM.findDOMNode(this.refs.signup_modal)).modal({
    //         backdrop: "static",
    //         show: false
    //     });
    // }
    // componentDidUnmount = () => {
    //     $(ReactDOM.findDOMNode(this.refs.signup_modal)).off();
    // }
    // show = () => {
    //     $(ReactDOM.findDOMNode(this.refs.signup_modal)).modal("show");
    // }
    // hide = () => {
    //     $(ReactDOM.findDOMNode(this.refs.signup_modal)).modal("hide");
    // }
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.close}>
                <Modal.Body>
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Sign Up</h3>
                            <form onSubmit={this.submitSignupRequest}>
                                <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter Full Name" 
                                    value={this.state.name}
                                    onChange={this.nameChangeHandler} 
                                />
                                </div>
                                <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={this.emailChangeHandler}
                                />
                                </div>
                                <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.passwordChangeHandler}
                                />
                                </div>
                                <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" className="form-control" id="password" placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.confirmPasswordChnageHandler}
                                />
                                </div>
                                {this.state.error && <p>{this.state.error}</p>}
                                <button type="submit" className="btn btn-primary full-width">
                                Sign Up
                                </button>
                                <div className="divider"></div>
                                <small id="note" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </form>
                            <p>Already a member? </p>
                            <a onClick={
                                () => {
                                    this.props.openLoginModal();
                                }
                            }>Login</a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
    // render() {
    //     return (
    //         <div ref="signup_modal" className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //             <div className="modal-dialog small-modal" role="document">
    //                 <div className="modal-content">
    //                     <div className="modal-body">
    //                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
    //                             <span aria-hidden="true">&times;</span>
    //                         </button>
    //                         <div className="card">
    //                             <div className="card-body">
    //                                 <h3 className="card-title">Sign Up</h3>
    //                                 <form onSubmit={this.submitSignupRequest}>
    //                                     <div className="form-group">
    //                                     <label for="name">Name</label>
    //                                     <input type="text" className="form-control" id="name" placeholder="Enter Full Name" 
    //                                         value={this.state.name}
    //                                         onChange={this.nameChangeHandler} 
    //                                     />
    //                                     </div>
    //                                     <div className="form-group">
    //                                     <label for="email">Email</label>
    //                                     <input type="email" className="form-control" id="email" placeholder="Enter Email"
    //                                         value={this.state.email}
    //                                         onChange={this.emailChangeHandler}
    //                                     />
    //                                     </div>
    //                                     <div className="form-group">
    //                                     <label for="password">Password</label>
    //                                     <input type="password" className="form-control" id="password" placeholder="Password"
    //                                         value={this.state.password}
    //                                         onChange={this.passwordChangeHandler}
    //                                     />
    //                                     </div>
    //                                     <div className="form-group">
    //                                     <label for="password">Confirm Password</label>
    //                                     <input type="password" className="form-control" id="password" placeholder="Confirm Password"
    //                                         value={this.state.confirmPassword}
    //                                         onChange={this.confirmPasswordChnageHandler}
    //                                     />
    //                                     </div>
    //                                     {this.state.error && <p>{this.state.error}</p>}
    //                                     <button type="submit" className="btn btn-primary full-width">
    //                                     Sign Up
    //                                     </button>
    //                                     <div className="divider"></div>
    //                                     <small id="note" className="form-text text-muted">We'll never share your email with anyone else.</small>
    //                                 </form>
    //                                 <p>Already a member? </p>
    //                                 <a onClick={
    //                                     () => {
    //                                         this.hide();
    //                                         this.props.openLoginModal();
    //                                     }
    //                                 }>Login</a>
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
    
});
export default connect(mapStateToProps, null, null, {withRef: true})(SignupModal);