import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Drugs from './Drugs'


export default class Home extends Component {
    constructor(props) {
        super(props)
        this.routeChange = this.routeChange.bind(this)
    }
    routeChange=()=> {
        let path = `/drugs`;
        this.props.history.push(path)
    }


    render() {
        return (
            <div className="container">
                <h2>Hello! I am Pancea</h2>
                <p className="lead">I can help you find a diagnosis and connect you to a specialist</p>
                <button>
                    <Link className="link link-lg" to={`/symptoms`}>Evaluate My Symptoms</Link>
                </button>
                <button>
                    <Link className="link link-lg" to={`/drugs`}>Drugs</Link>
                </button>
            </div>
        )
    }
}
