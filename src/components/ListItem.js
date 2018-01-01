import React from 'react';

const ListItem = (props) => (
    <div className="row">
        <div className="col-md-2">
            <div className="vote-panel">
                <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
                <i className="fa fa-arrow-circle-up" aria-hidden="true"></i>
            </div>                        
        </div>
        <div className="col-md-8">
            <div>
                <h2>{props.itemName}</h2>
                <p>{props.itemDescription}</p>
            </div>
        </div>
        <div className="col-md-3">
        </div>
    </div>
);

export default ListItem;