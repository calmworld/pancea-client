import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import commonRiskFactors from './commonRiskFactors.json'

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
    }


    getRiskFactors() {
        this.setState({
            mapRiskFactors: this.state.riskFactors.map(item => {
                return {
                    id: item.id,
                    choice_id: 'present'
                }
            })
        })
    }

    handleRiskChange(event) {
        console.log(event)
        const { checked, id } = event.target;
        console.log(this.state.mapRiskFactors)
        const choiceId = checked ? 'present' : 'absent';
        if (choiceId === 'present') {
            this.setState({
                mapRiskFactors: [...this.state.mapRiskFactors, id]
            })
        } else {
            var riskArr = this.state.mapRiskFactors
            var index = riskArr.indexOf(event.target.id)
            if (index !== -1) {
                riskArr.splice(index, 1);
                this.setState({mapRiskFactors: riskArr});
            }
        }
        console.log(this.state.mapRiskFactors)
        // this.setState(({mapRiskFactors}) => ({
        //     mapRiskFactors: mapRiskFactors.map(item => {
        //         if (id === item.id) {
        //             item.choice_id = choiceId
        //         }
        //         return item;
        //     })
        // }))
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
                                <button onClick={() => {
                                    console.log(this.state.mapRiskFactors)
                                    this.props.updateRisks(this.state.mapRiskFactors)
                                    }}>
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


  
export default RiskFactors;