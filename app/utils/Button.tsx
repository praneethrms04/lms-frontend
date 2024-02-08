"use client";
import React, { FC } from "react";
import Loader from "./Loader";

type ButtonProps = {
	isLoading: boolean;
	children: React.ReactNode;
	[key: string]: any;
};

const Button: FC<ButtonProps> = (props) => {
	const { children, isLoading, ...rest } = props;
	return (
		<button
			{...rest}
			className={`w-full inline-block rounded border  px-6 py-2 text-sm font-medium focus:ring ${
				isLoading
					? " cursor-not-allowed disabled:opacity-90  bg-blue-300 border-blue-300 text-indigo-800 text-lg font-bold "
					: "border-indigo-600 bg-indigo-600  disabled:cursor-not-allowed   hover:bg-transparent text-white hover:text-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-600 disabled:hover:text-white"
			}`}
		>
			{isLoading ? <Loader /> : `${children}`}
		</button>
	);
};

export default Button;
