import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authSlice,
	},
	// devTools: false,
	middleware: (gDM) => gDM().concat(apiSlice.middleware),
});

export default store;
export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// call the refresh token function on every page load

const initializeApp = async () => {
	await store.dispatch(
		apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
	);
	await store.dispatch(
		apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
	);
};

initializeApp();
