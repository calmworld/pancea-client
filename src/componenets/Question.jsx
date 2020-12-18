import React, { Component } from 'react'
import Single from './Single'
import GroupSingle from './GroupSingle'
import GroupMultiple from './GroupMultiple'

export default class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
			symptoms: [],
			newSymptoms: [],
        }
        this.handleQuestion = this.handleQuestion.bind(this)
    }

    handleQuestion() {
        this.props.callbackDiagnosis(this.state.newSymptoms)
    }

    render() {
        let question = [this.props.question]
        console.log(question[0])
        let questionType
        switch(question[0].type) {
			case 'single':
				questionType = <Single items={question[0].items} callbackQuestion={this.props.callbackDiagnosis} />;
				break;
			case 'group_single':
				questionType = <GroupSingle items={question[0].items} callbackQuestion={this.props.callbackDiagnosis} />;
				break;
			case 'group_multiple':
				questionType = <GroupMultiple items={question[0].items} callbackQuestion={this.props.callbackDiagnosis} />;
				break;
			default:
		}
        return (
            <div className="container">
                <h4>Question</h4>
                <p className="lead">{question[0].text}</p>
				{questionType}          
            </div>
        )
    }
}
