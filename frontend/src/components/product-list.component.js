import React, { Component } from 'react';
import axios from 'axios';

let username = localStorage.getItem('username')


export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = { products: [] }
        this.removeproduct = this.removeproduct.bind(this);
    }
    removeproduct(event) {
        console.log(event.target.value)
        console.log("name");
        axios.post('http://localhost:4000/updprod', {
            productname: event.target.value,
            action: "remove",
            vendorname: username
        })
            // .then(response => {
            //     this.setState({products: response.data});
            // })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        axios.post('http://localhost:4000/showprod', {
            userName: localStorage.getItem('username')
        })
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <table className="table table-striped ">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>MinQuantity</th>
                            <th>ordered</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.products.map((currentProduct, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{currentProduct.name}</td>
                                        <td>{currentProduct.Quantity}</td>
                                        <td>{currentProduct.Orders}</td>
                                        <td>{currentProduct.Price}</td>
                                        <td><button onClick={this.removeproduct} value={currentProduct.name}>remove</button></td>
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