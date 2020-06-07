import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


let username = localStorage.getItem('username')

export default class Dispatched extends Component {

    constructor(props) {
        super(props);
        this.state = { orders: [] }
        //    this.updateproduct = this.updateproduct.bind(this);
    }
    /*
    updateproduct(event){
        console.log(event.target.value)
        console.log("name");
        axios.post('http://localhost:4000/updprod',{
            productname: event.target.value[0],
            action: "remove"
        })
        // .then(response => {
        //     this.setState({products: response.data});
        // })
        .catch(function(error) {
            console.log(error);
        })
    }
*/
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>product</th>
                            <th>customer</th>
                            <th>Status</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orders.map((currentOrder, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{currentOrder.productname}</td>
                                        <td>{currentOrder.username}</td>
                                        {/* <td>{currentOrder.newmerge[0].Quantity-currentOrder.newmerge[0].Orders}</td> */}
                                        <td>{currentOrder.newmerge[0].Status}</td>
                                        {/* <td>{currentOrder.newmerge[0].Quantity-currentOrder.newmerge[0].Orders}</td> */}
                                        {/* <td>{currentOrder.newmerge[0].Price}</td> */}
                                        <td>
                                            {<Link className="btn red shadow-move" onClick={this.props.onClick} to=
                                                {
                                                    {
                                                        pathname: "/showrev",
                                                        state: {
                                                            productid: currentOrder.productid,
                                                            username: localStorage.getItem('username'),
                                                            //    orderid:currentOrder._id     
                                                        }
                                                    }
                                                }>get review</Link>}
                                        </td>
                                        <td><button onClick={this.updateproduct} value={[currentOrder.productname, currentOrder.vendorname]}>edit</button></td>
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