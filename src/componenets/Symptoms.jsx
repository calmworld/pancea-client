import React, { Component, Fragment } from 'react'
import settings from '../settings.json'

export default class Symptoms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symptoms: [],
            mapSymptoms: []
        }
    }

    updateSymp(event) {
        event.target.value.substr(0, 20)
    }

    changeSymp(event) {
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

    componenetDidMount() {
        this.search()
        this.props.onAddSymp(this.state.mapSymptoms)
    }

    async search(key, type) {
        const response = await fetch(`https://api.infermedica.com/v3/search?phrase=${key}` +
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

    dispatchElement(dispatch) {
        return {
            onAddSymp: symptoms => {
                dispatch({type: 'ADD_SYMPTOMS', payload: symptoms})
            }
        }
    }

    mapStateToProps(state) {
        return {
            store: state
        }
    }

    render() {
        return (
            <form onSubmit={this.mapDataToEvidence}>
                <div className="form-group">
                    <label>What seems to be the problem?</label><br />
                    <input type="text" className="form-control" placeholder="upset stomach" onChange={this.updateSymp}></input>
                </div>
                {!this.state.symptoms.length ? (<h5>Which symptoms are applicable to you?</h5>)
                 : (
                    <Fragment>
                        <div className="form-group">
                            {this.state.symptoms.map(symptom => (
                                <div className="form-check" key={symptom.id}>
                                    <label htmlFor={symptom.id} className="form-check-label">{symptom.label}</label><br/>
                                    <input type="checkbox" id={symptom.id} className="form-check-input" onChange={this.changeSymp}></input>
                                    <br />
                                </div>
                            ))}
                        </div>
                    </Fragment>
                )}
                <br />
                <input type="submit" value="submit"/>
            </form>
        )
    }
}
