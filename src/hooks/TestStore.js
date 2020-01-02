import React, { useReducer, createContext } from 'react';


const initialState = {
    z: 100,
    a: 1,
    b: 2
}

const reducer = (state, { a, b }) => ({
    ...state,
    a,
    b,
})

const StoreContext = createContext(initialState);

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
};

export default StoreProvider

export { StoreContext }