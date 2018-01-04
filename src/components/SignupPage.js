import React from 'react';
import { connect } from 'react-redux';

export const SignupPage = ({ startLogin, history }) => (
  <div className="container">
  <div className="box-layout">
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Sign Up</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log("Login");
          history.push('/dashboard');
        }}>
          <div className="form-group">
            <label for="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter Full Name" />
          </div>
          <div className="form-group">
            <label for="email">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Email" />
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <label for="password">Confirm Password</label>
            <input type="password" className="form-control" id="password" placeholder="Confirm Password" />
          </div>
          <button type="submit" className="btn btn-primary full-width">
            Sign Up
          </button>
          <div className="divider"></div>
          <small id="note" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </form>
      </div>
    </div>
    </div>
  </div>
);
export default connect()(SignupPage);

// const mapDispatchToProps = (dispatch) => ({
//   startLogin: () => dispatch(startLogin())
// });

// export default connect(undefined, mapDispatchToProps)(LoginPage);
