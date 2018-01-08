import React from 'react';

const ListItem = (props) => (
    <div className="row">
        <div className="col-md-2">
            <div className="vote-panel">
                <span className="fa-stack fa-lg" onClick={
                    (e) => {
                        e.preventDefault();
                        props.onVote(props.item.id, 'up');
                    }
                }>
                    <i className="fa fa-circle fa-stack-2x"></i>
                    <i className={`fa fa-arrow-up fa-stack-1x ${props.item.my_vote && props.item.my_vote.vote === '+1' ? 'green' : 'white'}`}></i>
                </span>
                <span className="fa-stack fa-lg" onClick={
                    (e) => {
                        e.preventDefault();
                        props.onVote(props.item.id, 'down');
                    }
                }>
                    <i className="fa fa-circle fa-stack-2x"></i>
                    <i className={`fa fa-arrow-down fa-stack-1x ${props.item.my_vote && props.item.my_vote.vote === '-1' ? 'red' : 'white'}`}></i>
                </span>
            </div>                        
        </div>
        <div className="col-md-2">
        <h1>{props.item.votes}</h1>
        </div>
        <div className="col-md-8">
            <div>
                <h2>{props.item.name}</h2>
                <p>{props.item.description}</p>
            </div>
        </div>
        
    </div>
);

export default ListItem;