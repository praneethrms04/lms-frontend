"use client";
import React, { FC } from "react";
import Input from "./Input";

type FormControlProps = {
	control: string;
	[key: string] : any;
};

const FormControl: FC<FormControlProps> = (props) => {
	const { control, ...rest } = props;
	console.log(props);
	switch (control) {
		case "input":
			return <Input {...rest} />;
		default:
			return null;
	}
};

export default FormControl;
