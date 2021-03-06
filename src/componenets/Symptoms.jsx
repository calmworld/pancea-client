import React, { Component, Fragment } from 'react'
import settings from '../settings.json'
import { Link } from 'react-router-dom'

const TYPE = 'symptom'
const REQUEST_TIMEOUT = 500
var timeout = null

class Symptoms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: '',
            symptoms: [],
            mapSymptoms: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.search = this.search.bind(this)
    }

    componenetDidMount() {
        this.updateSymptom()
    }

    updateSymptom = event => {
        let input = event.target.value 

        clearTimeout(timeout)

        timeout = setTimeout(() => {
            this.search(input, TYPE)
        }, REQUEST_TIMEOUT)
    }

    handleChange(event) {
        console.log(event)
        const {checked, id} = event.target
        const choiceId = checked ? 'present' : 'absent'
        if (choiceId === 'present') {
            this.setState({
                mapSymptoms: [...this.state.mapSymptoms, id]
            })
        } else {
            var array = this.state.mapSymptoms
            var index = array.indexOf(event.target.id)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({mapSymptoms: array});
            }
        }
        console.log(this.state.mapSymptoms)
    }

    search(key, type) {
        fetch(`https://api.infermedica.com/v2/search?phrase=${key}&sex=male&age.value=30&age.unit=year&max_results=8&type=${type}`, {
            method: 'GET',
            headers: settings.headers
        }).then(response => {
            return response.json()
        }).then(searchResult => {
            this.setState({
                symptoms: searchResult
            })
        })
        
    }
    

    render() {
        return (
            <div className="container">
                <div className="form-group row">
                    <label htmlFor="key" className="col-form-label">What seems to be the problem?</label>
                    <div className="col-sm-10">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="key" 
                            placeholder="upset stomach" 
                            onChange={this.updateSymptom}
                        />
                    </div>
                </div>
                {!this.state.symptoms.length ? (<h5>P.S. I can understand non-medical terms</h5>)
                : (
                    <Fragment>
                        <div className="form-group">
                            {
                                this.state.symptoms.map(symptom => {
                                    return (
                                    <div className="form-check" key={symptom.id}>
                                        <input 
                                            type="checkbox" 
                                            id={symptom.id} 
                                            className="form-check-input" 
                                            onChange={this.handleChange}
                                        />
                                        <label 
                                            htmlFor={symptom.id} 
                                            className="form-check-label">
                                                {symptom.label}
                                        </label>
                                    </div>
                                    )
                                })
                            }
                        </div>
                        <button onClick={() => {
                            console.log(this.state.mapSymptoms)
                            this.props.updateSymptoms(this.state.mapSymptoms)
                            }}>
                            <Link className="link link-lg" to={`/risk-factors`}>Symptom assessment</Link>
                        </button>
                    </Fragment>
                )}
            </div>
        )
    }
}


export default Symptoms;
