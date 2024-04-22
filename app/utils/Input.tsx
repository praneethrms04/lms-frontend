"use client";

import React, { FC } from "react";
import TextError from "./TextError";
import { error } from "console";

type InputProps = {
	label?: string;
	name?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	placeholder?: string;
	[key: string]: any;
};

const Input: FC<InputProps> = (props) => {
	const { label, name, value, onChange, onBlur, placeholder, ...rest } =
		props;

	const { errors, touched } = rest;
	console.log(errors.name);




	return (
		<div >
			<label
				htmlFor={name}
				className={`relative block rounded-md border ${
					errors.email ? "border-red-500" : "border-indigo-400"
				} shadow-sm`}
			>
				{label}
			</label>
			<input
				type='text'
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				{...rest}
				className='peer py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 mx-2'
			/>
			{touched && errors.email ? <div>{errors.email}</div> : null}
		</div>
	);
};

export default Input;
