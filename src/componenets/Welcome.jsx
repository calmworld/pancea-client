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
                    <h1>TERMS OF USE</h1>
                    <h3>
                        Please read and review these Terms of Use carefully before accessing or using this Web site
                    </h3>
                    <h4>1. Content.</h4>
                    <p>
                        Panacea will use reasonable efforts to include accurate and up-to-date information on this Web site but makes no warranties or representations of any kind as to its accuracy, currency or completeness. You agree that access to and use of this Web site and the content thereof is at your own risk. Panacea disclaims all warranties, express or implied, including warranties of merchantability or fitness for a particular purpose. Neither Panacea nor any party involved in creating, producing or delivering this Web site shall be liable for any damages, including without limitation, direct, incidental, consequential, indirect or punitive damages, arising out of access to, use of or inability to use this Web site, or any errors or omissions in the content thereof. This limitation includes damages to, or for any viruses that infect, your computer equipment.
                    </p>
                    <h4>2. Medical Information.</h4>
                    <p>
                        This Web site may contain general information relating to various medical conditions and their treatment. Such information is provided for informational purposes only and is not meant to be a substitute for advice provided by a doctor or other qualified health care professional. Patients should not use the information contained herein for diagnosing a health or fitness problem or disease. Patients should always consult with a doctor or other health care professional for medical advice or information about diagnosis and treatment.
                    </p>
                    <h3>
                        By accessing or using this site, you acknowledge that you have read, understood and agreed to the Terms of Use Agreement. If you do not agree to the Terms of Use, you may not access or use the site.
                    </h3>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            I Agree to Panacea Terms of Service.
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
                    <br />
                    <br />
                </div>
            </div>
        )
    }
}
