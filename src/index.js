import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';


var config = {
    apiKey: "AIzaSyC83cxeDpDfkW6W1T8Y1d7w303KlL_aXkg",
    authDomain: "art-suggestor.firebaseapp.com",
    databaseURL: "https://art-suggestor.firebaseio.com",
    projectId: "art-suggestor",
    storageBucket: "art-suggestor.appspot.com",
    messagingSenderId: "858407690359"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
