import React, { Component } from 'react';
import Student from './components/student/Student';
import classes from './App.module.css';
class App extends Component {
    
    render() {
        return(
            <div className={classes.MainContainer}>
                <Student />
            </div>
        )
    };
}

export default App;