import React from 'react';
// import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap';
import { addList } from '../actions/lists';
import { addItem } from '../actions/list';
import axios from 'axios';
import { connect } from 'react-redux';

class AddListItemModal extends React.Component {
    state = {
        name: '',
        url: '',
        description: '',
        loading: false,
        success: false
    }
    titleChangeHandler = (e) => {
       e.persist();
       this.setState(() => ({
           name: e.target.value
       }));
    }
    urlChangeHandler = (e) => {
        e.persist();
        this.setState(() => ({
            url: e.target.value
        }));
     }
    descriptionChangeHandler = (e) => {
        e.persist();
        this.setState(() => ({
            description: e.target.value
        }));
    }

    addListItemHandler = (e) => {
        e.preventDefault();
        console.log("Add List Item Submitted");
        console.log(this.state);
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${this.props.uid}`
            }
        }
        console.log(config);
        this.setState(()=> ({
            loading: true
        }));
        axios.post(
            'http://api.moi10.com/listItem/create',
            {
                name: this.state.name,
                url: this.state.url,
                description: this.state.description,
                list_id: this.props.listId
            },
            config
        )
        .then(this._handleAddListItem)
        .catch((err)=> {
            console.log("Error: ", err);
        });
    }
    _handleAddListItem = (res) => {
        if(res && res.data){
            console.log(res.data);
            // this.props.onSuccess(res.data);
            this.setState(() => ({
                success: true
            }));
            this.props.dispatch(addItem(res.data));
            setTimeout(() => {
                this.state = {
                    name: '',
                    url: '',
                    description: ''
                }
                this.props.onSuccess(res.data);
            }, 3000);
        }
    }
    render(){
        return (
            <div>
                <Modal 
                    show={this.props.show}
                    onHide={this.props.close}
                >
                    <Modal.Body>
                        <i className="fa fa-times cross-button" onClick={this.props.close}></i>
                        {
                            !this.state.loading ? (
                                <div>
                                    <h2>Add Item To {this.props.listName}</h2>
                                    <form onSubmit={this.addListItemHandler}>
                                        <div className="form-group">
                                            <label>Item Name:</label>
                                            <input type="text" className="form-control" id="listname" placeholder="Enter list name here.."
                                                value={this.state.name}
                                                onChange={this.titleChangeHandler}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Item URL (Optional):</label>
                                            <input type="text" className="form-control" id="listname" placeholder="Enter URL (Optional)"
                                                value={this.state.url}
                                                onChange={this.urlChangeHandler}
                                            />
                                        </div>
                                        <div className="form-group"> 
                                            <label>Optional Description and Links:</label>
                                            <textarea
                                                rows="6"
                                                className="form-control" 
                                                placeholder="Optional list description goes here (Optional)"
                                                value={this.state.description}
                                                onChange={this.descriptionChangeHandler}
                                            >
                                            </textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Add Item
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className={`circle-loader ${this.state.success ? 'load-complete' : ''}`}>
                                        <div className={`checkmark draw ${this.state.success ? 'checkmark-show' : ''}`}></div>
                                    </div>
                                    <h2>New Item Has Been Added Successfully</h2>
                                </div>
                            )
                        }
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = (state, props) => ({
    uid: state.auth && state.auth.uid ? state.auth.uid : undefined
})
export default connect(mapStateToProps)(AddListItemModal);