import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login'
import App from './App'

function Example() {
    return (
        <div className="container">
            <Login />
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    )
}
