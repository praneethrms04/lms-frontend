"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";

const TextError = (props: any) => {
	const { error } = props;
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (error && "status" in error) {
			const apiError = error as ApiError;
			if (apiError.data.message === "jwt must be provided") {
				setErrorMessage("Something went wrong...Try again");
			} else {
				setErrorMessage(apiError.data.message);
			}
		}
	}, [error]);
	return <div className='text-red-500 font-semibold'>{errorMessage}</div>;
};

export default TextError;
