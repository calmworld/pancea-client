import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from './componenets/Header'

import Home from './componenets/Home'

export default class App extends Component {
  render() {
    return (
        <Router>
          <Header />
          <Switch>
            <Route path="/"><Home /></Route>
          </Switch>
        </Router>
    )
  }
}
