"use client";
import { ErrorMessage, Field } from "formik";
import React, { FC, InputHTMLAttributes } from "react";

type InputFieldProps = {
	name: string;
	label: string;
	[key: string]: any;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField: FC<InputFieldProps> = (props) => {
	const { name, label, errors, touched, ...rest } = props;

	return (
		<>
			<label
				htmlFor={name}
				className={`relative block rounded-md border ${
					errors && touched && errors[name] && touched[name]
						? "border-red-400"
						: "border-indigo-400"
				}  shadow-sm`}
			>
				<Field
					name={name}
					id={name}
					{...rest}
					className='w-11/12 peer py-2 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 mx-2'
				/>
				<span className='pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 dark:bg-blck p-0.5 text-xs text-lb transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs'>
					{label}
				</span>
			</label>
			<ErrorMessage
				name={name}
				render={(msg) => {
					return <div className='text-red-400'>{msg}</div>;
				}}
			/>
		</>
	);
};

export default InputField;
