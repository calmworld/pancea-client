import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from './componenets/Header'
import reducer from './reducers'
import Home from './componenets/Home'
import Symptoms from './componenets/Symptoms'

const App = () => {
  const store = createStore(reducer)
  
    return (
      <Provider store={store}>
        <Router>
          <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/symptoms" component={Symptoms}/>
              </Switch>
            </div>
        </Router>
      </Provider>
    )
}

export default App