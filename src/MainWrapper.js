import React, { Component } from 'react';
import './MainWrapper.css';
import ArtWrapper from "./ArtWrapper";


class MainWrapper extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <ArtWrapper/>
                </div>
            </div>
        );
    }
}

export default MainWrapper;
