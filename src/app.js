import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import 'bootstrap/dist/js/bootstrap.min.js'
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
// import 'normalize.css/normalize.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
// import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
console.log("Store Initialized");
console.log(store.getState());
const unsubscribe = store.subscribe(() => {
    console.log("State is updated");
    console.log(store.getState());
});
const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
);


ReactDOM.render(jsx, document.getElementById('app'));
// let hasRendered = false;
// const renderApp = () => {
//   if (!hasRendered) {
//     ReactDOM.render(jsx, document.getElementById('app'));
//     hasRendered = true;
//   }
// };

// ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     renderApp();
//     if (history.location.pathname === '/') {
//       history.push('/dashboard');
//     }
//   } else {
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });
