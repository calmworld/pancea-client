import React, { Component, Fragment } from 'react'

export default class Single extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleSymptom = this.handleSymptom.bind(this)
    }
    
    handleSymptom = (event) => {
        let { id, value } = e.target
        this.setState({[event.target.id]: event.target.value})

        this.props.callBackQ([{
			id: id,
			choice_id: value
		}])
    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}