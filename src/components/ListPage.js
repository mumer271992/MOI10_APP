import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import axios from 'axios';
import AddListItemModal from '../components/AddListItemModal';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import AddListModal from '../components/AddListModal';
import { addListItem } from '../actions/lists';
import { history } from '../routers/AppRouter';
import OptionModal from '../components/OptionModal';

class ListPage extends React.Component {
    constructor(props){
        super(props);
        const id = props.match.params.id;
        this.fetchCurrentList(id);
    }
    fetchCurrentList(id){
        axios.get(`http://localhost:1337/list/fetch/${id}`)
        .then((res) => {
            console.log(res.data);
            this.setState(()=> ({
                item: res.data
            }));
        })
        .catch((err) => {
            console.log("Error: ", err);
        });
    }
    showAddItemModal = () => {

        console.log("Show Add list item modal");
        if(!this.props.uid){
            this.openLoginModal();
        }
        else{
            this.setState(() => ({
                currentAction: 'ADD_LIST_ITEM',
                showAddItemModal: true
            }));
        }
    }
    close = (e) => {
        this.setState(()=> ({
            showLoginModal: false,
            showSignupModal: false,
            showAddItemModal: false,
            showAddListModal: false,
            showOptionModal: false
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
    onSuccessHandler = () => {
        console.log("User successfully Loggedin.");
        this.setState(() => ({
          showLoginModal: false,
          showSignupModal: false
        }));
        console.log(this.props.uid);
        if(this.props.uid){
            if(this.state.currentAction === 'ADD_LIST'){
                this.openAddListModal();
            }
            else {
                this.showAddItemModal();
            }
        }
    }
    onSuccessFullAddItem = (list_item)=> {
        console.log(list_item);
        this.setState(()=> ({
            showAddItemModal: false
        }));
        this.setState((prevState)=> {
            let updated_item = prevState.item;
            updated_item.items = [
                ...updated_item.items,
                list_item
            ];
            return{
                item: updated_item,
                showOptionModal: true
            }
        });
        
        //this.props.dispatch(addListItem(list_item));
    }
    showAddListModal = () => {
        this.setState(() => ({
            showLoginModal: false,
            showSignupModal: false,
            showAddItemModal: false,
            showAddListModal: true
        }));
    }

    addListSuccessHandler = (new_list) => {
        console.log("New List Added SuccessFully");
        console.log(new_list);
        // this.props.dispatch(addList(new_list));
        this.setState(() => ({
            showAddListModal: false
        }));
        console.log("Props");
        console.log(this.props);
        this.props.history.push(`/list/${new_list.id}`);
        //history.push(`/list/${new_list.id}`);
    }
    state = {
        currentAction: '',
        openAddItemModal: false,
        showAddListModal: false,
        showLoginModal: false,
        showSignupModal: false,
        item: { name: '', description: '', items: []},
        showOptionModal: false
    }
    onYes = () => {
        this.showAddItemModal();
    }
    componentWillReceiveProps(nextProps){
        const id = nextProps.match.params.id;
        this.fetchCurrentList(id);
    }
    render() {
        return (
            <div>
                <Header />
                <div className="page-content">
                    <div className="row">
                        <div className="col-md-9">
                            <h1>{this.state.item.name}</h1>
                        </div>
                        <div className="col-md-3 list-action-buttons">
                            <button className="btn btn-primary d-block action-button bg-darkblue add_list_button"
                                onClick={this.showAddListModal}
                            >New List</button>
                            <button className="btn btn-light d-block action-button outline-darkblue add_item_button"
                                onClick={this.showAddItemModal}
                            >Add Item to List</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-9">
                            {
                                this.state.item.items.map((item) => (
                                    <ListItem 
                                        key={item.id}
                                        itemName={item.name}
                                        itemDescription={item.description}
                                    />
                                ))
                            }
                        </div>
                        <div className="col-md-3">
                        </div>
                    </div>
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
                        listId={this.state.item.id}
                        listName={this.state.item.name}
                        close={this.close}
                        onSuccess={this.onSuccessFullAddItem}
                    />
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state, props) => ({
    uid: state.auth && state.auth.uid ? state.auth.uid : undefined
});
export default connect(mapStateToProps)(ListPage);