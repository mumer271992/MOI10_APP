import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import LoginModal  from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import { history } from '../routers/AppRouter';
import {logout} from '../actions/auth';

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
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    this.props.dispatch(logout());
    history.push("/");
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
            <div className="col-md-6">
              <h1 className="i-b"><Link to="/">MOI 10</Link></h1>
              <p className="i-b p-l p-r no-m">List of the Most <br/>Important Things</p>
            </div>
            <div className="col-md-3">
              <form className="form">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" />
                </div>
                <span className="glyphicon glyphicon-search embeded-search-icon"></span>
              </form>
            </div>
            <div className="col-md-3">
              <div className="action-section">
                <button className="btn btn-primary"><span className="glyphicon glyphicon-align-left"></span>New List</button>
                <button className="btn btn-primary transparent-button"><span className="glyphicon glyphicon-plus"></span>Add Item to List</button>
              </div>
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
