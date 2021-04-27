import React from 'react';
import './App.css';
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import Home from '../Home';
import 'fontsource-roboto'

import 'primereact/resources/themes/vela-green/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends React.Component {
    render (){
        return(
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Menu}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

function Menu(props) {
    return (
        <React.Fragment>
                <Home></Home>
        </React.Fragment>
    );
}

export default App; 