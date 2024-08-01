// src/slices/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    serviceId: "",
    servicePlace: "",
    selectedPlace:"",
    serviceDate: "",
    address: {},
    carModel: "",
    additionalNotes: "",
  },
  reducers: {
    setServiceId(state, action) {
      state.serviceId = action.payload;
    },
    setServicePlace(state, action) {
      state.servicePlace = action.payload;
    },
    SetSelectedPlace(state, action) {
      state.selectedPlace = action.payload;
    },
    setServiceDate(state, action) {
      state.serviceDate = action.payload;
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
        serviceId: "",
        servicePlace: "",
        selectedPlace:"",
        serviceDate: "",
        address: {},
        carModel: "",
        additionalNotes: "",
      };
    },
  },
});

export const {
  setServiceId,
  setServicePlace,
  SetSelectedPlace,
  setServiceDate,
  setAddress,
  setCarModel,
  setAdditionalNotes,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
