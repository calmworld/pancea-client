import React, { Component } from 'react'

export default class RiskFactors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            riskFactors: commonRiskFactors,
            mapRiskFactors: []
        }
    }

    mappingRiskFactors(riskFactors) {
        this.setState({
            mapRiskFactors: riskFactors.map(item => {
                return {
                    id: item.id,
                    choice_id: 'absent'
                }
            })
        })
    }

    changeRiskFactor(event) {
        const {checked, id} = event.target
        const choiceId = checked ? 'present' : 'absent'
        this.setState(({mapRiskFactors}) => ({
            mapRiskFactors: mapRiskFactors.map(item => {
                if (id === item.id) {
                    item.choice_id = choiceId
                }
                return item
            })
        }))
    }

    componenetWillMount() {
        
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
