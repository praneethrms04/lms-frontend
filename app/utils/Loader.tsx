"use client";
import React from "react";

const Loader = () => {
	return (
		<div className='flex justify-center space-x-3'>
			<span className='w-5 h-5 rounded-full border border-t-4  border-indigo-800  animate-spin'></span>
			<span className='font-semibold text-base text-indigo-800'>
				Loading...
			</span>
		</div>
	);
};

export default Loader;
