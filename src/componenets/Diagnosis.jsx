import React, { Component, Fragment } from 'react'
import settings from '../settings.json'
import Conditions from './Conditions'
import Question from './Question'

const list = localStorage

class Diagnosis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            diagnosis: {},
            evidence: []
        }
        this.getDiagnosis = this.getDiagnosis.bind(this)
        this.updateDiagnosis = this.updateDiagnosis.bind(this)
    }

    componentDidMount() {
        let evidence = this.props.symptoms.map(symptom => {
            return {
                id: symptom,
                choice_id: 'present',
                initial: true
            }
        })
        this.getDiagnosis(evidence)
    }

    getDiagnosis = async (evidence) => {
        console.log(evidence)
        const resDiagnosis = await fetch(`https://api.infermedica.com/v2/diagnosis`, {
            method: 'POST',
            headers: settings.headers,
            body: JSON.stringify({
                "sex": "male",
                "age": 30,
                "evidence": evidence
            })
        })
        console.log(resDiagnosis)
        this.setState({
            diagnosis: (await resDiagnosis.json()),
            evidence: this.state.evidence
        })
    }

    updateDiagnosis(newSymptoms) {
        let collection = JSON.parse(
            list.getItem('collection')
        ).concat(newSymptoms)
        list.setItem('collection', JSON.stringify(collection))
    }
    
    // onClick={() => {
    //     console.log(this.state.mapRiskFactors)
    //     this.props.updateRisks(this.state.mapRiskFactors)
    //     }}

    render() {
        let diagnosis = [this.state.diagnosis]
        console.log(diagnosis)

        console.log(diagnosis.should_stop)

        console.log(Object.keys(diagnosis[0]).length > 0, diagnosis.should_stop !== undefined)
        return (
            <div>
                <Fragment>
                    <ul>
                        {Object.keys(diagnosis[0]).length > 0 
                            && diagnosis[0].question !== null &&
                            
                            <Fragment>
                                <li>
                                    {diagnosis.should_stop === undefined ? (
                                        <Question question={diagnosis[0].question} callbackDiagnosis={this.updateDiagnosis} />
                                    ) : (
                                        <Conditions conditions={diagnosis[0].conditions} />
                                    )}
                                </li>
                            </Fragment>
                        }
                    </ul>
                </Fragment>
            </div>
        )
    }
}

  
export default Diagnosis;


