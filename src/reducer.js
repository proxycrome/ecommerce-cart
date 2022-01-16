const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }

  if (type === "REMOVE") {
    const newCart = state.cart.filter((item) => item.id !== payload);
    return { ...state, cart: newCart };
  }

  if (type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }

  if (type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }

  if (type === "GET_TOTALS") {
    let { amount, total } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { amount, price } = cartItem;
        const itemTotal = amount * price;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      { amount: 0, total: 0 }
    );
    total = parseFloat(total.toFixed(2));

    return { ...state, amount, total };
  }

  if (type === "LOADING") {
    return { ...state, loading: true };
  }

  if (type === "DISPLAY_ITEMS") {
    return { ...state, cart: payload, loading: false };
  }

  if (type === "TOGGLE_AMOUNT") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === payload.id) {
          if (payload.type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (payload.type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }

  throw new Error('No matching action type')
};

export default reducer;
