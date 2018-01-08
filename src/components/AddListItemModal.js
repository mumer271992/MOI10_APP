import React from 'react';
// import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap';
import { addList } from '../actions/lists';
import axios from 'axios';
import { connect } from 'react-redux';

class AddListItemModal extends React.Component {
    state = {
        name: '',
        url: '',
        description: ''
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
        axios.post(
            'http://api.moi10.com/listItem/create',
            {
                name: this.state.name,
                url: this.state.url,
                description: this.state.description,
                list_id: this.props.listId,
                votes: 0
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
            this.state = {
                name: '',
                url: '',
                description: ''
            }
            this.props.onSuccess(res.data);
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
                        <h2>Add Item To {this.props.listName}</h2>
                        <form onSubmit={this.addListItemHandler}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="listname" placeholder="Enter list name here.."
                                    value={this.state.name}
                                    onChange={this.titleChangeHandler}
                                    required
                                />
                            </div>
                            <div className="form-group">
                            <input type="text" className="form-control" id="listname" placeholder="Enter URL (Optional)"
                                value={this.state.url}
                                onChange={this.urlChangeHandler}
                            />
                            </div>
                            <div className="form-group">
                                <textarea
                                    rows="3"
                                    className="form-control" 
                                    placeholder="Optional list description goes here (Optional)"
                                    value={this.state.description}
                                    onChange={this.descriptionChangeHandler}
                                >
                                </textarea>
                            </div>
                            <button type="submit" className="btn btn-success bg-darkblue">
                                Add Item
                            </button>
                        </form>
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