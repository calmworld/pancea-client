import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import pancea from '../pancea.png'

class Header extends Component {
    constructor(props) {
        super(props)
        this.routeChange = this.routeChange.bind(this)
    }
    routeChange=()=> {
        let path = `/`;
        this.props.history.push(path)
    }

    render() {
        return (
            <div>
                <img 
                src={pancea} 
                alt="pancea" 
                className="logo"
                onClick={this.routeChange}
                />
            </div>
        )
    }
}

export default withRouter(Header)