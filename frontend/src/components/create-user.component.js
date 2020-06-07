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

        const newUser = {
            username: this.state.username,
            email: this.state.email,
            usertype: this.state.usertype
        }

        axios.post('http://localhost:4000/add', newUser)
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
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Usertype: </label><br></br>
                        <label for="customer">
                            <input type="radio" id="customer" name="usertype" value="customer" onChange={this.onChangeUsertype} />
                            Customer</label><br></br>
                        <label for="vendor">
                        </label><input type="radio" id="vendor" name="usertype" value="vendor" onChange={this.onChangeUsertype} />
                        <label for="vendor">Vendor</label>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}