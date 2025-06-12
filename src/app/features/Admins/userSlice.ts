import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  name: string;
  phone: string;
  image: string;
  id: string;
}

const initialState: AuthState = {
  email: "",
  name: "",
  phone: "",
  image: "",
  id: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<AuthState>) => {
      const { email, name, phone, image, id } = action.payload;
      return {
        ...state,
        email,
        name,
        phone,
        image,
        id,
      };
    },
    logoutAction: () => {
      return initialState;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;
export default authSlice.reducer;
