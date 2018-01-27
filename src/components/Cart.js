import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'

import {
    REMOVE_FROM_CART,
} from '../Types'

class Cart extends Component {
    constructor(props) {
        super(props);
    }
    totalPrice() {
        return this.props.cart.map(item => item.basePrice)
                .reduce((total, amount) => (parseFloat(total) + parseFloat(amount)).toFixed(2))
    }
    render() {
        if (this.props.cart.length <= 0) {
            return <div><h1>Cart</h1><div>Empty</div></div>
        }
        return (
            <div>
                <h1>Cart</h1>
                <div>{this.props.cart.length} Pizzas</div><br />
                <div>Total Price: {this.totalPrice()}</div><br />
                <table>
                    <thead>
                        <tr>
                            <th>Topping</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.cart.map((item, index) => 
                        <tr key={index}>
                                <td>
                                    <input 
                                        type="checkbox"
                                        checked={item.topping}
                                        readOnly
                                    />
                                    {item.topping}
                                </td>
                                <td>{item.size}</td>
                                <td>{item.basePrice}</td>
                                <td><button onClick={() => this.props.removeFromCart(item)}>Remove</button></td>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        cart: state.cart
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeFromCart: item => dispatch(createAction(REMOVE_FROM_CART)(item))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);