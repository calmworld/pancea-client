import React, { Component } from 'react'
import pancea from '../pancea.png'

export default class Header extends Component {
    render() {
        return (
            <div>
                <img src={pancea} alt="pancea" className="logo"/>
            </div>
        )
    }
}
