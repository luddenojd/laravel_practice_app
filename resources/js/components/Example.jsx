import React from 'react';
import ReactDOM from 'react-dom/client';
import Button from '@mui/material/Button'
import Login from './Login'
function Example() {
    return (
        <div className="container">
            {/* <div className="card-header">Example Component</div>
            <div className="card-body">I'm an example component!</div>
            <Button variant="contained">Logga in</Button> */}
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
