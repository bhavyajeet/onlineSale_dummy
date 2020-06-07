import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            usertype: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsertype = this.onChangeUsertype.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeUsertype(event) {
        console.log(event.target.value)
        this.setState({ usertype: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        // console.log(this.state.username)

        const newUser = {
            rating: this.state.username,
            review: this.state.email,
            user: localStorage.getItem('username'),
            productid: this.props.location.state.productid,
            orderid: this.props.location.state.orderid
        }

        axios.post('http://localhost:4000/rateorder', newUser)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
                alert("Username not unique or a required field left empty")
            })

        this.setState({
            username: '',
            email: '',
            usertype: ''
        });
    }

    render() {
        return (
            <div>
                <h1>{this.props.location.state.orderid}</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Rating: </label>
                        <input type="Number" min="0" max="10"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Review: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}