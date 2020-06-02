import React, { Component } from 'react'
import './Square.css'

export default class Square extends Component {
    render() {
        return (
            <div className="box" onClick={()=>this.props.boxClick(this.props.id)}>
                {/* box {this.props.id} */}
                <div>{this.props.value}</div>
            </div>
        )
    }
}
