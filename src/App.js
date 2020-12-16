import React, {Component} from 'react'
// import { createStore } from 'redux'
// import { Provider } from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from './componenets/Header'
// import reducer from './reducers'
import Home from './componenets/Home'
import Symptoms from './componenets/Symptoms'
import Welcome from './componenets/Welcome'
import RiskFactors from './componenets/RiskFactors'
import Diagnosis from './componenets/Diagnosis'

class App extends Component {
  constructor() {
    super()
    this.state = {
      symptoms: [],
      riskFactors: []
    }
    this.updateSymptoms = this.updateSymptoms.bind(this)
    this.updateRisks = this.updateRisks.bind(this)
  }

  updateSymptoms(newSymptoms) {
    // console.log(newSymptoms)
    this.setState({
      symptoms: [...newSymptoms]
    })
  }

  updateRisks(newRisks) {
    // console.log(newSymptoms)
    this.setState({
      riskFactors: [...newRisks]
    })
  }

  render() {
    return (
      <div>
        <Router>
          <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/symptoms" render={() => <Symptoms updateSymptoms={ this.updateSymptoms } /> } />
                <Route exact path="/risk-factors" render={() => <RiskFactors updateRisks={ this.updateRisks } /> } />
                <Route exact path="/diagnosis" render={() => <Diagnosis symptoms={ this.state.symptoms } /> } />
              </Switch>
            </div>
        </Router>
      </div>
    )
  }
}



export default App