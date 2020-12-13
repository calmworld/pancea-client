import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agree: false,
            redirect: false
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name 

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.setState({ redirect: true})
    }


    render() {
        if(this.state.redirect) {
            return <Redirect to={'/Home'}/>
        }
        return (
            <div>
                <div>
                    <h2>Disclaimer</h2>
                    <h4>
                    This tool does not provide medical advice. It is intended for informational purposes only. 
                    It is not a substitute for professional medical advice, diagnosis or treatment. 
                    Never ignore professional medical advice in seeking treatment because of something you have read on the Panacea Site. 
                    If you think you may have a medical emergency, immediately call your doctor or dial 911.
                    </h4>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            I Agree
                            <input 
                            name="agree" 
                            type="checkbox" 
                            checked={this.state.agree} 
                            onChange={this.handleInputChange}
                            />
                        </label>
                        <br />
                        <br />
                        {this.state.agree ? 
                        <button type="submit" value="submit">Continue</button>
                        : ""}
                    </form>
                </div>
            </div>
        )
    }
}
