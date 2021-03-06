import React from 'react';
// import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap';
import { addList } from '../actions/lists';
import axios from 'axios';
import { connect } from 'react-redux';

class AddListModal extends React.Component {
    state = {
        name: '',
        description: ''
    }
    titleChangeHandler = (e) => {
       e.persist();
       this.setState(() => ({
           name: e.target.value
       }));
    }
    descriptionChangeHandler = (e) => {
        e.persist();
        this.setState(() => ({
            description: e.target.value
        }));
    }

    addListHandler = (e) => {
        e.preventDefault();
        console.log("Add List Submitted");
        console.log(this.state);
        var config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${this.props.uid}`
            }
        }
        console.log(config);
        axios.post(
            'http://api.moi10.com/list/create',
            this.state,
            config
        )
        .then(this._handleAddList)
        .catch((err)=> {
            console.log("Error: ", err);
        });
    }
    _handleAddList = (res) => {
        if(res && res.data){
            console.log(res.data);
            this.state = {
                name: '',
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
                        <h2>New List</h2>
                        <h2>Most Important 10</h2>
                        <form onSubmit={this.addListHandler}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="listname" placeholder="Enter list name here.."
                                    value={this.state.name}
                                    onChange={this.titleChangeHandler}
                                    required
                                />
                            </div>
                            <h3>Most Important 10 {this.state.name}</h3>
                            <div className="form-group">
                                <textarea
                                    rows="3"
                                    className="form-control" 
                                    placeholder="Optional list description goes here"
                                    value={this.state.description}
                                    onChange={this.descriptionChangeHandler}
                                >
                                </textarea>
                            </div>
                            <button type="submit" className="btn btn-success bg-darkblue">
                                Add List
                            </button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
// const AddListModal = (props) => (
//     <Modal
//         isOpen={props.open}
//         onRequestClose={() => {
//             console.log("modal closed")
//         }}
//         contentLabel="loginmodal"
//         closeTimeoutMS={200}
//         className="Modal large-modal"
//         overlayClassName="Overlay"
//         shouldCloseOnOverlayClick={true}
//         shouldCloseOnEsc={true}
//     >
//         <div className="card">
//             <div className="card-body">
//                 <h1 className="card-title">New List</h1>
//                 <h3 className="card-title">Most Important 10</h3>
//                 <form onSubmit={(e) => {
//                     e.preventDefault();
//                     console.log("Login");
//                     history.push('/dashboard');
//                 }}>
//                     <div className="form-group">
//                         <input type="text" className="form-control" id="listname" placeholder="Enter list name here.." />
//                     </div>Important 10 {}
//                     <h3>Most </h3>
//                     <div className="form-group">
//                         <textarea
//                             rows="3"
//                             className="form-control" 
//                             placeholder="Optional list description goes here"></textarea>
//                     </div>
//                     <button type="submit" className="btn btn-success bg-darkblue">
//                         Add List
//                     </button>
//                 </form>
//             </div>
//         </div>   
//     </Modal>
// );
const mapStateToProps = (state, props) => ({
    uid: state.auth && state.auth.uid ? state.auth.uid : undefined
})
export default connect(mapStateToProps)(AddListModal);