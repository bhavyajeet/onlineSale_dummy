import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


let username = localStorage.getItem('username')

export default class logout extends Component {

    constructor(props) {
        super(props);
        this.state = { orders: [] }
        this.updateproduct = this.updateproduct.bind(this);
    }
    // /*
    updateproduct(event) {
        localStorage.clear()
        window.location.reload()
    }
    // */
    componentDidMount() {
        axios.post('http://localhost:4000/disp', {
            userName: username
        })
            .then(response => {
                //console.log(response.data[0].newmerge[0].Price)
                this.setState({ orders: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <td><button onClick={this.updateproduct}>Logout</button></td>

            </div>
        )
    }
}