import React from 'react';
// import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap';
import { addList } from '../actions/lists';
import axios from 'axios';
import { connect } from 'react-redux';

class OptionModal extends React.Component {
    state = {
        
    }

    render(){
        return (
            <div>
                <Modal 
                    show={this.props.show}
                    onHide={this.props.close}
                    dialogClassName='option-modal'
                >
                    <Modal.Body>
                        <h2>Would you like to add another item?</h2>
                        <div className='action-buttons'>
                            <button 
                                className='btn btn-success'
                                onClick={this.props.yes}>Yes, add another item</button>
                            <button 
                                className='btn btn-light'
                                onClick={this.props.no}>No
                            </button>
                        </div>        
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    uid: state.auth && state.auth.uid ? state.auth.uid : undefined
})
export default connect(mapStateToProps)(OptionModal);