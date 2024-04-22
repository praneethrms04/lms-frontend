import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration } from "./authSlice";

type RegistrationResponse = {
	message: string;
	activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => {
		return {
			//endpoints here

			// user register

			register: builder.mutation({
				query: (data) => ({
					url: "register",
					method: "POST",
					body: data,
					credentials: "include" as const,
				}),
				async onQueryStarted(arg, { ...patch }) {
					try {
						const { queryFulfilled, dispatch } = patch;
						const result = await queryFulfilled;
						dispatch(
							userRegistration({
								token: result.data.activationToken,
								email: result.data.email,
							})
						);
					} catch (error) {
						console.log("register error", error);
					}
				},
			}),

			// user login
			socialAuth: builder.mutation({
				query: ({ email, name, avatar }) => ({
					url: "login",
					method: "POST",
					body: {
						email,
						name,
						avatar,
					},
					credentials: "include" as const,
				}),
				async onQueryStarted(arg, { ...patch }) {
					try {
						const { queryFulfilled, dispatch } = patch;
						const result = await queryFulfilled;
						dispatch(
							userLoggedIn({
								token: result.data.accessToken,
								user: result.data.user,
							})
						);
					} catch (error) {
						console.log("error", error);
					}
				},
			}),

			// user login
			userLogin: builder.mutation({
				query: (data) => ({
					url: "social-auth",
					method: "POST",
					body: data,
					credentials: "include" as const,
				}),
				async onQueryStarted(arg, { ...patch }) {
					try {
						const { queryFulfilled, dispatch } = patch;
						const result = await queryFulfilled;
						dispatch(
							userLoggedIn({
								token: result.data.accessToken,
								user: result.data.user,
							})
						);
					} catch (error) {
						console.log("error", error);
					}
				},
			}),
			// activate user
			activateUser: builder.mutation({
				query: (data) => ({
					url: "activation-user",
					method: "POST",
					body: data,
					credentials: "include" as const,
				}),
			}),
		};
	},
});

export const {
	useRegisterMutation,
	useUserLoginMutation,
	useSocialAuthMutation,
	useActivateUserMutation,
} = authApi;
