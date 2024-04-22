"use client";
import React, {
	ChangeEvent,
	FC,
	Fragment,
	useState,
	useRef,
	useEffect,
} from "react";
import Link from "next/link";
import { setgroups } from "process";
import { useSelector } from "react-redux";
import { useActivateUserMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import TextError from "@/app/utils/TextError";
import Button from "@/app/utils/Button";

let currentOTPIndex: number = 0;

type OtpVerificationProps = {
	setRoute: (route: string) => void;
};

const OtpVerification: FC<OtpVerificationProps> = ({ setRoute }) => {
	const { token, email } = useSelector((state: any) => state.auth);

	const [errorMessage, setErrorMessage] = useState("");

	const inputRef = useRef<HTMLInputElement>(null);

	const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
	const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
	console.log(activeOTPIndex);
	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
		console.log(e);
		const target = e.target;
		const value = target.value;
		const newOtp: string[] = [...otp];
		newOtp[currentOTPIndex] = value.substring(value.length - 1);

		if (!value) setActiveOTPIndex(currentOTPIndex - 1);
		else setActiveOTPIndex(currentOTPIndex + 1);
		setOtp(newOtp);
		setErrorMessage("");
	};

	const handleOnKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		console.log(e.key);
		currentOTPIndex = index;
		if (e.key === "ArrowRight") {
			setActiveOTPIndex(currentOTPIndex + 1);
		}
		if (e.key === "ArrowLeft") {
			setActiveOTPIndex(currentOTPIndex - 1);
		}
		if (e.key === "Backspace") setActiveOTPIndex(currentOTPIndex - 1);
	};

	const [activateUser, { isSuccess, isLoading, error }] =
		useActivateUserMutation();

	useEffect(() => {
		inputRef.current?.focus();
		if (isSuccess) {
			console.log("success");
			setRoute("Login");
		}
		if (error && "status" in error) {
			console.log(error);
		}
	}, [isSuccess, error, activeOTPIndex]);

	const verifyHandler = async () => {
		const activation_token = token;
		const activation_code = otp.join("");
		const data = {
			activation_token,
			activation_code,
		};
		if (isLoading) return;
		await activateUser(data);

		// setRoute("Login");
	};
	return (
		<div className='px-2 py-6'>
			<div className='my-2'>
				<h1 className='text-center text-lb'> Verify your Account</h1>
			</div>
			<div className='px-6 my-2 text-center'>
				<h3>
					OTP sent to :
					<span className='text-indigo-600 font-bold mx-1'>
						{email}
					</span>
					.
				</h3>
			</div>
			<div className='flex justify-center items-center'>
				<div className='flex gap-3 '>
					{otp.map((_, index) => {
						return (
							<Fragment key={index}>
								<input
									type='number'
									ref={
										index === activeOTPIndex
											? inputRef
											: null
									}
									onChange={handleChange}
									value={otp[index]}
									onKeyDown={(e) => handleOnKeyDown(e, index)}
									className={`w-12 h-12 border-2 rounded bg-transparent outline-none text-center font-semibold text-xl ${
										errorMessage
											? "border-red-400"
											: "border-indigo-300 "
									} focus:border-indigo-600 focus:text-gray-600 transition spin-button-none `}
								/>
							</Fragment>
						);
					})}
				</div>
			</div>
			{error && "status" in error && (
				<div className='text-center py-2'>
					<TextError error={error}></TextError>
				</div>
			)}
			<div className='flex items-center justify-center py-2'>
				<div>
					<Button
						type='submit'
						disabled={otp.some((value) => value === "")}
						isLoading={isLoading}
						onClick={verifyHandler}
					>
						Verify
					</Button>
				</div>
			</div>
			<div className='flex items-center justify-center py-2'>
				<h2>
					Go back to SignIn ?
					<button onClick={() => setRoute("Login")}> Sign In</button>
				</h2>
			</div>
		</div>
	);
};

export default OtpVerification;
