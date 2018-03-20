import React from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { get, post } from '../helpers/axiosHelper';

class ScorePage extends React.Component{ 
    state = {
        word: '',
        slug: '',
        list_word: '',
        list_score: {},
        dictionary_word: '',
        dictionary_score: {}
    }
    dicWordChangeHandler = (e) => {
        e.persist();
        this.setState(() => ({
            dictionary_word: e.target.value
        }));
    }
    listWordChangeHandler = (e) => {
        e.persist();
        this.setState(() => ({
            list_word: e.target.value
        }));
    }
    slugChangeHandler = (e) => {
        e.persist();
        this.setState(() => ({
            slug: e.target.value
        }));
    }
    find = (e) => {
        e.preventDefault();
        axios.get(`http://api.moi10.com/getdictionaryscore/${this.state.dictionary_word}`).then((res) => {
            console.log("Lists fetched");
            console.log(res.data);
            if(res.data.success){
                this.setState(() =>  ({
                    dictionary_score: res.data.data
                }))
            }
        });
    }
    findListWord = (e) => {
        e.preventDefault();
        axios.get(`http://api.moi10.com/getlistwordscore/${this.state.slug}/${this.state.list_word}`).then((res) => {
            console.log("Lists fetched");
            console.log(res.data);
            if(res.data.success){
                this.setState(() =>  ({
                    list_score: res.data.data
                }))
            }
        });
    }
    render() {
        return (
            <div className="row" style={{margin: 'auto', width: '50%'}}>
                <h1>Dictionary Score</h1>
                <form className="form" onSubmit={this.find}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="word" placeholder="WOrd" 
                            value={this.state.dictionary_word}
                            onChange={this.dicWordChangeHandler}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary no-border full-width">
                        Find
                    </button>
                </form>
                <p>Count: <span>{this.state.dictionary_score && this.state.dictionary_score.count}</span></p>
                <p>Rank: <span>{this.state.dictionary_score && this.state.dictionary_score.rank}</span></p>
                <p>Score: <span>{this.state.dictionary_score && this.state.dictionary_score.score}</span></p>
                <h1>List Word Score</h1>
                <form className="form" onSubmit={this.findListWord}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="list_word" placeholder="List word" 
                            value={this.state.list_word}
                            onChange={this.listWordChangeHandler}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="word" placeholder="List slug e.g: jeans-brands" 
                            value={this.state.slug}
                            onChange={this.slugChangeHandler}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary no-border full-width">
                        Find
                    </button>
                </form>
                <p>Count: <span>{this.state.list_score && this.state.list_score.count}</span></p>
                <p>Rank: <span>{this.state.list_score && this.state.list_score.rank}</span></p>
                <p>Score: <span>{this.state.list_score && this.state.list_score.score}</span></p>
            </div>
        );
    }
}
export default ScorePage;

