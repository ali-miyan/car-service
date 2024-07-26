// src/slices/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    serviceId:'',
    servicePlace: '',
    address: '',
    carModel: '',
    additionalNotes: '',
  },
  reducers: {
    setServiceId(state, action) {
      state.serviceId = action.payload;
    },
    setServicePlace(state, action) {
      state.servicePlace = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    setCarModel(state, action) {
      state.carModel = action.payload;
    },
    setAdditionalNotes(state, action) {
      state.additionalNotes = action.payload;
    },
    resetOrder(state) {
      return {
        serviceId:'',
        servicePlace: '',
        address: '',
        carModel: '',
        additionalNotes: '',
      };
    },
  },
});

export const {
  setServiceId,
  setServicePlace,
  setAddress,
  setCarModel,
  setAdditionalNotes,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
