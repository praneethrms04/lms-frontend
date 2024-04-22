"use client";
import { styles } from "@/app/styles/style";
import Button from "@/app/utils/Button";
import FormikControl from "@/app/utils/FormikControl";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FaEyeSlash, FaEye } from "react-icons/fa";

type loginProps = {
	setRoute: (route: string) => void;
};

interface LoginUserData {
	email: string;
	password: string;
}

const Login: FC<loginProps> = ({ setRoute }) => {
	
	const [showPassword, setShowPassword] = useState(false);

	const dat = useSelector((state: any) => state?.auth?.token);
	console.log(dat);

	const initialValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.required("Email is a required field")
			.email("Invalid email format"),
		password: Yup.string()
			.required("Password is a required field")
			.min(8, "Password must be at least 8 characters"),
	});

	const [loginUser, { error, isLoading, isSuccess, isError, data }] =
		useUserLoginMutation();
	const onSubmit = async (values: LoginUserData) => {
		if (isLoading) return;
		await loginUser(values);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Login successful");
		}
		if (error && "status" in error) {
			const ApiError = error as ApiError;
			toast.error(
				<div className='capitalize'> {ApiError.data.message} </div>
			);
		}
	}, [isSuccess, error]);

	return (
		<section className='login-sectio w-full'>
			<div className='px-4 py-4'>
				<h1 className={styles.title}>Welcome LMS</h1>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{(formikProps) => {
						const { errors, touched } = formikProps;
						return (
							<Form>
								<div className='my-3'>
									<FormikControl
										label='Email'
										control='input'
										type='email'
										name='email'
										id='email'
										errors={errors}
										touched={touched}
									/>
								</div>
								<div className='my-3 relative'>
									<FormikControl
										control='input'
										label='Password'
										type={
											showPassword ? "input" : "password"
										}
										name='password'
										id='password'
										errors={errors}
										touched={touched}
									/>
									<div className='absolute top-3 right-3 cursor-pointer '>
										{showPassword ? (
											<FaEyeSlash
												onClick={() => {
													setShowPassword(
														(prev) => !prev
													);
												}}
											/>
										) : (
											<FaEye
												onClick={() => {
													setShowPassword(
														(prev) => !prev
													);
												}}
											/>
										)}
									</div>
								</div>
								<div className='my-3'>
									<Button
										type='submit'
										isLoading={isLoading}
										disabled={
											!formikProps.isValid ||
											!formikProps.dirty
										}
									>
										Login
									</Button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</section>
	);
};

export default Login;
