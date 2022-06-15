import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';

import './stylesheet/index.css'

import ErrorBoundary from './component/errorboundry';

import App from './component/app'

ReactDOM.render(
    <ErrorBoundary>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ErrorBoundary>
    , document.getElementById('root'));