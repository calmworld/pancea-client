import React, { Component, Fragment } from 'react'

export default class GroupMultiple extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symptoms: [] 
        }
        this.checkSymptom = this.checkSymptom.bind(this)
        this.handleSymptom = this.handleSymptom.bind(this)
    }

    componenetDidMount() {
        let elm = document.querySelector('button')
        if (this.state.symptoms.findIndex(item => item.choice_id === 'present') !== -1) {
            elm.style.visibility = 'visible'
        }
    }

    checkSymptom = event => {
        let {checked, id} = event.target
        let choiceId = checked ? 'present' : 'absent'
        this.setState(({symptoms}) => ({
            symptoms: symptoms.map(item => {
                if (id === item.id) {
                    item.choice_id = choiceId
                }
                return item
            })
        }))
    }

    handleSymptom() {
        this.props.callbackQuestion(
            this.state.symptoms
        )
        this.setState({
            symptoms: this.props.items.map(item => {
                return {
                    id: item.id,
                    choice_id: 'present'
                }
            })
        })
    }


    render() {
        return (
            <div>
                <Fragment>
                    <div className="form-group">
                        {this.props.items.map((item) =>
                            <div key={item.id} className="form-check">
                                <input type="checkbox"
                                    id={item.id}
                                    name="group"
                                    value="present"
                                    onChange={this.checkSymptom}
                                    className="form-check-input" />

                                <label htmlFor={item.id}
                                    className="form-check-label">
                                    {item.name}
                                </label>
                            </div>
                        )}
                    </div>
				<button className="btn btn-primary btn-lg btn-block next-btn" onClick={this.handleSymptom}>Continue</button>
			    </Fragment>
            </div>
        )
    }
}
