import React, { Component, Fragment } from 'react'
import settings from '../settings.json'
import Conditions from './Conditions'
import Question from './Question'

//const list = localStorage

class Diagnosis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            diagnosis: {},
            evidence: [],
            questions: []
        }
        this.getDiagnosis = this.getDiagnosis.bind(this)
        this.addQuestion = this.addQuestion.bind(this)
    }

    componentDidMount() {
        this.setState({
            evidence: [...this.props.symptoms.map(symptom => {
                return {
                    id: symptom,
                    choice_id: 'present',
                    initial: true
                }
            })]
        }, () => this.getDiagnosis())
    }

    getDiagnosis = async () => {
        const resDiagnosis = await fetch(`https://api.infermedica.com/v2/diagnosis`, {
            method: 'POST',
            headers: settings.headers,
            body: JSON.stringify({
                "sex": "male",
                "age": 30,
                "evidence": [...this.state.evidence, ...this.state.questions]
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
    
    addQuestion(answer) {
        console.log(this.state.questions)
        this.setState({
            questions: [...this.state.questions, ...answer]
        }, () => {this.getDiagnosis()})
    }
    

    render() {
        let diagnosis = [this.state.diagnosis]
        console.log(diagnosis)
        console.log(this.state.diagnosis.should_stop)
        //console.log(diagnosis.should_stop)

        console.log(Object.keys(diagnosis[0]).length > 0, !diagnosis.should_stop)
        return (
            <div>
                <Fragment>
                    <ul>
                        {Object.keys(diagnosis[0]).length > 0 
                            && diagnosis[0].question &&
                            <Fragment>
                                <li>
                                    {!this.state.diagnosis.should_stop ? (
                                        <Question question={diagnosis[0].question} callbackDiagnosis={this.addQuestion} />
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


