import React, { Component } from 'react'

export default class InfermedicaApi extends Component {
    constructor(appId, appKey, apiModel = 'infermedica-en', apiUrl = 'https://api.infermedica.com/v3/') {
        this.appId = appId
        this.appKey = appKey
        this.apiUrl = apiUrl
        this.apiModel = apiModel
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
