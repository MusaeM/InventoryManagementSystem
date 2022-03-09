import React from 'react';
import ProductService from "../services/ProductService";
import { DataGrid } from '@mui/x-data-grid';
import CounterButton from './CounterButton';
import axios from "axios";

class ProductComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            counter:0
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    getProducts(){
        const PRODUCTS_REST_API_URL = 'http://localhost:8080/api/products';

        return axios.get(PRODUCTS_REST_API_URL)
    }

    componentDidMount() {
        this.getProducts().then((response) => {
            this.setState({
                products: response.data
            })

            console.log("RES: ", response)
            console.log("RES.DATA: ", response.data)
            console.log("RES-ID: ", response.data[0].id)
            console.log("RES-NAME: ", response.data[0].name)
            console.log("RES-QUANTITY: ", response.data[0].quantity)

            console.log("STATE: ", this.state.products);
            console.log("STATE-ID: ", this.state.products[0].id);
            console.log("STATE-NAME: ", this.state.products[0].name);
            console.log("STATE-QUANTITY: ", this.state.products[0].quantity);
            });
    }

    render (){
        return (
            <div className="table-container">
                <h1 className = "headline-center">Products List</h1>
                <table className="table table-lined">
                    <thead className="tablehead-text">
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Quantity</td>
                        <td>Description</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody className="tablebody-text">
                    {
                        this.state.products.map(
                            product =>
                                <tr key = {product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.description}</td>
                                    <td><CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/></td>
                                </tr>
                        )
                    }
                    </tbody>


                </table>

            </div>
        );
    }


    increment = (by) => {
        /*
        console.log(`Increment from child ${by}`)
        this.setState({
            products: [{
                ...this.state.products, quantity:+by
            }]
        })
         */
        console.log("QUANTITY-INCREMENT PRESSED: ", this.state.counter);
    }

    decrement = (by) => {
        /*
        console.log(`Decrement from child ${by}`)
        this.setState({
            products: [{
                ...this.state.products, quantity:-by
            }]
        })
         */
        console.log("QUANTITY-DECREMENT PRESSED: ", this.state.quantity);
    }


}

export default ProductComponent


/*
                    <tbody>
                    {
                        this.state.products.map(
                            product =>
                                <tr key = {product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.description}</td>
                                    <td><CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/></td>
                                </tr>
                        )
                    }
                    </tbody>
 */

/*


            <Button variant="contained" onClick={() => {
                return alert("Yey");
            }}>Buy</Button>,
            <Button variant="contained" onClick={() => {
                return alert("Nay");
            }}>Sell</Button>
 */

/*

<DataGrid
                    rows={this.state.products}
                    columns={columns}
                    pageSize={2}
                    rowsPerPageOptions={[2]}
                    checkboxSelection
                />


 */