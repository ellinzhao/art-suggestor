import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';


class App extends Component {
    constructor() {
        super();
        this.state = {
            seenIDs: [],
            currID: -1,
            currTitle: '',
            currLink: '',
            currAttr: ['',''],   // [artist, movement] for simplicity's sake
        };
    }

    componentDidMount() {
        var ref = firebase.database().ref();
        var artRef = ref.child("artPieces");

        ref.on("child_changed", snapshot => {
            const btnVal = snapshot.val();
            if (btnVal < 2) {
                artRef.once("value").then(childSnap => {
                    var maxScore = Number.MIN_SAFE_INTEGER;
                    var idToDisplay = -1;
                    var seen = this.state.seenIDs;

                    childSnap.forEach(grandchildSnap => {
                        var score = grandchildSnap.child("score").val();
                        var id = grandchildSnap.key;

                        //updating score
                        if (grandchildSnap.child("artist").val() === this.state.currAttr[0]) {
                            score += btnVal;
                        }
                        if (grandchildSnap.child("movement").val() === this.state.currAttr[1]) {
                            score += btnVal;
                        }

                        //updating max score
                        if (score > maxScore && seen.indexOf(id) < 0) {
                            maxScore = score;
                            idToDisplay = id;
                        }
                        artRef.child(grandchildSnap.key).update({score: score});
                    });
                    //updating state 
                    const idStr = idToDisplay.toString();
                    const title = childSnap.child(idStr).child("title").val();
                    const link = childSnap.child(idStr).child("link").val();
                    const artist = childSnap.child(idStr).child("artist").val();
                    const movement = childSnap.child(idStr).child("movement").val();
                    seen.push(idToDisplay);
                    this.setState({
                        currTitle: title, currLink: link, currID: idToDisplay,
                        currAttr: [artist, movement], seenIDs: seen
                    });
                });
            }
        });
    }

    likeClick() {
        firebase.database().ref().child("btnClick").set(100);
        firebase.database().ref().child("btnClick").set(1);
    }
    neutralClick() {
        firebase.database().ref().child("btnClick").set(100);
        firebase.database().ref().child("btnClick").set(0);
    }
    dislikeClick() {
        firebase.database().ref().child("btnClick").set(100);
        firebase.database().ref().child("btnClick").set(-1);
    }

    render() {
        var arr = this.state.currAttr;
        var artist = arr[0];
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-5" id="image">
                        <img src={this.state.currLink} alt={this.state.currTitle} className="pull-right"/>
                    </div>
                    <div className="col-sm-7" id="info">
                        <h2 id="infoHeader">{artist}, {this.state.currTitle}</h2>
                        <p id="infoText">description of artwork here</p>
                        <button type="button" className="btn btn-outline" onClick={this.likeClick}>Like</button>
                        <button type="button" className="btn btn-outline" onClick={this.neutralClick}>Neutral</button>
                        <button type="button" className="btn btn-outline" onClick={this.dislikeClick}>Dislike</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
