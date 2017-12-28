
import React, { Component } from 'react';
import * as firebase from 'firebase';
import ArtCard from "./ArtCard";
import ArtImage from "./ArtImage";

class ArtWrapper extends Component {
    constructor() {
        super();
        this.btnVal = 100;
        this.artworkScores = {};
        this.state = {
            seenIDs: [],
            currID: 100,
            currTitle: '',
            currLink: '',
            currAttr: ['','']   // [artist, movement] for simplicity's sake
        };
    }


    componentDidMount() {
        let ref = firebase.database().ref();
        let artRef = ref.child("artPieces");

        // finding random art piece to display initially and resetting scores to 0
        artRef.once("value").then(snapshot => {
            snapshot.forEach(childSnap => {
                this.artworkScores[artRef.child(childSnap.key)] = 0;
            });

            let random = Math.floor(Math.random() * Object.keys(this.artworkScores).length);
            let arr = this.state.seenIDs;

            this.updateState(random, snapshot, arr);
        });
    }


    findArtPiece(btnVal) {
        this.btnVal = btnVal;
        let ref = firebase.database().ref();
        let artRef = ref.child("artPieces");

        artRef.once("value").then(childSnap => {
            let maxScore = Number.MIN_SAFE_INTEGER;
            let idToDisplay = -1;
            let seen = this.state.seenIDs;

            childSnap.forEach(grandchildSnap => {
                let score = grandchildSnap.child("score").val();
                let id = parseInt(grandchildSnap.key, 10);

                //updating score
                if (grandchildSnap.child("artist").val() === this.state.currAttr[0]) {
                    score += this.btnVal;
                }
                if (grandchildSnap.child("movement").val() === this.state.currAttr[1]) {
                    score += this.btnVal;
                }
                //updating max score
                if ((seen.indexOf(id) < 0) && (score > maxScore)) {
                    maxScore = score;
                    idToDisplay = id;
                }
                artRef.child(grandchildSnap.key).update({score: score});
            });

            // TODO: check what happens with -1 as id?
            // TODO: error messages
            // TODO: change to a tags instead of buttons?

            this.updateState(idToDisplay, childSnap, seen);
        });
    }


    updateState(id, artPieces, seen) {
        const idString = id.toString();
        const title = artPieces.child(idString).child("title").val();
        const link = artPieces.child(idString).child("link").val();
        const artist = artPieces.child(idString).child("artist").val();
        const movement = artPieces.child(idString).child("movement").val();
        seen.push(id);
        this.setState({
            currTitle: title, currLink: link, currID: id,
            currAttr: [artist, movement], seenIDs: seen
        });
    }


    render() {
        return (
        <div>
            <ArtImage id={this.state.currID} link={this.state.currLink} title={this.state.currTitle}/>
            <div className="col-sm-6" id="info-container">
                <ArtCard id={this.state.currID} title={this.state.currTitle} artist={this.state.currAttr[0]} movement={this.state.currAttr[1]}/>
                <div id="buttons">
                    <button type="button" id="like-btn" onClick={this.findArtPiece.bind(this, 1)}><i className="fa fa-smile-o"></i></button>
                    <button type="button" id="neutral-btn" onClick={this.findArtPiece.bind(this, 0)}><i className="fa fa-meh-o"></i></button>
                    <button type="button" id="dislike-btn" onClick={this.findArtPiece.bind(this, -1)}><i className="fa fa-frown-o"></i></button>
                </div>
            </div>
        </div>
        );
    }

}

export default ArtWrapper;
