import React from 'react';
// import Modal from 'react-modal';
import { Modal, Button } from 'react-bootstrap';
import { addList } from '../actions/lists';
import axios from 'axios';
import { connect } from 'react-redux';

class InfoModal extends React.Component {
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
                        <h2>{this.props.info}</h2>
                        <div className='action-buttons'>
                            <button 
                                className='btn btn-light facebook-primary-button no-border outline-darkblue'
                                onClick={this.props.close}
                            >
                                Ok
                            </button>
                        </div>        
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
})
export default connect(mapStateToProps)(InfoModal);