import React from 'react'
import ReactDom from 'react-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPage from './Page';

const App = () => {
    return <div className="container-fluid"><FormPage/></div>
}

ReactDom.render(<App />, document.querySelector('#root'))