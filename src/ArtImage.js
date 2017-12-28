
import React, { Component } from 'react';


class ArtImage extends Component {
    render() {
        if (this.props.id === -1) {
            return(
                <div className="col-sm-6" id="image"></div>
            );
        } else {
            return(
                <div className="col-sm-6" id="image">
                    <img src={this.props.link} alt={this.props.title} className="img-responsive"/>
                </div>
            );
        }

    }
}

export default ArtImage;
