import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

let username = localStorage.getItem('username')

export default class CustOrder extends Component {

    constructor(props) {
        super(props);
        this.state = { orders: [] }
        this.ratevendor = this.ratevendor.bind(this);
        this.updateproduct = this.updateproduct.bind(this);
        this.rateorder = this.rateorder.bind(this);
    }
    // /*

    updateproduct(event) {
        console.log(event.target.value)
        console.log("name");
        axios.post('http://localhost:4000/updprod', {
            productname: event.target.value[0],
            action: "remove"
        })
            // .then(response => {
            //     this.setState({products: response.data});
            // })
            .catch(function (error) {
                console.log(error);
            })
    }

    ratevendor(event) {
        console.log(event.target.value)
        console.log("name");
        const rating = Number(prompt('Please rate the vendor between 0 to 10'))
        if (rating < 0) {
            alert("invalid rating")
            return;
        }
        if (rating > 10) {
            alert("invalid rating")
            return;
        }
        var newarr = event.target.value.split(',');
        axios.post('http://localhost:4000/ratevendor', {
            vendorname: newarr[1],
            ratingval: rating,
            orderid: newarr[2]
        })
            .then(response => {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    rateorder(event) {
        console.log(event.target.value)
        console.log("name");
        const rating = Number(prompt('Please rate the order between 0 to 10'))
        const review = (prompt('Enter review'))
        if (rating < 0) {
            alert("invalid rating")
            return;
        }
        if (rating > 10) {
            alert("invalid rating")
            return;
        }
        if (review == null) {
            alert("hi ra")
        }
        var newarr = event.target.value.split(',');
        axios.post('http://localhost:4000/rateorder', {
            vendorname: newarr[1],
            ratingval: rating,
            reviews: review,
            orderid: newarr[2]
        })
            .then(response => {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

























    componentDidMount() {
        axios.post('http://localhost:4000/custorders', {
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>vendor</th>
                            <th>Quantity left</th>
                            <th>Status</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map((currentOrder, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{currentOrder.productname}</td>
                                        <td>{currentOrder.vendorname}</td>
                                        <td>{currentOrder.newmerge[0].Quantity - currentOrder.newmerge[0].Orders}</td>
                                        <td>{currentOrder.newmerge[0].Status}</td>
                                        <td>{currentOrder.newmerge[0].Price}</td>
                                        {/* <td><button onClick={this.updateproduct} value={[currentOrder.productname,currentOrder.vendorname]}>update</button></td> */}
                                        {currentOrder.hasratedv == true ? (
                                            <td><button>rated</button></td>) : <td><button onClick={this.ratevendor} value={[currentOrder.productname, currentOrder.vendorname, currentOrder._id]}>rate vendor</button></td>}
                                        {currentOrder.newmerge[0].Status !== 'dispatched' ? (
                                            <td></td>) :
                                            <Link className="btn red shadow-move" onClick={this.props.onClick} to=
                                                {
                                                    {
                                                        pathname: "/customerdet",
                                                        state: {
                                                            productid: currentOrder.productid,
                                                            username: localStorage.getItem(username),
                                                            orderid: currentOrder._id
                                                        }
                                                    }
                                                }>View</Link>}
                                        {/* <td><button onClick={this.rateorder} value={[currentOrder.productname,currentOrder.vendorname,currentOrder._id]}>riview order</button></td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Link className="btn red shadow-move" onClick={this.props.onClick} to=
                    {
                        {
                            pathname: "/customerdet",
                            state: {
                                productname: "lol"
                            }
                        }
                    }>View</Link>
            </div>
        )
    }
}