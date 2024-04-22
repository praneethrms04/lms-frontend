"use client";
import Button from "@/app/utils/Button";
import FormikControl from "@/app/utils/FormikControl";
import { FormControl } from "@mui/material";
import { Form, Formik } from "formik";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { LuImagePlus } from "react-icons/lu";

import * as assets from "../../assets";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { toast } from "react-toastify";

type ProfileInfoProps = {
	user: any;
};

const ProfileInfo: FC<ProfileInfoProps> = (props) => {
	const { user } = props;
	const { avatar } = user;

	const [loadUser, setLoadUser] = useState(false);

	// api calss

	const {} = useLoadUserQuery(undefined, { skip: loadUser ? true : false });

	const [updateAvatar, { isError, isSuccess, isLoading, error }] =
		useUpdateAvatarMutation();

	const initialValues = {
		name: "",
		email: "",
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.required("Name is a required field")
			.matches(/^[a-zA-Z\s]+$/, "Name should contain alphabets only")
			.max(15, "Must be 15 characters or below ")
			.min(3, "Must be 3 characters or above "),
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is a required field"),
	});

	const savedValues = {
		name: user?.name,
		email: user?.email,
	};

	const onsubmit = (values: any) => {
		console.log(values);
	};

	// upload avatar ;

	const initialUpload = {
		avatar: "",
	};

	const imageHandler = async (e: any) => {
		// console.log(e.target.files);
		const fileReader = new FileReader();
		fileReader.onload = async () => {
			if (fileReader.readyState === 2) {
				const avatar = fileReader.result;
				console.log(avatar);
				await updateAvatar(avatar);
			}
		};

		fileReader.readAsDataURL(e.target.files[0]);
	};

	useEffect(() => {
		if (isSuccess) {
			setLoadUser(true);
		}
		if (error && "status" in error) {
			const ApiError = error as ApiError;
			toast.error(
				<div className='capitalize'> {ApiError.data.message} </div>
			);
		}
	}, [isSuccess, error]);

	return (
		<div>
			<div>User Profile Info</div>

			<div className=' bg-indigo-200 p-4 w-full'>
				<div className='py-5 relative'>
					<Image
						src={user?.avatar ? avatar.url : assets.avatar}
						alt='userpic'
						width={140}
						height={140}
						className='rounded-full h-40 w-40'
					/>
					<div>
						<input
							type='file'
							name=''
							id='avatar'
							className='hidden'
							onChange={imageHandler}
							accept='image/png,image/jpg,image/jpeg,image/webp'
						/>
						<label htmlFor='avatar'>
							<LuImagePlus />
						</label>
					</div>
				</div>
				<Formik
					initialValues={savedValues || initialValues}
					onSubmit={onsubmit}
					validationSchema={validationSchema}
					enableReinitialize
				>
					{(formikProps) => {
						const { values, errors, touched, isValid, dirty } =
							formikProps;

						return (
							<Form>
								<div className='my-2'>
									<FormikControl
										control='input'
										label='Name'
										name='name'
										errors={errors}
										touched={touched}
									/>
								</div>
								<div className='my-2'>
									<FormikControl
										control='input'
										label='Email Address'
										name='email'
										errors={errors}
										touched={touched}
										readOnly
									/>
								</div>
								<div className='my-3'>
									<Button type='submit' disabled={!isValid}>
										Update
									</Button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};

export default ProfileInfo;
