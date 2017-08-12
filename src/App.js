import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';


class App extends Component {
    constructor() {
        super();
        this.state = {
            seenIDs: [],
            countSeen: 0,
            currID: null,
            currAttr: [],   // [artist, movement] for simplicity's sake
            btnVal: null
        };
    }

    componentDidMount() {
        //const ref = firebase.database().ref("artPieces/0");
        const ref = firebase.database().ref("countSeen");
        ref.on("value", snapshot => {
            this.setState
        })
    }

    clickHandle(i) {
        this.updateScores(i);
        this.findArt();
        // TODO: state needs to change for re-rendering... what to do with result of findArt() ?
    }

    updateScores(i) {
        const query = firebase.database().ref("artPieces");
        query.once("value").then(snapshot => {
            snapshot.forEach(childSnapshot => {
                var score = childSnapshot.child("score").val();
                if (childSnapshot.child("artist").equals(this.state.currAttr[0])) {
                    score += i;
                }
                if (childSnapshot.child("movement").equals(this.state.currAttr[1])) {
                    score += i;
                }
                childSnapshot.child("score").set(score);
            });
        });
    }

    findArt() {
        var maxScore = Number.MIN_SAFE_INTEGER;
        var idToDisplay = -1;
        var query = firebase.database().ref("artPieces");
        query.once("value").then(snapshot => {
            snapshot.forEach(childSnapshot => {
                var score = childSnapshot.child("score").val();
                var id = childSnapshot.key;
                if (score > maxScore && this.state.seenIDs.indexOf(id) < 0) {
                    maxScore = score;
                    idToDisplay = id;
                }
            });
        });
        return idToDisplay;
    }

    render() {
        this.updateScores(this.state.btnVal);
        this.findArt();
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6" id="image">
                        <Image/>
                    </div>
                    <div className="col-sm-6" id="info">
                        <Info/>
                        <button type="button" className="btn btn-outline" onClick={this.setState({btnVal: 1})}>Like</button>
                        <button type="button" className="btn btn-outline" onClick={this.setState({btnVal: 0})}>Neutral</button>
                        <button type="button" className="btn btn-outline" onClick={this.setState({btnVal: -1})}>Dislike</button>
                    </div>
                </div>
            </div>
        )
    }
}

class Image extends Component {
    render() {
        return (<h3>image</h3>)
        // should get attr as key-vals from App
    }
}

class Info extends Component {
    render() {
        return (
            <div>
                <h2 id="infoHeader">Title, Artist</h2>
                <p id="infoText"></p>
            </div>
        )
    }
}


export default App;
