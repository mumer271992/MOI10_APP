import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';
import LoginModal  from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import AddListModal from '../components/AddListModal';
import AddListItemModal from '../components/AddListItemModal';
import OptionModal from '../components/OptionModal';
import { history } from '../routers/AppRouter';
import {logout} from '../actions/auth';

class Header extends React.Component{
  state = {
    uid: '',
    list_id: '',
    currentAction: '',
    isMobile: false,
    showLoginModal: false,
    showSignupModal: false,
    showAddItemModal: false,
    showAddListModal: false,
    showOptionModal: false,
    showHeaderSearchBox: false,
    showMenu: false
  }

  constructor(props){
    super(props);
    this.state.list_id = props.list_id;
    this.state.uid = this.state.uid ? this.state.uid : props.uid;
    this.state.user = this.state.user ? this.state.user : props.user;
  }
  openLoginModal = (e) => {
    this.setState(() => ({
      showLoginModal: true,
      showMenu: false
    }));
  }
  openSignupModal = (e) => {
    console.log("Open Signup MOdal");
    this.setState(() => ({
      showLoginModal: false,
      showSignupModal: true,
      showMenu: false
    }));
  }
  openLoginModal = () => {
    this.setState(() => ({
      showLoginModal: true,
      showSignupModal: false,
      showMenu: false
    }));
  }
  onSuccessHandler = () => {
    console.log("User successfully Loggedin.");
    this.setState(() => ({
      showLoginModal: false,
      showSignupModal: false,
      showMenu: false
    }));
    if(this.props.uid){
      switch(this.state.currentAction){
          case 'ADD_LIST': 
              this.showAddListModal();
              break;
          case 'ADD_LIST_ITEM':
              this.showAddItemModal();
              break;
          default: 
              this.close();
      }
  }
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
      showSignupModal: false,
      showAddItemModal: false,
      showAddListModal: false,
      showOptionModal: false,
      showMenu: false
    }));
  }
  showAddListModal = () => {
    if(!this.props.uid){
      this.openLoginModal();
    }
    else{
        this.setState(() => ({
            currentAction: 'ADD_LIST',
            showAddListModal: true,
            showMenu: false
        }));
    }
  }
  showAddItemModal = () => {
    console.log("Show Add list item modal");
    if(!this.props.uid){
        this.openLoginModal();
    }
    else{
        this.setState(() => ({
            currentAction: 'ADD_LIST_ITEM',
            showAddItemModal: true,
            showOptionModal: false,
            showMenu: false
        }));
    }
  }
  addListSuccessHandler = (new_list) => {
    console.log("New List Added SuccessFully");
    console.log(new_list);
    // this.props.dispatch(addList(new_list));
    this.setState(() => ({
        showAddListModal: false,
        showMenu: false
    }));
    console.log("Props");
    console.log(this.props);
    history.push(`/${new_list.slug}`);
    //history.push(`/list/${new_list.id}`);
  }
  onSuccessFullAddItem = (list_item)=> {
    this.setState(()=> ({
        showAddItemModal: false,
        showMenu: false
    }));  
    this.setState((prevState)=> {
      return{
          showOptionModal: true,
          showMenu: false
      }
  });
    //this.props.dispatch(addListItem(list_item));
  }
  onYes = () => {
    this.showAddItemModal();
  }

  toogleSearchBar = () => {
    this.setState(() => ({
      showHeaderSearchBox: !this.state.showHeaderSearchBox    
    }));
  }

  toogleMenu = () => {
    console.log("toogle menu");
    this.setState(() => ({
      showMenu: !this.state.showMenu
    }));
  }
  ///////////////////////////////////////////// Window Resize Listener ////////////////////////////////
  /**
     * Calculate & Update state of new dimensions
     */
    updateDimensions() {
      if(window.innerWidth < 450) {
          this.setState(() => ({
              isMobile: true
          }));
      } else {
          this.setState(() => ({
              isMobile: false
          }));
      }
  }

  /**
   * Add event listener
   */
  componentDidMount() {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    return (
      <div>
        {
          !this.state.isMobile ? (
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
                    <button className="btn btn-primary" onClick={this.showAddListModal}><span className="glyphicon glyphicon-align-left"></span>New List</button>
                    <button className="btn btn-primary transparent-button" onClick={this.showAddItemModal}><span className="glyphicon glyphicon-plus"></span>Add Item to List</button>
                  </div>
                </div>
              </div>
            </header>
          ) : (
            <header className="header">
              <div className="d-flex flex-row justify-content-space-between text-center">
                <button className="btn" onClick={this.toogleMenu}><i className={`fa ${ !this.state.showMenu ? 'fa-bars' : 'fa-times'}`} aria-hidden="true"></i></button>
                <h1 className="i-b"><Link to="/">MOI 10</Link></h1>
                <button className="btn" onClick={this.toogleSearchBar}><i className={`fa ${ !this.state.showHeaderSearchBox ? 'fa-search' : 'fa-times'}`} aria-hidden="true"></i></button>
              </div>
              {
                this.state.showHeaderSearchBox && (
                  <form className="form">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <span className="glyphicon glyphicon-search embeded-search-icon"></span>
                  </form>
                )
              }
              {
                this.state.showMenu && (
                  <div className="d-flex flex-column mobile-menu">
                    <div className="menu-item">
                      List Information
                    </div>
                    <div className="menu-item">
                      Popular Lists
                    </div>
                    <div className="menu-item">
                      Top Contributters
                    </div>
                    <div className="menu-item" onClick={this.showAddListModal}>
                      New List 
                      <span className="glyphicon glyphicon-align-left pull-right"></span>
                    </div>
                    <div className="menu-item primary-bg" onClick={this.showAddItemModal}>
                      Add Item to List
                      <span className="glyphicon glyphicon-plus pull-right"></span>
                    </div>
                </div>
                )
              }
            </header>
          )
        }
        <OptionModal
          show={this.state.showOptionModal}
          close={this.close}
          yes={this.onYes}
          no={this.close}
        />
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
        <AddListModal 
            show={this.state.showAddListModal}
            close={this.close}
            onSuccess={this.addListSuccessHandler}
        />
        <AddListItemModal 
            show={this.state.showAddItemModal}
            listId={this.props.current_list.id}
            listName={this.props.current_list.name}
            close={this.close}
            onSuccess={this.onSuccessFullAddItem}
        />
      </div>
    )
  }
};

const mapStateToProps = (state, props) => ({
  uid: state.auth && state.auth.uid ? state.auth.uid : undefined,
  user: state.auth && state.auth.user ? state.auth.user : undefined,
  current_list: state.list
});
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});


export default connect(mapStateToProps)(Header);
