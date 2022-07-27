import React from 'react';
import ReactDOM from 'react-dom/client';

class MainApp extends React.Component {
    render() {
        return (
            <div className="app">
                <h1>Hello World!</h1>
                <img src="https://uploads-ssl.webflow.com/602e7c287eefab52cb3f36dd/61e6f77a41aa7921daa269cb_logo%20(1).svg" alt=""/>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainApp/>);