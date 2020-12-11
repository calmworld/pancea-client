import React, { Component } from 'react'

import template from '../templates/Card'
import settings from '../settings'
import Patient from '../Patient'

export default class Home extends Component {
    constructor(element) {
        super(element, template)
        this.api = new InfermedicaApi(settings['app-id'], settings['app-key'])
        this.patient = new Patient()
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
