import React, { Component } from 'react'
import DrugForm from './DrugForm'

const baseURL = 'https://pancea-backend.herokuapp.com'
// const baseURL = 'http://localhost:4000'

export default class Drugs extends Component {
    constructor() {
        super()
        this.state = {
            drugs: []
        }
        this.getDrugs = this.getDrugs.bind(this)
        this.handleAddDrug = this.handleAddDrug.bind(this)
        this.deleteDrug = this.deleteDrug.bind(this)
    }

    componentDidMount() {
        this.getDrugs()
    }

    handleAddDrug(drug) {
        this.setState({
          drugs: this.state.drugs.concat(drug)
        })
    }


    getDrugs() {
        fetch(baseURL + '/drugs')
        .then(data => {
            return data.json()
        })
        .then(parsedData => {
            this.setState({
                drugs: parsedData
            })
        })
    }

    deleteDrug(id) {
        fetch(baseURL + '/drugs/' + id, {
            method: 'DELETE'
        }).then( response => {
            const findIndex = this.state.drugs.findIndex(drug => drug._id === id)
            const copyDrugs = [...this.state.drugs]
            copyDrugs.splice(findIndex, 1)
            this.setState({ drugs: copyDrugs })
        })
    }

    render() {
        return (
            <div>
                <h3>Medications</h3>
                <DrugForm handleAddDrug={this.handleAddDrug} /><br />
                <table className="table">
                    <tbody>
                        {
                        this.state.drugs.map(drug => {
                            return (
                            <tr>
                                <th><h3>Name </h3></th>
                                <td key={drug._id}>
                                {drug.name}
                                </td>
                                <th><h3>Taken For </h3></th>
                                <td>
                                {drug.takenFor}
                                </td>
                                <td onClick={ () => this.deleteDrug(drug._id) }>X</td>
                            </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
