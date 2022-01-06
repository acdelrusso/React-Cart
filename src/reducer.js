
const reducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR_CART':
            return {...state, cart: []}

        case 'REMOVE':
            const newCart = state.cart.filter((item) => item.id !== action.payload)
            return {...state, cart: newCart}

        case 'INCREASE':
            let tempCart = state.cart.map((cartItem) => {
                if(cartItem.id === action.payload){
                    return {...cartItem, amount: cartItem.amount + 1}
                }
                return cartItem
            })
            return{...state, cart:tempCart}

        case 'DECREASE':
            let temp = state.cart.map((cartItem) => {
                if(cartItem.id === action.payload) {
                    return {...cartItem, amount: cartItem.amount - 1}
                }
                return cartItem
            })
            .filter((cartItem) => cartItem.amount !== 0)
            return {...state, cart: temp}

        case 'GET_TOTALS':
            let {total, amount} = state.cart.reduce((cartTotal, cartItem) => {
                const {price, amount} = cartItem;
                const itemTotal = price * amount;
                cartTotal.total += itemTotal;
                cartTotal.amount += amount;
                

                return cartTotal
             }, 
            {total:0, amount: 0}
            )

            total = parseFloat(total.toFixed(2))

            return {...state, total, amount}

        case 'LOADING':
            return{...state, loading: true}

        case 'DISPLAY_ITEMS':
            return{...state, cart: action.payload, loading:false}

        default:
            break;
    }
    return state
}

export default reducer