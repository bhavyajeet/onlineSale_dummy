import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
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
        this.setState({ password: event.target.value });
    }

    onChangeUsertype(event) {
        this.setState({ usertype: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
            password: this.state.password,
            usertype: this.state.usertype
        }

        axios.post('http://localhost:4000/verify', newUser)
            .then(res => {
                console.log(res.data)
                if (res.data.status === "success") {
                    localStorage.setItem('username', newUser.username);
                    localStorage.setItem('usertype', res.data.type);
                    localStorage.setItem('logggedin', 1);
                    window.location.reload()

                }
                else {
                    alert("invalid credentials")
                }
            })
            .catch(err => {
                console.log(err)
                alert("Username not unique or a required field left empty")
            })

        this.setState({
            username: '',
            password: '',
            usertype: ''
        });
        // window.location.reload()
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
                            value={this.state.password}
                            onChange={this.onChangeEmail}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}