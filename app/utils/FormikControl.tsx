"use client";
import React, { FC } from "react";
import InputField from "./InputField";

type InputFieldProps = React.ComponentProps<typeof InputField>;

type Props = {
	control: "input";
} & InputFieldProps;

const FormikControl: FC<Props> = ({ control, ...rest }) => {
	switch (control) {
		case "input":
			return <InputField {...rest} />;
		default:
			return null;
	}
};

export default FormikControl;
