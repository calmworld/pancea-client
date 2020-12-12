import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Hello! How are you feeling today?</h2>
                        <p className="lead">I am a very intelligent bot</p><br/>
                        <p>I can help you find a diagnosis and connect you to a specialist</p><br/>
                        <Link className="link link-lg" to={`/symptoms`}>Symptom Evaluation</Link>
                    </div>
                </div>
            </div>
        )
    }
}
