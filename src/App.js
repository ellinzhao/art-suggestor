import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';


class App extends Component {
    constructor() {
        super();
        this.state = {
            seenIDs: [],
            countSeen: 0
        };
    }

    componentDidMount() {
        //const ref = firebase.database().ref("artPieces/0");
        const ref = firebase.database().ref("countSeen");
        ref.on("value", snapshot => {
            this.setState
        })
    }

    likeClick() {
        this.findArt(1);
    }

    findArt(i) {
        var maxScore = Number.MIN_SAFE_INTEGER;

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6" id="image">
                        <Image/>
                    </div>
                    <div className="col-sm-6" id="info">
                        <h2>Title, Artist</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum enim id tempus porta.
                            Integer vitae rutrum arcu, quis fringilla urna. Fusce a nibh blandit, rutrum enim vitae, consectetur
                            ligula. Duis rhoncus, enim porta tempus convallis, est tellus feugiat elit, sit amet aliquam tellus
                            justo non odio. Donec maximus est leo, et porta dui varius et. Sed laoreet neque hendrerit mi faucibus,
                            nec sagittis ex iaculis.Curabitur porttitor nisi quis scelerisque finibus. </p>
                        <button type="button" className="btn btn-outline" onClick={this.likeClick}>Like</button>
                        <button type="button" className="btn btn-outline" onClick={this.findArt(0)}>Neutral</button>
                        <button type="button" className="btn btn-outline" onClick={this.findArt(-1)}>Dislike</button>
                    </div>
                </div>
            </div>
        )
    }
}

class Image extends Component {
    render() {
        return (<h3>image</h3>)
    }
}

class Info extends Component {
    render() {
        return (<h3>info</h3>)
    }
}


export default App;
