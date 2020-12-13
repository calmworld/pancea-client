import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import settings from '../settings.json'

const TYPE = 'symptom';
const REQUEST_TIMEOUT = 500;
var timer = null;

class Symptoms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symptoms: [],
            mapSymptoms: []
        }
    }

    updateSymp = event => {
        let inputVal = event.target.value.substr(0, 20)

        clearTimeout(timer)

        timer = setTimeout(() => {
            this.search(inputVal, TYPE)
        }, REQUEST_TIMEOUT)
    }

    changeSymp = event => {
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

    search = async (key, type) => {
        const response = await fetch(`https://api.infermedica.com/v2/search?phrase=${key}` +
        `&sex=male&max_results=5&type=${type}`, {
            method: 'GET',
            headers: settings.headers
        })
        this.mapDataToEvidence(await response.json())
    }

    mapDataToEvidence(searchResult) {
        this.setState({
          symptoms: searchResult,
          mapSymptoms: searchResult.map(item => {
            return {
              id: item.id,
              choice_id: 'absent'
            }
          })
        });
    }


    componenetDidMount() {
        this.props.onAddSymp(this.state.mapSymptoms)
    }

    render() {
        return (
            <div className="container">
                <div className="form-group row">
                    <label htmlfor="colFormLabel" className="col-form-label">What seems to be the problem?</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="colFormLabel" placeholder="upset stomach" onChange={this.updateSymp}></input>
                    </div>
                </div>
                {!this.state.symptoms.length ? (<h5>Don't wory about correct medical terms</h5>)
                : (
                    <Fragment>
                        <div className="form-group">
                            {this.state.symptoms.map(symptom => (
                                <div className="form-check" key={symptom.id}>
                                    <label htmlFor={symptom.id} className="form-check-label">{symptom.label}</label><br/>
                                    <input type="checkbox" id={symptom.id} className="form-check-input" onChange={this.changeSymp}></input>
                                </div>
                            ))}
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