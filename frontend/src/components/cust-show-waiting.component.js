import React, { Component } from 'react';
import axios from 'axios';

let username = localStorage.getItem('username')

export default class CustOrder extends Component {

    constructor(props) {
        super(props);
        this.state = { orders: [] }
        this.updateproduct = this.updateproduct.bind(this);
    }
    // /*
    updateproduct(event) {
        console.log(event.target.value)
        console.log("name");
        var newarr = event.target.value.split(',');
        const enteredName = Number(prompt('Please enter the new quantity'))
        let limit = Number(newarr[3]) + Number(newarr[2])
        console.log(newarr[3])
        if (enteredName > limit) {
            alert("quantity exceeded bundle availability")
            return
        }
        if (enteredName < 1) {
            alert("Quantity must be >= 1 ")
            return
        }
        axios.post('http://localhost:4000/updquan', {
            productname: newarr[0],
            productid: newarr[4],
            updquan: enteredName,
            totalquan: Number(newarr[5]) - Number(newarr[2]) + enteredName,
            orderid: newarr[6]
        })
            // .then(response => {
            //     this.setState({products: response.data});
            // })
            .catch(function (error) {
                console.log(error);
            })
    }
    // */
    componentDidMount() {
        axios.post('http://localhost:4000/custorderswaiting', {
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
                            <th>vendorname</th>
                            <th>Quantity left</th>
                            <th>Status</th>
                            <th>Quan. ordered</th>
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
                                        <td>{currentOrder.Quantity}</td>
                                        {/* <td>{currentOrder.newmerge[0].Price}</td> */}
                                        <td><button onClick={this.updateproduct} value={[currentOrder.productname, currentOrder.vendorname, currentOrder.Quantity, currentOrder.newmerge[0].Quantity - currentOrder.newmerge[0].Orders, currentOrder.productid, currentOrder.newmerge[0].Orders, currentOrder._id]}>edit</button></td>
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