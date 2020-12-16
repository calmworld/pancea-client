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
        console.log(question)
        let questionType
        switch(question.type) {
			case 'single':
				questionType = <Single items={question.items} callbackQuestion={this.handleQuestion} />;
				break;
			case 'group_single':
				questionType = <GroupSingle items={question.items} callbackQuestion={this.handleQuestion} />;
				break;
			case 'group_multiple':
				questionType = <GroupMultiple items={question.items} callbackQuestion={this.handleQuestion} />;
				break;
			default:
		}
        return (
            <div className="container">
                <h4>Question</h4>
                <p className="lead">{question}</p>
				{questionType}          
            </div>
        )
    }
}
