import React, { Component, Fragment } from 'react'

export default class GroupSingle extends Component {
    constructor(props) {
        super(props)
        
        this.handleSymptom = this.handleSymptom.bind(this)
    }
    
    handleSymptom = (event) => {
        let { id, value } = event.target 
        // this.setState({[event.target.id]: event.target.value})

        this.props.callbackQuestion([{
			id: id,
			choice_id: value
		}])
    }

    render() {
        return (
            <div>
                <Fragment>
                {
                    this.props.items.map((item) =>
                        <div className="form-check" key={item.id}>
                            <input type="radio"
                                id={item.id}
                                name="group"
                                value="present"
                                onChange={this.handleSymptom}
                                className="form-check-input" />

                            <label htmlFor={item.id}
                                className="form-check-label">
                                {item.name}
                            </label>
                        </div>
				)}
                </Fragment>
            </div>
        )
    }
}
