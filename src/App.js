import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from './componenets/Header'
import reducer from './reducers'
import Home from './componenets/Home'
import Symptoms from './componenets/Symptoms'
import Welcome from './componenets/Welcome'
import RiskFactors from './componenets/RiskFactors'
import Diagnosis from './componenets/Diagnosis'

const App = () => {
  const store = createStore(reducer)
  
    return (
      <Provider store={store}>
        <Router>
          <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/symptoms" component={Symptoms}/>
                <Route exact path="/risk-factors" component={RiskFactors}/>
                <Route exact path="/diagnosis" component={Diagnosis}/>
              </Switch>
            </div>
        </Router>
      </Provider>
    )
}

export default App