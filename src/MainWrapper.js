import React, { Component } from 'react';
import './MainWrapper.css';
import ArtWrapper from "./ArtWrapper";
import $ from 'jquery';


function onReady(callback) {
    let intervalID = window.setInterval(checkReady, 1000);
    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
    show('page', true);
    show('loading', false);
});

let windowHeight = $(window).height();
let headerHeight = $('header').height();
let remainingHeight = windowHeight - headerHeight;
$('#page').height(remainingHeight);



class MainWrapper extends Component {

    render() {
        return (
            <ArtWrapper/>
        );
    }
}

export default MainWrapper;
