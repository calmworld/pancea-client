import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default class InfermedicaApi extends Component {
    constructor(appId, appKey, apiModel = 'infermedica-en', apiUrl = 'https://api.infermedica.com/v3/') {
        this.appId = appId
        this.appKey = appKey
        this.apiUrl = apiUrl
        this.apiModel = apiModel
        this. interviewId = null
    }

    getInterviewId() {
        this.interviewId = uuidv4()
    }

    req(method, url, data) {
        let headers = new Headers()
        headers.append('App-Id', this.appId)
        headers.append('App-Key', this.appKey)
        headers.append('Model', this.apiModel)
        headers.append('Content-Type', 'application/json')

        if (this.interviewId) {
            headers.append('Interview-Id', this.interviewId)
        }
        return fetch(this.apiUrl + url, {
            method,
            headers,
            body: data
        })
        .then((res) => {
            return res.json()
        })
    }

    _get(url) {
        return this._req('GET', url)
    }
    _post(url, data) {
        return this._req('POST', url, data)
    }
    diagnosis(data) {
        return this._post('diagnosis', JSON.stringify(data))
    }
    explain(data) {
        return this._post('explain', JSON.stringify(data))
    }
    parse(text) {
        return this._post('parse', JSON.stringify({'text': text}))
    }
    rationale(data) {
        return this._post('rationale', JSON.stringify(data))
    }
    recommendSpecialist(data) {
        return this._post('recommend_specialist', JSON.stringify(data))
    }
    riskFactors() {
        return this._get('risk_factors')
    }
    suggest(data) {
        return this._post('suggest', JSON.stringify(data))
    }
    symptoms() {
        return this._get('symptoms')
    }
    triage(data) {
        return this._post('triage', JSON.stringify(data))
    }
}
