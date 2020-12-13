import React, { Component } from 'react'
import { Link } from "react-router-dom"


export default class Home extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Hello! I am a very intelligent bot</h2>
                        <p className="lead">I can help you find a diagnosis and connect you to a specialist</p>
                        <Link className="link link-lg" to={`/symptoms`}>Evaluate My Symptoms</Link>
                    </div>
                </div>
            </div>
        )
    }
}
