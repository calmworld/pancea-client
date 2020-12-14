import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import settings from '../settings.json'


class Symptoms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            key: '',
            age: 30,
            symptoms: [],
            mapSymptoms: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.search = this.search.bind(this)
    }

    componenetDidMount() {
        this.search()
        this.props.onAddSymp(this.state.mapSymptoms)
    }


    search(event) {
        event.preventDefault()
        fetch(`https://api.infermedica.com/v2/search?phrase=${this.state.key}&sex=male&age.value=${this.state.age}&age.unit=year&max_results=8&type=symptom`, {
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
    

    render() {
        return (
            <div className="container">
                <div className="form-group row">
                    <label htmlFor="key" className="col-form-label">What seems to be the problem?</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="key" placeholder="upset stomach" onChange={this.search}></input>
                    </div>
                    <label htmlFor="age" className="col-form-label">Age</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" id="age" placeholder="28" onChange={this.search}></input>
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
                                        <input type="checkbox" id={symptom.id} className="form-check-input" onChange={this.handleChange}></input>
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