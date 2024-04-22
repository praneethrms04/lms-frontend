import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
	activateRoute: 1,
};

const profileNavSlice = createSlice({
	name: "profileNavigation",
	initialState,
	reducers: {
		setActivateRoute: (state, action: PayloadAction<number>) => {
			state.activateRoute = action.payload;
		},
	},
});

export const { setActivateRoute } = profileNavSlice.actions;

export default profileNavSlice.reducer;
