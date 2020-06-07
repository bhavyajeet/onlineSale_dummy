import React, { Component } from 'react';
import axios from 'axios';

let username = localStorage.getItem('username')


export default class PrReview extends Component {

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
        axios.post('http://localhost:4000/showrev', {
            productid: this.props.location.state.productid,
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
            <div><h1>Reviews</h1>
                {
                    this.state.products.map((currentProduct, i) => {
                        return (
                            <p key={i}>
                                <b>Author:  </b>
                                {currentProduct.split('/%*')[0]}<br></br>
                                <b>Rating:  </b>
                                {currentProduct.split('/%*')[1]} <br></br>
                                <b>Review:</b><br></br><td>{currentProduct.split('/%*')[2]}</td>
                            </p>
                        )
                    })
                }
            </div>
        )
    }
}