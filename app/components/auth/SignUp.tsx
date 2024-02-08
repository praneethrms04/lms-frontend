"use client";
import { styles } from "@/app/styles/style";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import FormikControl from "@/app/utils/FormikControl";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import Button from "@/app/utils/Button";
import TextError from "@/app/utils/TextError";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface RegisterData {
	name: string;
	email: string;
	password: string;
}

type SignUpProps = {
	setRoute: (route: string) => void;
};

const SignUp: FC<SignUpProps> = ({ setRoute }) => {
	const [showPassword, setShowPassword] = useState(false);

	const initialValues = {
		name: "",
		email: "",
		password: "",
	};

	const [register, { isError, isSuccess, error, isLoading, data }] =
		useRegisterMutation();

	const validationSchema = Yup.object({
		name: Yup.string()
			.required("Name is a required field")
			.matches(/^[a-zA-Z\s]+$/, "Name should contain alphabets only")
			.max(15, "Must be 15 characters or below ")
			.min(3, "Must be 3 characters or above "),
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is a required field"),
		password: Yup.string()
			.required("Password is a required field")
			.matches(
				/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
				"Password must contain at least 8 characters, one uppercase, one number and one special case character"
			),
	});

	const onSubmit = async (values: RegisterData) => {
		if (isLoading) return;
		await register(values);
	};

	useEffect(() => {
		if (isSuccess && data) {
			toast.success(data.message);
			setRoute("Verify-otp");
		}
		if (error && "status" in error) {
			const apiError = error as ApiError;
			toast.error(
				<div className='capitalize'> {apiError.data.message}</div>
			);
		}
	}, [isSuccess, error]);

	return (
		<section className='login-sectio w-full'>
			<h1 className={styles.title}>Welcome LMS</h1>

			<div className='px-4 py-4'>
				<Formik
					initialValues={initialValues}
					onSubmit={onSubmit}
					validationSchema={validationSchema}
				>
					{(formikProps) => {
						const {
							values,
							handleChange,
							handleBlur,
							errors,
							touched,
							isValid,
							dirty,
							...rest
						} = formikProps;

						return (
							<Form>
								<div className='my-3'>
									<FormikControl
										label='Name'
										control='input'
										type='text'
										name='name'
										errors={errors}
										touched={touched}
										id='name'
									/>
								</div>
								<div className='my-3'>
									<FormikControl
										label='Email'
										control='input'
										type='email'
										name='email'
										errors={errors}
										touched={touched}
										id='email'
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
										errors={errors}
										touched={touched}
										id='password'
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
										disabled={
											!formikProps.isValid ||
											!formikProps.dirty
										}
										isLoading={isLoading}
									>
										SignUp
									</Button>
								</div>
							</Form>
						);
					}}
				</Formik>
				<div className='flex flex-col gap-3'>
					<div className='relative flex items-center justify-center'>
						<span className='absolute inset-x-0 h-px bg-gray-300'></span>
						<span className='relative text-lb  px-4 text-sm '>
							Sign Up with social
						</span>
					</div>

					<button className='facebook-btn'>
						<svg
							className='h-5 w-5 shrink-0'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z'
								fill='white'
							/>
						</svg>
						Continue with Facebook
					</button>

					<button className='google-btn'>
						<svg
							className='h-5 w-5 shrink-0'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z'
								fill='#4285F4'
							/>
							<path
								d='M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z'
								fill='#34A853'
							/>
							<path
								d='M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z'
								fill='#FBBC05'
							/>
							<path
								d='M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z'
								fill='#EA4335'
							/>
						</svg>
						Continue with Google
					</button>
				</div>

				<div className='flex items-center justify-center mt-5 bg-gray-100 dark:bg-gray-900 p-4'>
					<p className='text-center text-sm text-gray-500 dark:text-gray-400'>
						Ypu have an account?
						<button
							onClick={() => {
								setRoute("Login");
							}}
							className='text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700'
						>
							Login
						</button>
					</p>
				</div>
			</div>
		</section>
	);
};

export default SignUp;
