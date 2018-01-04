import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin, history }) => (
  <div className="container">
    <div className="box-layout">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Log In</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            console.log("Login");
            history.push('/dashboard');
          }}>
            <div className="form-group">
              <label for="email">Email</label>
              <input type="email" className="form-control" id="email" placeholder="Email" />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="password" />
            </div>
            <button type="submit" className="btn btn-success full-width">
              Log me in
            </button>
            <div className="divider"></div>
          </form>
          <button type="button" className="btn btn-primary full-width">
            <i className="fa fa-facebook-official" aria-hidden="true"></i>
            Login with facebook
          </button>
          <small id="note" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div>
          <p>
            New To MOI10? 
            <a href="">Signup</a>
            <Link to="/signup"></Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
export default connect()(LoginPage);

// const mapDispatchToProps = (dispatch) => ({
//   startLogin: () => dispatch(startLogin())
// });

// export default connect(undefined, mapDispatchToProps)(LoginPage);
