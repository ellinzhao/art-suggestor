
import React, { Component } from 'react';
import $ from 'jquery';

class ArtImage extends Component {

    componentDidMount() {
        let h = $('#page').height();
        $('img').css({"width":"100%", 'max-height':h-100, "width":"auto"});
    }

    render() {
        if (this.props.id === -1) {
            return(
                <div className="col-sm-6" id="image-container"></div>
            );
        } else {
            return(
                <div className="col-sm-6" id="image-container">
                    <img src={this.props.link} alt={this.props.title} className="img-responsive"/>
                </div>
            );
        }

    }
}

export default ArtImage;
