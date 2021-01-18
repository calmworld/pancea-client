import React, { Component } from 'react'
import { Link } from 'react-router-dom'


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
                <p className="lead">I can help you find a diagnosis for your symptoms!</p>
                <button>
                    <Link className="link link-lg" to={`/symptoms`}>Evaluate My Symptoms</Link>
                </button>
            </div>
        )
    }
}
