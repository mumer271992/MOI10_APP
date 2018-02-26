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
import moment from 'moment';

class ListPage extends React.Component {
    keys = [];
    relevent_items = [];
    constructor(props){
        super(props);
        this.state.list_id = props.match.params.id;
        this.state.list_slug = props.match.params.slug;
        this.state.uid = this.state.uid ? this.state.uid : props.uid;
        this.state.user = this.state.user ? this.state.user : props.user;
        const slug = props.match.params.slug;
        this.fetchCurrentList(slug);
    }
    componentDidUpdate(){
        console.log('Rendered');
        // window.scrollTo({top: 0, left: 0 , behavior: 'smooth'});
        // if(this.props.current_list && this.props.current_list.id){
        //     // this.setState(()=> ({
        //     //     item: this.orderListItems(this.props.current_list)
        //     // }));
        // }
    }
    componentDidMount(){
        
    }
    fetchCurrentList(slug){
        const url = this.state.user && this.state.user.id ? 
                    `http://api.moi10.com/list/fetch/${slug}?user_id=${this.state.user.id}` : 
                    `http://api.moi10.com/list/fetch/${slug}`
        axios.get(url)
        .then((res) => {
            console.log(res.data);
            res.data.votes = this.calculateListVotes({ ...res.data });
            console.log(res.data.votes);
            this.props.dispatch(setList(res.data))
            //this.keys = Object.keys(res.data.words_list);
            this.relevent_items = res.data.relevent_lists;
            // this.setState(() => ({
            //     keys: this.filterTopKeywords(res.data.words_list)
            // }));
            this.setState(() => ({
                keys: res.data && res.data.words_list ? res.data.words_list : []
            }));
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
        this.props.history.push(`/list/${new_list.slug}`);
        //history.push(`/list/${new_list.id}`);
    }
    state = {
        isMobile: false,
        list_id: '',
        list_slug: '',
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
        keywordsList: [],
        relevent_lists: [],
        popular_lists: [],
        top_contributors: [],
        keys: []
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
                this.props.current_list.slug && 
                this.props.current_list.slug === this.props.match.params.slug){
                this.setState(()=> ({
                    item: this.orderListItems(this.props.current_list)
                }));
            }
            else {
                const slug = nextProps.match.params.slug;
                this.fetchCurrentList(slug);
                window.scrollTo({top: 0, left: 0 , behavior: 'smooth'});
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
                this.fetchCurrentList(this.props.match.params.slug);
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

    calculateListVotes(list) {
        return list.items.reduce((sum,item) => {
            console.log(item.votes);
            let votes = item.votes ? item.votes * (item.votes < 0 ? -1 : 1) : 0;
            console.log("Calculating Votes:" + votes);
            return sum + parseInt(votes)
        }, 0);
    }

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
                <Header list_id={this.props.match.params.id}/>
                <div className="row list_page">
                    <div className="col-md-1"> 
                    </div>
                    <div className="col-md-7 listing-section">
                        <h3 className={`${this.state.isMobile ? 'text-center' : ''}`}>Most Important 10</h3>
                        <h1 className={`light ${this.state.isMobile ? 'text-center' : ''}`}>{this.state.item.name}</h1>
                        <div className="list-items">
                            {
                                this.state.item.items.map((item, index) => (
                                    <ListItem 
                                        key={item.id}
                                        item={item}
                                        totalVotes={this.state.item.votes}
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
                            <p className="side-nav-heading">List Information</p>
                            <p className="normal-font">{this.state.item.description}</p>
                            <p className="normal-font">Items: <b>{this.state.item && this.state.item.items ? this.state.item.items.length : 0}</b></p>                            
                            <p className="normal-font">Votes: <b>{this.state.item.votes}</b></p>
                        </div>
                        {
                            this.state.item.relevent_lists && this.state.item.relevent_lists.length > 0 ?  
                            (
                                <div className="popular-lists right-section border">
                                    <p className="side-nav-heading">Related Lists</p>
                                    {
                                        this.state.item && this.state.item.relevent_lists && this.state.item.relevent_lists.length && this.state.item.relevent_lists.map((list) => (
                                            <div className="popular-list" key={list.id}>
                                                <p className="popular-list-name"><b><Link to={`/${list.slug}`}>{list.name}</Link></b></p>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (<div></div>)
                        }
                        {
                            this.state.item.popular && this.state.item.popular.length > 0 ? 
                            (
                                <div className="popular-lists right-section border">
                                    <p className="side-nav-heading">Popular Lists</p>
                                    {
                                        this.state.item && this.state.item.popular && this.state.item.popular.length && this.state.item.popular.map((list) => (
                                            <div className="popular-list" key={list.id}>
                                                <p className="popular-list-name"><b><Link to={`/${list.slug}`}>{list.name}</Link></b></p>
                                            </div>
                                        ))
                                    }
                                 </div>
                            ) : (<div></div>)
                        }
                        <div className="top-keywords right-section border">
                            <p className="side-nav-heading">Top keywords</p>
                            <div>
                            {
                                this.state.keys && this.state.keys.length && this.state.keys.map((key,index) => (<p className="keyword" key={index}>{key}{index < this.state.keys.length ? ',' : ''} </p>))
                            },
                            </div>
                        </div>
                        {
                            this.state.item.top_contributors && this.state.item.top_contributors.length > 0 ?
                            (
                                <div className="top-contributors right-section border">
                                    <p className="side-nav-heading">Top Contributters</p>
                                    {
                                        this.state.item && this.state.item.top_contributors && this.state.item.top_contributors.length && this.state.item.top_contributors.map((list) => 
                                        (
                                            <div className="contributor" key={list._id}>
                                                <p className="name"><b>{list.name}</b></p>                           
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (<div></div>)
                        }
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