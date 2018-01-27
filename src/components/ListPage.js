import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import axios from 'axios';
import AddListItemModal from '../components/AddListItemModal';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
import AddListModal from '../components/AddListModal';
import { addListItem } from '../actions/lists';
import { setList , getList } from '../actions/list';
import { history } from '../routers/AppRouter';
import OptionModal from '../components/OptionModal';
import InfoModal from '../components/InfoModal';

class ListPage extends React.Component {
    keys = [];
    relevent_items = [];
    constructor(props){
        super(props);
        this.state.list_id = props.match.params.id;
        this.state.uid = this.state.uid ? this.state.uid : props.uid;
        this.state.user = this.state.user ? this.state.user : props.user;
        const id = props.match.params.id;
        this.fetchCurrentList(this.props.match.params.id);
    }
    componentDidUpdate(){
        console.log('Rendered');

        // if(this.props.current_list && this.props.current_list.id){
        //     // this.setState(()=> ({
        //     //     item: this.orderListItems(this.props.current_list)
        //     // }));
        // }
    }
    fetchCurrentList(id){
        const url = this.state.user && this.state.user.id ? 
                    `http://api.moi10.com/list/fetch/${id}?user_id=${this.state.user.id}` : 
                    `http://api.moi10.com/list/fetch/${id}`
        axios.get(url)
        .then((res) => {
            console.log(res.data);
            this.props.dispatch(setList(res.data))
            //this.keys = Object.keys(res.data.words_list);
            this.relevent_items = res.data.relevent_lists;
            this.keys = this.filterTopKeywords(res.data.words_list);
            this.setState(()=> ({
                item: this.orderListItems(res.data)
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
            showOptionModal: false,
            showInfoModal: false
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
        console.log("Login successfully");
        this.setState(() => ({
          showLoginModal: false,
          showSignupModal: false
        }));
        if(this.props.uid){
            // if(this.state.currentAction === 'ADD_LIST'){
            //     this.openAddListModal();
            // }
            // else {
            //     this.showAddItemModal();
            // }
            switch(this.state.currentAction){
                case 'ADD_LIST': 
                    this.openAddListModal();
                    break;
                case 'ADD_LIST_ITEM':
                    this.showAddItemModal();
                    break;
                case 'UP_VOTE':
                    console.log("UP_VOTE");
                    this.vote(this.state.selectedItemId, 'up');
                    break;
                case 'DOWN_VOTE':
                    console.log("DOWN_VOTE");
                    this.vote(this.state.selectedItemId, 'down');
                    break;
                default: 
                    this.close();
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
        list_id: '',
        uid: '',
        user: undefined,
        currentAction: '',
        openAddItemModal: false,
        showAddListModal: false,
        showLoginModal: false,
        showSignupModal: false,
        item: { name: '', description: '', items: []},
        showOptionModal: false,
        showInfoModal: false,
        selectedItemId: '',
        info: '',
        loading: false,
        keywordsList: []
    }
    onYes = () => {
        this.showAddItemModal();
    }
    // componentWillReceiveProps(nextProps){
    //     this.setState(() => ({
    //        uid: nextProps.uid,
    //        user: nextProps.user 
    //     }), ()=> {
    //         const id = nextProps.match.params.id;
    //         this.fetchCurrentList(id);
    //     });
    // }
    componentWillReceiveProps(nextProps){
        this.setState(() => ({
           uid: nextProps.uid,
           user: nextProps.user 
        }), () => {
            if(this.props.current_list && 
                this.props.current_list.id && 
                this.props.current_list.id === this.props.match.params.id){
                this.setState(()=> ({
                    item: this.orderListItems(this.props.current_list)
                }));
            }
            else {
                const id = nextProps.match.params.id;
                this.fetchCurrentList(id);
            }
        });
    }
    openInfoModal = (error) => {
        this.setState(()=> ({
            showLoginModal: false,
            showSignupModal: false,
            showAddItemModal: false,
            showAddListModal: false,
            showOptionModal: false,
            showInfoModal: true,
            info: error
        }));
    }

    voteItem = (id, type) => {
        if(type === 'up'){
            this.setState(() => ({
                currentAction: 'UP_VOTE',
                selectedItemId: id
            }));
        }
        else if(type === 'down'){
            this.setState(() => ({
                currentAction: 'DOWN_VOTE',
                selectedItemId: id
            }));
        };

        if(!this.props.uid){
            this.openLoginModal();
        }
        else{
            this.vote(id, type);
        }
    }

    vote = (id, type) => {
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${this.props.uid}`
            }
        }
        this.setState(() => ({
            loading: true
        }));
        axios.post(`http://api.moi10.com/vote/${id}`, 
            {
                item_id: id,
                vote: type === 'up' ? '+1' : '-1' 
            },
            config
        ).then((res)=> {
            if(res.data.success){
                this.setState(() => ({
                    loading: false
                }));
                console.log("Vote has been submitted.");
                this.fetchCurrentList(this.props.match.params.id);
            }
        }).catch((err) => {
            //console.log("Error: " , err);
            this.setState(() => ({
                loading: false
            }));
            this.openInfoModal(err.response.data.error);
        });
    }

    orderListItems = (input_item) =>{
        let new_array = input_item.items.map((item) => {
            if(!item.votes){
                item.votes = 0;
            }
            return item;
        });
        console.log(new_array);
        let sortedItems = new_array.sort((a, b)=> {
            return a.votes < b.votes ? 1 : -1;
        });
        console.log("Sorted Items");
        console.log(sortedItems);
        let item = input_item;
        item.items = sortedItems;
        console.log(item);
        return item;
    }

    filterTopKeywords(wordsMap){
        let topKeywords = [];
        //let sortedKeys = [];
        let keys = Object.keys(wordsMap);
        let sortedKeys = keys.sort((a, b) => {
            return wordsMap[a].word_score < wordsMap[b].word_score ? 1 : -1;
        });
        if(wordsMap){
            //let keys = Object.keys(wordsMap);
            if(sortedKeys.length > 20){
                sortedKeys = keys.slice(0,20);
            }
        }
        console.log(sortedKeys);
        return sortedKeys;
    }

    render() {
        return (
            <div>
                <Header list_id={this.props.match.params.id}/>
                <div className="row">
                    <div className="col-md-1"> 
                    </div>
                    <div className="col-md-7 listing-section">
                        <h3>Most Important 10</h3>
                        <h1>{this.state.item.name}</h1>
                        <div className="list-items">
                            {
                                this.state.item.items.map((item, index) => (
                                    <ListItem 
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        onVote = {this.voteItem}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-md-1">
                    </div>
                    <div className="col-md-3">
                        <div className="list-info right-section border">
                            <h3>List Information</h3>
                            <p>All Comments: <b>500</b></p>
                            <p>Date: <b>20 of December, 02:00 PM</b></p>
                            <p>Category: <b>Finance</b></p>
                            <div className="actions">
                                <a>Share <span className="glyphicon glyphicon-share"></span></a>
                                <a>Add to Favourite <span className="glyphicon glyphicon-heart"></span></a>
                            </div>
                        </div>
                        <div className="popular-lists right-section border">
                            <h3>Popular Lists</h3>
                            <div className="popular-list">
                                <p className="popular-list-name"><b>Founders of all times</b></p>
                                <p className="popular-list-comments">360 Comments</p>
                            </div>
                            <div className="popular-list">
                                <p className="popular-list-name"><b>Founders of all times</b></p>
                                <p className="popular-list-comments">360 Comments</p>
                            </div>
                            <div className="popular-list">
                                <p className="popular-list-name"><b>Founders of all times</b></p>
                                <p className="popular-list-comments">360 Comments</p>
                            </div>
                            <div className="popular-list">
                                <p className="popular-list-name"><b>Founders of all times</b></p>
                                <p className="popular-list-comments">360 Comments</p>
                            </div>
                            <div className="popular-list">
                                <p className="popular-list-name"><b>Founders of all times</b></p>
                                <p className="popular-list-comments">360 Comments</p>
                            </div>
                            <div className="popular-list">
                                <p className="popular-list-name"><b>Founders of all times</b></p>
                                <p className="popular-list-comments">360 Comments</p>
                            </div>
                            <div className="popular-list">
                                <p className="popular-list-name"><b>Founders of all times</b></p>
                                <p className="popular-list-comments">360 Comments</p>
                            </div>
                            <div>
                                <a>see more <span className="glyphicon glyphicon-chevron-down"></span></a>
                            </div>
                        </div>
                        <div className="top-contributors right-section border">
                            <h3>Top Contributters</h3>
                            <div className="contributor">
                                <p className="name"><b>Andrew Knight</b></p>
                                <p>20 Lists / 800 Comments</p>                           
                            </div>
                            <div className="contributor">
                                <p className="name"><b>Andrew Knight</b></p>
                                <p>20 Lists / 800 Comments</p>                           
                            </div>
                            <div className="contributor">
                                <p className="name"><b>Andrew Knight</b></p>
                                <p>20 Lists / 800 Comments</p>                           
                            </div>
                            <div>
                                <a>see more <span className="glyphicon glyphicon-chevron-down"></span></a>
                            </div>
                        </div>
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
            </div>
        );
    }
};

const mapStateToProps = (state, props) => {
    console.log("Redux state is updated!");
    return {
        uid: state.auth && state.auth.uid ? state.auth.uid : undefined,
        user: state.auth && state.auth.user ? state.auth.user : undefined,
        current_list: state.list
    }
};
export default connect(mapStateToProps)(ListPage);