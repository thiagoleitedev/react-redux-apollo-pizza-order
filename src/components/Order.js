import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import { fetchData } from '../actions'

import {
    FETCHING_DATA,
    FETCHING_PIZZA_BY_NAME,
    ADD_TO_CART,
} from '../Types'

const divStyle = {
    float: 'left'
}

class Order extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orderId: 1,
            topping: false,
            size: '',
            basePrice: 0,
        }
    }

    componentDidMount() {
        this.props.fetchData()
    }

    handleChange = (field) => (event) => {
        this.setState({ [field]: event.target.value });
    }

    handleChangeCheckbox = () => (event) => {
        this.setState({ topping: !this.state.topping })
    }

    handleChangeSize = () => (event) => {
        this.setState({ 
            size: event.target.value,
            basePrice: this.props.pizzaSizes
                            .filter(item => item.name === event.target.value)
                            .map(item => item.basePrice)
        })
    }

    handleAddToCart = () => {
        if (!this.state.size) {
            alert('Please, choose a pizza size')
            return
        }
        this.props.addToCart(this.state)
        this.setState({
            orderId: ++this.state.orderId,
            topping: false,
            size: '',
            basePrice: 0,
        })
    }

    render() {
        const { pizzaSizes } =  this.props
        return (
            <div>
                <h1>Pizza Order</h1>
                <div style={divStyle}>
                    <label>
                        <input 
                            type="checkbox"
                            onChange={this.handleChangeCheckbox()}
                            checked={this.state.topping}
                        />
                        Topping
                    </label>
                </div>

                <div style={divStyle}>

                    <select value={this.state.size} onChange={this.handleChangeSize()}>
                        <option value="" default>Select size</option>
                        {
                            pizzaSizes && pizzaSizes.map((item, index) =>
                                    <option key={index} value={item.name}>{item.name}</option>
                            )
                        }
                    </select>
                </div>
                
                <div style={divStyle}>
                    <button onClick={() => this.handleAddToCart()} >Add to cart
                    </button>
                </div>

                <div style={{clear: 'both'}}></div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        pizzaSizes: state.data.pizzaSizes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(createAction(FETCHING_DATA)()),
        addToCart: (item) => dispatch(createAction(ADD_TO_CART)(item)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Order);