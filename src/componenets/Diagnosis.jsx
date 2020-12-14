import React, { Component } from 'react'
import settings from '../settings.json'

export default class Diagnosis extends Component {
    constructor(props) {
        super(props)
        this.state = {
            diagnosis: {},
            evidence: []
        }
        this.getDiagnosis = this.getDiagnosis.bind(this)
    }

    getDiagnosis() {
        const resDiagnosis = fetch(`https://api.infermedica.com/v2/diagnosis`, {
            method: 'POST',
            headers: settings.headers,
            body: JSON.stringify({
                "sex": "male",
                "age": 30,
                "evidence": evidence
            })
        })
        .then(this.setState({
            diagnosis: resDiagnosis.json(),
            evidence: evidence
        }))
    }



    render() {
        return (
            <div>
                
            </div>
        )
    }
}
