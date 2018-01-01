import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AddListModal from '../components/AddListModal';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import axios from 'axios';
import { setLists, addList } from '../actions/lists';
import { history } from '../routers/AppRouter';

class HomePage extends React.Component {
    state = {
        showAddListModal: false,
        showAddListItemModal: false,
        showLoginModal: false,
        showSignupModal: false
    }

    openAddListModal = (e) => {
        this.setState(() => ({
            showAddListModal: true
        }));
    }
    handleAddList = (e) => {
        console.log("List Added");
        this.setState(() => ({
            showAddListModal: false
        }));
    }
    openSignupModal = (e) => {
        console.log("Open Signup MOdal");
        this.setState(() => ({
          showLoginModal: false,
          showSignupModal: true
        }));
    }
    openLoginModal = () => {
        this.setState(() => ({
          showLoginModal: true,
          showSignupModal: false
        }));
    } 

    addNewList = () => {
        
        if(!this.props.uid){
            this.openLoginModal();
        }
        else{
            this.openAddListModal();
        }
    }

    onSuccessHandler = () => {
        console.log("User successfully Loggedin.");
        this.setState(() => ({
          showLoginModal: false,
          showSignupModal: false
        }));
        console.log(this.props.uid);
        if(this.props.uid){
            this.openAddListModal();
        }
    }
    addListSuccessHandler = (new_list) => {
        console.log("New List Added SuccessFully");
        console.log(new_list);
        // this.props.dispatch(addList(new_list));
        this.setState(() => ({
            showAddListModal: false
        }));
        history.push(`/list/${new_list.id}`);
    }

    componentDidMount() {
        axios.get('http://localhost:1337/list').then((res) => {
            console.log("Lists fetched");
            console.log(res.data);
            this.props.dispatch(setLists(res.data));
        })
    }

    close = () => {
        this.setState(() => ({
            showAddListModal: false,
            showAddListItemModal: false,
            showLoginModal: false,
            showSignupModal: false
        }));
      }

    render() {
        return (
            <div>
                <Header />
                <div className="page-content">
                    <div className="row">
                        <div className="col-md-10">
                            <ul className="list-group">
                                {this.props.lists.length && this.props.lists.map(list => (<li className="list-group-item" key={list.id}><Link to={`/list/${list.id}`}>{list.name}</Link></li>))}
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <button 
                                className="btn btn-primary d-block action-button full-width bg-darkblue add_list_button"
                                onClick={this.addNewList}
                            >New List</button>
                        </div>
                    </div>
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
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, props) => ({
    uid: state.auth && state.auth.uid ? state.auth.uid : undefined,
    lists: state.lists ? state.lists : []
});

export default connect(mapStateToProps)(HomePage);

// <ul className="list-group">
// <li className="list-group-item"><Link to="">Cras justo odio</Link></li>
// <li className="list-group-item"><Link to=""> Dapibus ac facilisis in</Link></li>
// <li className="list-group-item"><Link to="">Morbi leo risus</Link></li>
// <li className="list-group-item"><Link to="" >Porta ac consectetur ac</Link></li>
// <li className="list-group-item"><Link to="">Vestibulum at eros</Link></li>
// <li className="list-group-item"><Link to="">Cras justo odio</Link></li>
// <li className="list-group-item"><Link to=""> Dapibus ac facilisis in</Link></li>
// <li className="list-group-item"><Link to="">Morbi leo risus</Link></li>
// <li className="list-group-item"><Link to="" >Porta ac consectetur ac</Link></li>
// <li className="list-group-item"><Link to="">Vestibulum at eros</Link></li>
// </ul>
// <button className="btn btn-light d-block action-button full-width outline-darkblue add_item_button">Add Item to List</button>