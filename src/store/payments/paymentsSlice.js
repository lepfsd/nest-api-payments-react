import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    payments: []
}

const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {
        addPayment: (state, action) => {
            state.payments.push(action.payload);
        },
        addPayments: (state, action) => {
            state.payments = action.payload;
        },
        deletePayment: (state, action) => {
            state.payments = state.payments.filter(paym => paym._id !== action.payload)
        },
        updatePayment: (state, action) => {
            const { id, name, url, token_url, enabled } = action.payload
            const existingPayment = state.payments.find(payment => payment._id === id)
            if (existingPayment) {
                existingPayment.name = name
                existingPayment.url = url
                existingPayment.token_url = token_url
                existingPayment.enabled = enabled
            }
        }
    }    
})

export const { addPayment, addPayments, deletePayment, updatePayment } = paymentsSlice.actions;

export default paymentsSlice.reducer;