import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {AuthPage} from './auth-page/auth-page';
import './index.css';

ReactDOM.render(
    <AuthPage />,
    document.getElementById('root')
);

serviceWorker.unregister();
