import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import commonRiskFactors from './commonRiskFactors.json'
import settings from '../settings.json'

class RiskFactors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            riskFactors: commonRiskFactors,
            mapRiskFactors: [],
        }
        this.getRiskFactors = this.getRiskFactors.bind(this)
        this.handleRiskChange = this.handleRiskChange.bind(this)
    }

    componentDidMount() {
        this.getRiskFactors()
        this.props.onAddRiskFactorList(this.state.mapRiskFactors)
    }


    getRiskFactors() {
        fetch(`https://api.infermedica.com/v2/risk_factors`, {
            method: 'GET',
            headers: settings.headers
        }).then(data => {
            return data.json()
        })
        .then(this.setState({
                mapRiskFactors: this.state.riskFactors.map(item => {
                    return {
                        id: item.id,
                        choice_id: 'absent'
                    }
                })
            })
        )
    }

    handleRiskChange(event) {
        const { checked, id } = event.target;
        const choiceId = checked ? 'present' : 'absent';

        this.setState(({mapRiskFactors}) => ({
            mapRiskFactors: mapRiskFactors.map(item => {
                if (id === item.id) {
                    item.choice_id = choiceId
                }
                return item;
            })
        }))
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="lead">
                            Select Possible Risk Factors</p>

                            {this.state.riskFactors.length > 0 &&
                            <Fragment>
                                <div className="form-group">
                                {this.state.riskFactors.map(riskFactor => (
                                    <div className="form-check" key={riskFactor.id}>
                                    <input type="checkbox"
                                        id={riskFactor.id}
                                        onChange={this.handleRiskChange}
                                        className="form-check-input" />

                                    <label htmlFor={riskFactor.id}
                                        className="form-check-label">
                                        {riskFactor.name}
                                    </label>
                                    </div>
                                ))}
                                </div>
                                <button>
                                    <Link className="link link-lg" to={`/diagnosis`}>Diagnose</Link>
                                </button>
                            </Fragment>
                            }
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
      store: state
    }
  }
  
  const dispatchElement = dispatch => {
    return {
      onAddRiskFactorList: riskFactors => {
        dispatch({ type: 'ADD_RISK_FACTORS', payload: riskFactors });
      }
    }
  }
  
  export default connect(mapStateToProps, dispatchElement)(RiskFactors);