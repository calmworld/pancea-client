import React, { Component, Fragment } from 'react'
import settings from '../settings.json'
import { connect } from 'react-redux'
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
        this.initializeDiagnosis = this.initializeDiagnosis.bind(this)
        this.updateDiagnosis = this.updateDiagnosis.bind(this)
    }

    componentDidMount() {
        this.initializeDiagnosis()
    }

    initializeDiagnosis() {
        let collection = this.props.store.symptomsReducer
        .concat(this.props.store.riskFactorsReducer)
        .map(item => {
            item['initial'] = true
            return item
        })
        if (!collection.length) {
            collection = JSON.parse(list.getItem('collection'))
        } else {
            list.setItem('collection', JSON.stringify(collection))
        }
    }

    getDiagnosis() {
        fetch(`https://api.infermedica.com/v2/diagnosis`, {
            method: 'POST',
            headers: settings.headers,
            body: JSON.stringify({
                "sex": "male",
                "age": 30,
                "evidence": this.state.evidence
            })
        }).then(res => res.json())
        .then(this.setState({
            evidence: this.state.evidence
        }))
    }

    updateDiagnosis(newSymptoms) {
        let collection = JSON.parse(
            list.getItem('collection')
        ).concat(newSymptoms)
        list.setItem('collection', JSON.stringify(collection))
    }

    render() {
        let diagnosis = this.state.diagnosis
        return (
            <div>
                <Fragment>
                    {Object.keys(diagnosis).length > 0 
                        && diagnosis.question !== null &&
                        <Fragment>
                            {!diagnosis.should_stop ? (
                                <Question question={diagnosis.question} callbackDiagnosis={this.updateDiagnosis} />
                            ) : (
                                <Conditions conditions={diagnosis.conditions} />
                            )}
                        </Fragment>
                    }
                </Fragment>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      store: state
    }
}
  
export default connect(mapStateToProps)(Diagnosis);