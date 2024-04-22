"use client";
import React, { useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { Profile } from "../components/profile";

const page = () => {
	const [open, setOpen] = useState(false);
	const [activeItem, setActiveItem] = useState(0);
	const [route, setRoute] = useState("Login");

	const { user } = useSelector((state: any) => state.auth);

	return (
		<div className='text-lb'>
			<Protected>
				<Heading
					title={`${user?.name} profile`}
					description='Learning-Management-System'
					keywords='MERN'
				/>
				<Header
					open={open}
					setOpen={setOpen}
					activeItem={activeItem}
					route={route}
					setRoute={setRoute}
				/>
				<div>
					<Profile user={user} />
				</div>
			</Protected>
		</div>
	);
};

export default page;





