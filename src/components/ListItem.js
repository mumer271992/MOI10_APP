import React from 'react';

const ListItem = (props) => (
    <div className="row list-item">
        <div className="col-md-1 vote-panel">
            <div className="">
                <span className="fa-stack fa-lg" onClick={
                    (e) => {
                        e.preventDefault();
                        props.onVote(props.item.id, 'up');
                    }
                }>
                    <i className={`fa fa-circle fa-stack-2x ${props.item.my_vote && props.item.my_vote.vote === '+1' ? 'secondry-backfround' : ''}`}></i>
                    <i className="fa fa-angle-up fa-stack-1x"></i>
                </span>
                <span className="total-votes">{props.item.votes}</span>
                <span className="fa-stack fa-lg" onClick={
                    (e) => {
                        e.preventDefault();
                        props.onVote(props.item.id, 'down');
                    }
                }>
                    <i className={`fa fa-circle fa-stack-2x ${props.item.my_vote && props.item.my_vote.vote === '-1' ? 'secondry-backfround' : ''}`}></i>
                    <i className="fa fa-angle-down fa-stack-1x"></i>
                </span>
            </div>                        
        </div>
        <div className="col-md-11">
            <div className="info-panel">
                <h2>#{props.index + 1} {props.item.name}</h2>
                <p className="secondry-text">{props.item.description}</p>
                <div className="item-info-section">
                    <span><span className="primary-color"><i className="fa fa-comments" aria-hidden="true"></i>
                     27 </span>comments</span>
                     <span className="primary-color">_ Report</span>
                </div>
            </div>
        </div>
        
    </div>
);

export default ListItem;