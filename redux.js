const { type } = require("os");
const { createStore } = require("redux");

// reducer
const locaReducer = (
    state = {
        login: false,
        cart: [{
            id: 1,
            name: "Product 1",
        }],
    },
    action
) => {
    switch (action.type) {
        case "SET_LOGIN":
            return {
                ...state,
                login: action.payload,
            };
        case "SET_CART":
            return {
                ...state,
                cart: action.payload,
            };
        default:
            return state;
    }
}

// store
const store = createStore(locaReducer);
console.log("oncreate store : ", store.getState());

// subscript
store.subscribe(() => {
    console.log("onchange store : ", store.getState());
});

// dispatch
const action1 = {
    type: "SET_LOGIN",
    payload: true,
};

const action2 = {
    type: "SET_CART",
    payload: {
        id: 2,
        name: "Product 2",
    },
};

store.dispatch(action1);
store.dispatch(action2);