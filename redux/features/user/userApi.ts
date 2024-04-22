import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
	endpoints: (builder) => {
		return {
			updateAvatar: builder.mutation({
				query: ({ avatar }) => ({
					url: "update-user-avatar",
					method: "PUT",
					body: { avatar },
					credentials: "include" as const,
				}),
				// async onQueryStarted(arg, { ...patch }) {
				// 	const { queryFulfilled, dispatch } = patch;
				// 	const result = await queryFulfilled;
				// },
			}),
		};
	},
});

export const { useUpdateAvatarMutation } = userApi;
