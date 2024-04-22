import React from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loading from "../components/loader/Loading";

const CustomLoader = ({ children }: { children: React.ReactNode }) => {
	const { isLoading } = useLoadUserQuery({});
	return (
		<div>
			{isLoading ? (
				<div>
					<Loading />
				</div>
			) : (
				<div> {children} </div>
			)}
		</div>
	);
};

export default CustomLoader;
