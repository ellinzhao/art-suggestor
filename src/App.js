import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';


class App extends Component {
    constructor() {
        super();
        this.state = {
            seenIDs: [],
            currID: 100,
            currTitle: '',
            currLink: '',
            currAttr: ['',''],   // [artist, movement] for simplicity's sake
        };
    }

    componentDidMount() {
        var ref = firebase.database().ref();
        var artRef = ref.child("artPieces");

        // finding random art piece to display initially and resetting scores to 0
        artRef.once("value").then(snapshot => {
            var len = 0;
            snapshot.forEach(childSnap => {
                artRef.child(childSnap.key).update({score: 0});
                len += 1;
            });

            var random = Math.floor(Math.random() * len);
            var title = snapshot.child(random.toString()).child("title").val();
            var link = snapshot.child(random.toString()).child("link").val();
            var artist = snapshot.child(random.toString()).child("artist").val();
            var movement = snapshot.child(random.toString()).child("movement").val();
            var arr = this.state.seenIDs;
            arr.push(random);
            this.setState({
                currTitle: title, currLink: link, currID: random,
                currAttr: [artist, movement], seenIDs: arr
            });
        });

        // event listener for button click
        ref.on("child_changed", snapshot => {
            var arr = this.state.seenIDs;
            console.log(arr);
            const btnVal = snapshot.val();
            if (btnVal < 2) {
                artRef.once("value").then(childSnap => {
                    var maxScore = Number.MIN_SAFE_INTEGER;
                    var idToDisplay = -1;
                    var seen = this.state.seenIDs;

                    childSnap.forEach(grandchildSnap => {
                        var score = grandchildSnap.child("score").val();
                        var id = parseInt(grandchildSnap.key);

                        //updating score
                        if (grandchildSnap.child("artist").val() === this.state.currAttr[0]) {
                            score += btnVal;
                        }
                        if (grandchildSnap.child("movement").val() === this.state.currAttr[1]) {
                            score += btnVal;
                        }
                        //updating max score
                        if ((seen.indexOf(id) < 0) && (score > maxScore)) {
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

    renderLast() {
        return (
            <h2>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6" id="image">

                        </div>
                        <div className="col-sm-6" id="info">
                            <h3 id="infoHeader">Hope you enjoyed this!</h3>
                            <p id="infoText">Check out my <a href="https://ellinzhao.github.io/holzer-truisms/display.html">Jenny Holzer homage</a> for more art!</p>
                        </div>
                    </div>
                </div>
            </h2>
        );
    }

    render() {
        if (this.state.currID === -1) return this.renderLast();
        if (this.state.currID === 100) return (<div></div>);
        var arr = this.state.currAttr;
        var artist = arr[0];
        var movement = arr[1];
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6" id="image">
                        <img src={this.state.currLink} alt={this.state.currTitle} className="img-responsive"/>
                    </div>
                    <div className="col-sm-6" id="info">
                        <h3 id="infoHeader">{artist}, <span id="title">{this.state.currTitle}</span></h3>
                        <p id="infoText">{movement}</p>
                        <div id="buttons">
                            <button type="button" onClick={this.likeClick}><i className="fa fa-smile-o" aria-hidden="true"></i></button>
                            <button type="button" onClick={this.neutralClick}><i className="fa fa-meh-o" aria-hidden="true"></i></button>
                            <button type="button" onClick={this.dislikeClick}><i className="fa fa-frown-o" aria-hidden="true"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
