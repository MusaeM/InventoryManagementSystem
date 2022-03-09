import React, {Component} from 'react';
import {Button} from "@mui/material";

class CounterButton extends Component{

    constructor() {
        super();
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    render(){
        return(
            <div className="Counter">
                <Button variant="contained" onClick={this.increment}>Buy</Button>
                &nbsp; &nbsp;
                <Button variant="contained" onClick={this.decrement}>Sell</Button>
            </div>
        );
    }

    increment() {
        this.props.incrementMethod(this.props.by)
    }

    decrement() {
        this.props.decrementMethod(this.props.by)
    }

}

export default CounterButton