import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import LoginModal  from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

class Header extends React.Component{
  state = {
    showLoginModal: false,
    showSignupModal: false
  }
  openLoginModal = (e) => {
    this.setState(() => ({
      showLoginModal: true
    }));
  }
  openSignupModal = (e) => {
    console.log("Open Signup MOdal");
    this.setState(() => ({
      showLoginModal: false,
      showSignupModal: true
    }));
    // setTimeout(()=> {
    //   this.setState(()=> ({
    //     showSignupModal: true
    //   }));
    // },1000);

    // this.refs.signup_modal.getWrappedInstance().show();
  }
  openLoginModal = () => {
    this.setState(() => ({
      showLoginModal: true,
      showSignupModal: false
    }));
    // console.log(this.refs);
    // this.refs.login_modal.getWrappedInstance().show();
  }
  onSuccessHandler = () => {
    console.log("User successfully Loggedin.");
    this.setState(() => ({
      showLoginModal: false,
      showSignupModal: false
    }));
    console.log(this.props.uid);
  }
  logout = (e) => {
    e.preventDefault();
    localStorage.setItem("auth_token",null);
    this.props.history.push("/");
  }
  close = () => {
    this.setState(() => ({
      showLoginModal: false,
      showSignupModal: false
    }));
  }
  render() {
    return (
      <div>
        <header className="header">
          <div className="row">
            <div className="col-md-3">
            <h1><Link to="/">MOI10.com</Link></h1>
            </div>
            <div className="col-md-3">
            <h1>Most Important 10</h1>
            </div>
            <div className="col-md-4">
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="search" />
                </div>
              </form>
            </div>
            <div className="col-md-2">
              { !this.props.uid ? 
                <button className="btn btn-success no-border" onClick={this.openLoginModal}>Login</button> : 
                <button className="btn btn-success no-border" onClick={this.logout}>Logout</button>
              }
            </div>
          </div>
        </header>
        <LoginModal 
          show={this.state.showLoginModal}
          close={this.close}
          openSignupModal={this.openSignupModal}
          onSuccess={this.onSuccessHandler}
        />
        <SignupModal
          show={this.state.showSignupModal}
          close={this.close}
          openLoginModal={this.openLoginModal} 
          onSuccess = {this.onSuccessHandler}
        />
      </div>
    )
  }
};

const mapStateToProps = (state, props) => ({
  uid: state.auth && state.auth.uid ? state.auth.uid : undefined
});
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});


export default connect(mapStateToProps)(Header);
