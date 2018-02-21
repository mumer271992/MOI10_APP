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
import { get } from '../helpers/axiosHelper';

class HomePage extends React.Component {
    state = {
        showAddListModal: false,
        showAddListItemModal: false,
        showLoginModal: false,
        showSignupModal: false,
        isMobile: false,
        filterredDictionary: [],
        popular: [],
        trending: [],
        recent: [],
        my_lists: []
    }

    filterredDictionary = [];

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
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${this.props.uid}`
            }
        }
        if(this.props.uid){
            config.headers.Authorization = `Basic ${this.props.uid}`;
        }
        axios.get('http://api.moi10.com/getFilteredLists', config).then((res) => {
            console.log("Lists fetched");
            console.log(res.data);
            this.setState(() => ({
                popular: res.data.popular,
                trending: res.data.trending,
                recent: res.data.latest,
                my_lists: res.data.my_lists
            }));
            console.log("State");
            console.log(this.state);
            this.props.dispatch(setLists(res.data));
        });
        // get('/dictionary').then((res)=> {
        //     console.log("Dictionary");
        //     console.log(res.data);
        //     this.filterredDictionary = this.filterTopKeywords(res.data);
        //     this.setState(()=> ({
        //         filterredDictionary: this.filterredDictionary
        //     }));
        // });
    }

    close = () => {
        this.setState(() => ({
            showAddListModal: false,
            showAddListItemModal: false,
            showLoginModal: false,
            showSignupModal: false
        }));
      }
    filterTopKeywords(dictionary){
        let topKeywords = [];
        let sortedKeys = [];
        if(dictionary && dictionary.length){
            sortedKeys = dictionary.sort((a, b) => {
                return a.rank < b.rank ? 1 : -1;
            });
        }
        return sortedKeys;
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
     * Remove event listener
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    render() {
        return (
            <div>
                <Header />
                <div className="page-content home-page">
                    <div className={`d-flex ${!this.state.isMobile ? 'felx-row' : 'flex-column'} justify-content-space-evenly`}>
                        <div className="d-flex flex-column lists-column">
                            <div>
                                <div className="popular"></div>
                                <h3 className="list-header">Most Popular</h3>
                            </div>
                            {this.state.popular && this.state.popular.length && this.state.popular.map((list, index) => (<div className="item" key={list.id}><span className="index">{index < 9 ? '0'+(index+1) : index+1}.</span><Link to={`/${list.slug}`}>{list.name}</Link></div>))}
                        </div>
                        <div className="d-flex flex-column lists-column">
                            <div>
                                <div className="trending"></div> 
                                <h3 className="list-header">Trending</h3>
                            </div>
                            {this.state.trending && this.state.trending.length && this.state.trending.map((list, index) => (<div className="item" key={list.id}><span className="index">{index < 9 ? '0'+(index+1) : index+1}.</span><Link to={`/${list.slug}`}>{list.name}</Link></div>))}
                        </div>
                        <div className="d-flex flex-column lists-column"> 
                            <div>
                                <div className="latest"></div>
                                <h3 className="list-header">Just Added</h3>
                            </div>
                            {this.state.recent && this.state.recent.length && this.state.recent.map((list, index) => (<div className="item" key={list.id}><span className="index">{index < 9 ? '0'+(index+1) : index+1}.</span><Link to={`/${list.slug}`}>{list.name}</Link></div>))}
                        </div>
                        <div className="d-flex flex-column lists-column"> 
                            <div>
                                <div className="your-lists"></div>
                                <h3 className="list-header">Your Lists</h3>
                            </div>
                            {this.state.my_lists && this.state.my_lists.length && this.state.my_lists.map((list, index) => (<div className="item" key={list.id}><span className="index">{index < 9 ? '0'+(index+1) : index+1}.</span><Link to={`/${list.slug}`}>{list.name}</Link></div>))}
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
    user: state.auth && state.auth.user ? state.auth.user : undefined,
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