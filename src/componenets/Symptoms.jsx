import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import settings from '../settings.json'

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
        this.props.onAddSymp(this.state.mapSymptoms)
    }

    updateSymptom = event => {
        let input = event.target.value 

        clearTimeout(timeout)

        timeout = setTimeout(() => {
            this.search(input, TYPE)
        }, REQUEST_TIMEOUT)
    }

    handleChange(event) {
        const {checked, id} = event.target;
        const choiceId = checked ? 'present' : 'absent';
        this.setState({
            mapSymptoms: this.state.mapSymptoms.map(item => {
                if (id === item.id) {
                    item.choice_id = choiceId
                }
                return item
            })
        })
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
                                        <label htmlFor={symptom.id} className="form-check-label">{symptom.label}</label>
                                    </div>
                                    )
                                })
                            }
                        </div>
                    </Fragment>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        store: state
    }
}

const dispatchElement = dispatch => {
    return {
        onAddSymp: symptoms => {
            dispatch({type: 'ADD_SYMPTOMS', payload: symptoms})
        }
    }
}

export default connect(mapStateToProps, dispatchElement)(Symptoms);