import React from 'react';
import ReactDOM from 'react-dom';
// import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Connect, connect } from 'react-redux';
import { login } from '../actions/auth';
import { Modal, Button } from 'react-bootstrap';
import { get, post } from '../helpers/axiosHelper';

class LoginModal extends React.Component {
    state = {
        email: '',
        password: '',
        error: undefined,
        loading: false
    }
    loading = false;
    fbloading = false;
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

    loginApp = (e) => {
        e.preventDefault();
        // axios.post(
        //     'http://api.moi10.com/auth/login',
        //     {
        //         email: this.state.email,
        //         password: this.state.password
        //     }
        // )
        // .then(this._handleLoginRespose)
        // .catch((err)=> {
        //     console.log("Error:", err);
        // });
        this.loading = true;
        this.setState(() => ({
            loading: true
        }));
        console.log(this.state);
        post('/auth/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(this._handleLoginRespose)
        .catch((err)=> {
            console.log("Error: ", err);
            if(err.response.data.error){
                let error = err.response.data.error;
                this.setState(() => ({
                    error: err.response.data.error
                }));
            }
            this.setState(() => ({
                loading: false
            }));
        });
    }

    _handleLoginRespose = (res) => {
        console.log("Login Response");
        console.log(res);
        if(true){
            this.props.dispatch(login({uid: res.data.token, user: res.data.user}));
            localStorage.setItem('auth_token',res.data.token);
            localStorage.setItem('user',JSON.stringify(res.data.user));
            console.log(this.props);
            this.props.onSuccess();
        }
        this.setState(() => ({
            loading: false
        }));
    }
    _handleFBLoginRespose = (res) => {
        console.log("Facebook Login");
        console.log(res);
        if(true){
            this.props.dispatch(login({uid: res.data.token, user: res.data.user}));
            localStorage.setItem('auth_token',res.data.token);
            localStorage.setItem('user',JSON.stringify(res.data.user));
            console.log(this.props);
            this.fbloading = false;
            this.props.onSuccess();
        }
        this.setState(() => ({
            fbloading: false
        }));
    }
    loginFacebook = (e) => {
        e.preventDefault();
        this.setState(() => ({
            fbloading: true
        }));

        FB.login((response) => {
            if(response.status == "connected"){
                console.log("Connected");
                console.log(response.authResponse.accessToken);
                axios.post(
                    'http://api.moi10.com/auth/fblogin',
                    {
                        access_token: response.authResponse.accessToken
                    }
                )
                .then((res) => {
                    console.log("Facebook Login");
                    console.log(res);
                    if(true){
                        this.props.dispatch(login({uid: res.data.token, user: res.data.user}));
                        localStorage.setItem('auth_token',res.data.token);
                        localStorage.setItem('user',JSON.stringify(res.data.user));
                        console.log(this.props);
                        this.fbloading = false;
                        this.setState(() => ({
                            fbloading: false
                        }));
                        this.props.onSuccess();
                    }
                })
                .catch((err)=> {
                    console.log("Error:", err);
                    this.setState(() => ({
                        fbloading: false
                    }));
                });
            }else{
              console.log("Not connected");
                this.setState(() => ({
                    fbloading: false
                }));
            }
    
          }, {scope: 'email,user_likes'});
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
                    <i className="fa fa-times cross-button" onClick={this.props.close}></i>
                    <div className="card">
                        <div className="card-body centered">
                            <h2 className="card-title centered">
                                Login
                            </h2>
                            <form className="form" onSubmit={this.loginApp}>
                                <div className="form-group">
                                <input type="email" className="form-control" id="email" placeholder="Email" 
                                    value={this.state.email}
                                    onChange={this.emailChangeHandler}
                                    required
                                />
                                </div>
                                <div className="form-group">
                                <input type="password" className="form-control" id="password" placeholder="password"
                                    value={this.state.value}
                                    onChange={this.passwordChangeHandler}
                                    required
                                />
                                <p className="red">{this.state.error}</p>
                                </div>
                                <button type="submit" className="btn btn-primary no-border full-width">
                                { !this.state.loading ? 'Log me in'  : (<div className="lds-dual-ring"></div>) }
                                </button>
                                
                            </form>
                            <button type="button" className="btn btn-light facebook-primary-button no-border full-width outline-darkblue"
                                onClick={this.loginFacebook}
                            >
                                { !this.state.fbloading ? (<span> <i className="fa fa-facebook-official" aria-hidden="true"></i> Login with facebook</span>) : (<div className="lds-dual-ring"></div>) }
                            </button>
                            <small id="note" className="form-text">We'll never share your email with anyone else.</small>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="foot_note centered">
                        <p>
                            New To MOI10? 
                            <button type="button" className="btn btn-default signup-button" onClick={
                                ()=> {
                                    this.props.openSignupModal();
                                }
                            }>Signup</button>
                        </p>
                    </div>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state, props) => ({

})

export default connect(mapStateToProps, null,null, {withRef: true})(LoginModal);