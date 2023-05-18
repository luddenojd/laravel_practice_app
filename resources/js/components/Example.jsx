import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login'
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
            <Example/>
        </React.StrictMode>
    )
}
