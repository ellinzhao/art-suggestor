
import React, { Component } from 'react';


class ArtCard extends Component {
    render() {
        if (this.props.id === -1) {
            return (
                <div>
                    <h3 id="infoHeader">Hope you enjoyed this!</h3>
                    <p id="infoText">Check out my <a href="https://ellinzhao.github.io/holzer-truisms/display.html">Jenny Holzer homage</a> for more art!</p>
                </div>
            );
        } else {
            return (
                <div>
                    <h3 id="infoHeader">{this.props.artist}, <span id="title">{this.props.title}</span></h3>
                    <p id="infoText">{this.props.movement}</p>
                </div>
            );
        }
    }

}

export default ArtCard;
