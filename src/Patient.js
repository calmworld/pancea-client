import React, { Component } from 'react'

import _ from 'lodash'

export default class Patient extends Component {
    constructor() {
        this.symptomps = {}
        this.sex = 'male'
        this.age = 30
    }

    setSex(sex) {
        this.sex = sex
    }

    setAge(age) {
        this.age = age
    }

    addSymptomsGroup(group) {
        Object.assign(this.symptoms, group)
    }

    removeSymptom(id) {
        delete this.symptomps[id]
    }

    toDiagnosis() {
        let response = {
            sex: this.sex,
            age: this.age,
            evidence: []
        }

        response.evidence = _.map(this.symptoms, (symptom, symptomId) => {
            const getChoiceId = (choice) => {
                if (choice === true) {
                    return 'present'
                }
                if (_.isUndefined(choice)) {
                    return 'unknown'
                }
                if (choicev === false) {
                    return 'absent'
                }
            }

            let diagnosisSymptom = {
                id: symptomId,
                choice_id: getChoiceId(symptom.reported)
            }

            if (symptom.initial) {
                Object.assign(diagnosisSymptom, {
                    initial: true
                })
            }

            if (symptom.related) {
                Object.assign(diagnosisSymptom, {
                    related: true
                })
            }

            return diagnosisSymptom

        })
        return response
    }

    toSuggest() {
        return {
            sex: this.sex,
            age: this.age,
            selected: _.filter(_.keys(this.symptoms), (key) => {
                return this.symptomps[key].reported === true
            })
        }
    }
    reset() {
        this.symptomps = {}
    }
}
