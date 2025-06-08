// src/store/settingsModalSlice.js
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface Isettings {
  isOpen: boolean;
  image: string;
}
const initialState: Isettings = {
  isOpen: false,
  image: "",
};

const settingsModalSlice = createSlice({
  name: "settingsModal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      if (action.payload) {
        state.image = action.payload;
      }
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = settingsModalSlice.actions;
export default settingsModalSlice.reducer;
