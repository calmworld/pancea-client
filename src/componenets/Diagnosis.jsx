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
        // this.initializeDiagnosis = this.initializeDiagnosis.bind(this)
        this.updateDiagnosis = this.updateDiagnosis.bind(this)
    }

    componentDidMount() {
        // this.initializeDiagnosis()
        let evidence = this.props.symptoms.map(symptom => {
            // symptom['initial'] = true
            return {
                id: symptom,
                choice_id: 'present',
                initial: true
            }
        })
        this.getDiagnosis(evidence)
    }

    // initializeDiagnosis = async () => {
    //     let collection = this.props.store.symptomsReducer
    //     .concat(this.props.store.riskFactorsReducer)
    //     .map(item => {
    //         item['initial'] = true
    //         return item
    //     })
    //     if (!collection.length) {
    //         collection = JSON.parse(list.getItem('collection'))
    //     } else {
    //         list.setItem('collection', JSON.stringify(collection))
    //     }
    //     this.getDiagnosis(collection)
    // }

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

    // updateDiagnosis(newSymptoms) {
    //     let collection = JSON.parse(
    //         list.getItem('collection')
    //     ).concat(newSymptoms)
    //     list.setItem('collection', JSON.stringify(collection))
    // }

    updateDiagnosis(newSymptoms) {
        let collection = JSON.parse(
            list.getItem('collection')
        ).concat(newSymptoms)
        list.setItem('collection', JSON.stringify(collection))
    }
    

    render() {
        let diagnosis = [this.state.diagnosis]
        console.log(diagnosis)

        //console.log(Object.keys(diagnosis[0]).length > 0)

        console.log(Object.keys(diagnosis[0]).length > 0, diagnosis.should_stop !== undefined)
        return (
            <div>
                <Fragment>
                    <ul>
                        {Object.keys(diagnosis[0]).length > 0 
                            && diagnosis[0].question !== null &&
                            
                            <Fragment>
                                <li>
                                    {diagnosis.should_stop !== undefined ? (
                                        <Question question={diagnosis.question} callbackDiagnosis={this.updateDiagnosis} />
                                    ) : (
                                        <Conditions conditions={diagnosis.conditions} />
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


