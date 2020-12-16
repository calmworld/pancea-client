import React, { Component, Fragment } from 'react'

export default class Single extends Component {
    constructor(props) {
        super(props)
        
        this.handleSymptom = this.handleSymptom.bind(this)
    }
    
    handleSymptom = event => {
        let { id, value } = event.target
        //this.setState({[event.target.id]: event.target.value})

        this.props.callbackQuestion([{
			id: id,
			choice_id: value
		}])
    }


    render() {
        return (
            <div>
                <Fragment>
                    {this.props.items[0].choices.map((item) => 
                        <button key={item.id} 
                            id={this.props.items[0].id}
                            value={item.id}
                            onClick={this.handleSymptom}
                            className="btn btn-primary btn-lg btn-block">{item.label}</button>
                    )}
                </Fragment>
            </div>
        )
    }
}
