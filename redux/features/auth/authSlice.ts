import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "",
	user: "",
	email: "",
};
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userRegistration: (
			state,
			action: PayloadAction<{ token: string; email: string }>
		) => {
			state.token = action.payload.token;
			state.email = action.payload.email;
		},
		userLoggedIn: (
			state,
			action: PayloadAction<{ token: string; user: any }>
		) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
	},
});
export const { userRegistration, userLoggedIn } = authSlice.actions;

export default authSlice.reducer;
