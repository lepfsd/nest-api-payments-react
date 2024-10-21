import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users/usersSlice';
import paynmentsReducer from './payments/paymentsSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        payments: paynmentsReducer
    }
})