import React, {Component} from 'react';
import axios from 'axios';

//loggedinUser="ll"


export default class CreateProduct extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            Price: '',
            Quantity: '',
            Owner:'',
            Orders:0,
            Status:''
        }

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeName(event) {
        this.setState({ name: event.target.value });
    }

    onChangePrice(event) {
        this.setState({ Price: event.target.value });
    }

    onChangeQuantity(event) {
        this.setState({ Quantity: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newProduct = {
            name: this.state.name,
            Price: this.state.Price,
            Quantity: this.state.Quantity,
            Owner: localStorage.getItem('username'),
            Orders:0,
            Status:"waiting"
        }

        axios.post('http://localhost:4000/addprod', newProduct)
             .then(res => console.log(res.data))
             .catch(err => {
                console.log(err)
                alert("name not unique or a required field left empty")
            });


        this.setState({
            name: '',
            Price: '',
            Quantity: '',
            Owner:'',
            Orders:0,
            Status:''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangeName}
                               />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.Price}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.Quantity}
                               onChange={this.onChangeQuantity}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}