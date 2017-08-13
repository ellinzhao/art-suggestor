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
            currAttr: [],   // [artist, movement] for simplicity's sake
        };
    }

    componentDidMount() {
        const ref = firebase.database().ref();

        ref.on("value", snapshot => {
            if (snapshot.child("btnClick").val() == 100) return;
            if (snapshot.child("btnClick").val() != 0 && this.state.currID >= 0) {
                ref.child("artPieces").on("value", childSnap => {
                    var i = snapshot.child("btnClick").val();
                    childSnap.forEach(grandchildSnap => {
                        window.alert(grandchildSnap.child("artist").val() == "hi");
                        var score = grandchildSnap.child("score").val();
                        if (grandchildSnap.child("artist").val().equals(this.state.currAttr[0])) {
                            score += i;
                        }
                        if (grandchildSnap.child("movement").val().equals(this.state.currAttr[1])) {
                            score += i;
                        }
                        grandchildSnap.child("score").set(score);
                    });
                });
            }

            var maxScore = Number.MIN_SAFE_INTEGER;
            var idToDisplay = -1;
            ref.child("artPieces").on("value", childSnap => {
                childSnap.forEach(grandchildSnap => {
                    var score = grandchildSnap.child("score").val();
                    var id = grandchildSnap.key;
                    if (score > maxScore && this.state.seenIDs.indexOf(id) < 0) {
                        maxScore = score;
                        idToDisplay = id;
                    }
                });
                var title = childSnap.child(idToDisplay.toString()).child("title").val();
                var link = childSnap.child(idToDisplay.toString()).child("link").val();
                var artist = childSnap.child(idToDisplay.toString()).child("artist").val();
                var movement = childSnap.child(idToDisplay.toString()).child("movement").val();
                this.setState({currTitle: title, currLink: link, currID: idToDisplay, currAttr: [artist, movement],
                    seenIDs: this.state.seenIDs.push(idToDisplay)});
            });
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-5" id="image">
                        <img src={this.state.currLink} className="pull-right"/>
                    </div>
                    <div className="col-sm-7" id="info">
                        <h2 id="infoHeader">{this.state.currTitle}</h2>
                        <p id="infoText">lorem ipsum bleh bleh bleh</p>
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
