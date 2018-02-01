import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ListItem extends React.Component {
    state = {
        isMobile: false
    }

    constructor(props){
        super(props);
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
            <div className={`d-flex ${!this.state.isMobile ? 'flex-row' : 'flex-reverse-columns'} list-item`}>
                <div className="vote-panel">
                    <div className={`d-flex ${ !this.state.isMobile ? 'flex-column' : 'flex-row justify-content-space-evenly'} `}>
                        <span className="fa-stack fa-lg vote_button" onClick={
                            (e) => {
                                e.preventDefault();
                                this.props.onVote(this.props.item.id, 'up');
                            }
                        }>
                            <i className={`fa fa-circle fa-stack-2x ${this.props.item.my_vote && this.props.item.my_vote.vote === '+1' ? 'secondry-backfround' : ''}`}></i>
                            <i className="fa fa-angle-up fa-stack-1x bold"></i>
                        </span>
                        <span className="total-votes">{this.props.item.votes}</span>
                        <span className="fa-stack fa-lg vote_button" onClick={
                            (e) => {
                                e.preventDefault();
                                this.props.onVote(this.props.item.id, 'down');
                            }
                        }>
                            <i className={`fa fa-circle fa-stack-2x ${this.props.item.my_vote && this.props.item.my_vote.vote === '-1' ? 'secondry-backfround' : ''}`}></i>
                            <i className="fa fa-angle-down fa-stack-1x bold"></i>
                        </span>
                    </div>                        
                </div>
                <div className="info-panel">
                    <h3 className="regular">#{this.props.index + 1} {this.props.item.name}</h3>
                    <p className="secondry-text item_desc">{this.props.item.description}</p>
            </div>
                
            </div>
        );
    }
} 


const mapStateToProps = (state, props) => ({

});
export default connect(mapStateToProps)(ListItem);