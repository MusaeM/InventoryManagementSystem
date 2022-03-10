import React from 'react';
import {Button, TextField} from "@mui/material";
import Popup from "reactjs-popup";
import ProductService from "../services/ProductService";

/**
 * Creates table-head
 *
 * @returns {JSX.Element}
 * @constructor
 */
const TableHeader = () => {
    return (
        <thead className="tablehead-text">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Description</th>
        </tr>
        </thead>
    )
}

//Variable to hold value from TextField from className="value-box"
let stockValue = 0;

/**
 * Creates table-body, consisting of object and edit-button for each.
 * Edit-button pops up window to modify stock
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TableBody = (props) => {
    const rows = props.productData.map((row, id) => {
        return (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td >{row.quantity}</td>
                <td>{row.description}</td>
                <td>
                    <Popup trigger={<Button variant="contained"> Edit Stock </Button>}
                               position="center">
                        <div className="popup-box">
                            <div className="popup-window">
                                    <div className="productbox-pop">
                                        <div className="productname-pop">
                                            {row.name}
                                        </div>
                                        <br />
                                        <div className="quantity-box">
                                            <table>
                                                <thead className="tablehead-pop">
                                                    <tr>
                                                        <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="tablebody-pop">
                                                    <tr>
                                                        <th>{row.quantity}</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                <div className="value-box">
                                        <div className="each-editbox">
                                            <TextField label="Amount to re-stock" onChange={handleOnChange} type="number" />
                                            <Button variant="contained" onClick={() => props.incrementQuantity(row.id-1, stockValue)}>Buy</Button>
                                        </div>
                                        <div className="each-editbox">
                                            <TextField label="Amount to sell" onChange={handleOnChange} type="number" />
                                            <Button variant="contained" onClick={() => props.decrementQuantity(row.id-1, stockValue)}>Sell</Button>
                                        </div>
                                </div>

                            </div>
                        </div>
                    </Popup>
                </td>
            </tr>
        )
    })
    return <tbody className="tablebody-text">{rows}</tbody>
}

/**
 * Receives String from TextField in className="value-box",
 * parses String to Int and proceeds to save value
 * @param event
 */
const handleOnChange = event => {
    stockValue = parseInt(event.target.value);
};


class ProductComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    /**
     * Brings Object from Rest-API linked in ProductService.js
     * Assigns it to this.state.products
     */
    componentDidMount() {
        ProductService.getProducts().then((response) => {
            this.setState({
                products: response.data
            })
        });
    }

    /**
     * Receives index of row (in a lazy and sloppy manner, row.index-1), and the valueinput from TextField,
     * creates Array-copy of existing object, proceeds to add valueinput to copy of quantity,
     * replaces old with new copied Array
     * @param index
     * @param value
     */
    incrementQuantity = (index, value) => {

        this.setState((incArray) => {
            incArray.products[index].quantity += value;
            return incArray
        });
    }

    /**
     * Receives index of row (in a lazy and sloppy manner, row.index-1), and the valueinput from TextField,
     * creates Array-copy of existing object, proceeds to subtract valueinput from copy of quantity,
     * replaces old with new copied Array
     *
     * If-statement: If Quantity is greater than or equal to value, proceed to subtract
     * @param index
     * @param value
     */
    decrementQuantity = (index, value) => {
        console.log("IncArray", this.state.products)
        this.setState((incArray) => {
            if(incArray.products[index].quantity >= value ) {
                incArray.products[index].quantity -= value;
                return incArray
            } else {
                alert("Not enough products in stock!")
            }
            console.log("IncArray", incArray)
        });
    }


    render (){
        return (
            <div className="table-container">
                <h1 className = "headline-center">Product List</h1>
                <br/>
                <table className="table table-lined">
                    <TableHeader />
                    <TableBody productData={this.state.products} incrementQuantity={this.incrementQuantity} decrementQuantity={this.decrementQuantity}/>
                </table>
            </div>
        );
    }

}

export default ProductComponent