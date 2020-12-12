import React, { Component } from 'react'
import Symptoms from './Symptoms'


export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Hello! I am a very intelligent bot</h2>
                        <p className="lead">I can help you find a diagnosis and connect you to a specialist</p><br/>
                        <Symptoms>Symptom Evaluation</Symptoms>
                    </div>
                </div>
            </div>
        )
    }
}
