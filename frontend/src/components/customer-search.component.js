import React, { Component } from 'react';


import { Link } from 'react-router-dom';
import axios from 'axios';
let userName = localStorage.getItem('username')
export default class CustSearch extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            productname: '',
            Price: 0,
            Quantity: '',
            vendorname: '',
            status: ''
        }

        this.state = { products: [] }
        // this.removeproduct = this.removeproduct.bind(this);


        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsertype = this.onChangeUsertype.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.orderproduct = this.orderproduct.bind(this);
        this.showreview = this.showreview.bind(this);
    }

    orderproduct(event) {
        event.preventDefault();
        console.log(event.target.value)
        console.log("name");
        var newarr = event.target.value.split(',');
        const enteredName = Number(prompt('Please enter the quantity'))
        let limit = Number(newarr[3])
        console.log(newarr[3])
        if (enteredName > limit) {
            alert("quantity exceeded bundle availability")
            return
        }
        if (enteredName < 1) {
            alert("Quantity must be >= 1 ")
            return
        }


        const newOrder = {
            //         vendorname:event.target.lol,
            username: userName,
            productname: newarr[0],
            productid: newarr[1],
            Price: 0,
            Quantity: enteredName,
            vendorname: event.target.id,
            status: 'waiting'
        }
        axios.post('http://localhost:4000/orderitem', newOrder)
            .then(response => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                alert("a requiredt field left empty")
            })
        const sth = {
            productname: newarr[0],
            vendorname: newarr[2],
            productid: newarr[1],
            action: "increase",
            quantity: enteredName,
            status: 'waiting'
        }
        console.log(sth)
        axios.post('http://localhost:4000/updprod', sth)
            .then(response => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
                alert("a required field eee left empty")
            })

        this.setState({
            username: '',
            productname: '',
            Price: 0,
            Quantity: '',
            vendorname: '',
            status: ''
        });
        //    window.location.reload();
    }
    showreview(event) {
        event.preventDefault();
        var newarr = event.target.value.split(',');
        let limit = Number(newarr[3])
        console.log(newarr[3])
        const newOrder = {
            //         vendorname:event.target.lol,
            username: userName,
            productname: newarr[0],
            productid: newarr[1],
            Price: 0,
            vendorname: event.target.id,
            status: 'waiting'
        }
        axios.post('http://localhost:4000/getreviews', newOrder)
            .then(response => {
                return (
                    <div><h1>lolol</h1></div>
                )
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);

            })
        //    window.location.reload();
    }



    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangeUsertype(event) {
        this.setState({ usertype: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(this.state.username)
        // const enteredName =Number(prompt('Sort by'))
        axios.post('http://localhost:4000/searchpro',
            {
                userName: this.state.username
            })
            .then(response => {
                this.setState({ products: response.data });
                console.log(response.data)
                //           console.log(this.state)
            })

            .catch(err => {
                console.log(err)
                alert("Username not unique or a required field left empty")
            })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Productname: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary" />
                    </div>
                </form>



                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>MinQuantity</th>
                            <th>ordered</th>
                            <th>Price</th>
                            <th>vendor</th>
                            <th>vendor score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((currentProduct, i) => {
                                console.log("p")
                                const sum = currentProduct.newmerge[0].rating.reduce((a, b) => a + b, 0);
                                const avg = (sum / currentProduct.newmerge[0].rating.length) || 0;
                                let a = 0
                                return (
                                    <tr key={i}>
                                        <td>{currentProduct.name}</td>
                                        <td>{currentProduct.Quantity}</td>
                                        <td>{currentProduct.Orders}</td>
                                        <td>{currentProduct.Price}</td>
                                        <td>{currentProduct.Owner}</td>
                                        <td>{avg.toFixed(2)}</td>
                                        {}
                                        <td><button onClick={this.orderproduct} value={[currentProduct.name, currentProduct._id, currentProduct.Owner, currentProduct.Quantity - currentProduct.Orders]} id={currentProduct.Owner}>order</button></td>

                                        <td>
                                            {<Link className="btn red shadow-move" onClick={this.props.onClick} to=
                                                {
                                                    {
                                                        pathname: "/showrev",
                                                        state: {
                                                            productid: currentProduct._id,
                                                            username: localStorage.getItem('username'),
                                                            //    orderid:currentOrder._id     
                                                        }
                                                    }
                                                }>get review</Link>}</td>
                                        {/* <td><button onClick={this.showreview} value={[currentProduct.name, currentProduct._id, currentProduct.Owner,currentProduct.Quantity-currentProduct.Orders]} id={currentProduct.Owner}>check review</button></td> */}
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