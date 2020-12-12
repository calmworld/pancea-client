import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Welcome from './componenets/Welcome'

export default class App extends Component {
  render() {
    return (
        <Router>
          
          <Switch>
            <Route path="/"><Welcome /></Route>
          </Switch>
        </Router>
    )
  }
}
