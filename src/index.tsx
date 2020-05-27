import React from 'react';
import ReactDOM from 'react-dom';
import appFirebase from 'firebase/app';
import 'firebase/auth';
import * as serviceWorker from './serviceWorker';
import {AuthPage} from './auth-page/auth-page';
import './index.css';

export const firebase = appFirebase.initializeApp({
    apiKey: "AIzaSyATQBkeX-usruXIBWBwG8UJi96IJQthMqU",
    authDomain: "ribalkoko48-c84fb.firebaseapp.com",
    databaseURL: "https://ribalkoko48-c84fb.firebaseio.com",
    projectId: "ribalkoko48-c84fb",
    storageBucket: "ribalkoko48-c84fb.appspot.com",
    messagingSenderId: "291618989649",
    appId: "1:291618989649:web:c8695254c4cf819397ba70",
    measurementId: "G-137EG01YC2"
});

ReactDOM.render(
    <AuthPage firebase={firebase} />,
    document.getElementById('root')
);

serviceWorker.unregister();
