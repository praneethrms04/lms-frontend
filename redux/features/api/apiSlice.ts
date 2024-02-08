import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
	}),
	endpoints: (builder) => ({
		refreshToken: builder.query({
			query: (data) => ({
				url: "refresh",
				method: "GET",
				credentials: "include" as const,
			}),
		}),
		loadUser: builder.query({
			query: (data) => ({
				url: "me",
				method: "GET",
				credentials: "include" as const,
			}),
			async onQueryStarted(arg, { dispatch: dispatch, queryFulfilled }) {
				try {
					const result = await queryFulfilled;
					dispatch(
						userLoggedIn({
							token: result.data.accessToken,
							user: result.data.user,
						})
					);
				} catch (error) {
					console.log("load error", error);
				}
			},
		}),
	}),
});

export const { useLazyRefreshTokenQuery, useLoadUserQuery } = apiSlice;
