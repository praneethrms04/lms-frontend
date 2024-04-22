"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";

interface Props {}

const Home: FC<Props> = () => {
	const [open, setOpen] = useState(false);
	const [activeItem, setActiveItem] = useState(0);
	const [route, setRoute] = useState("Login");

	return (
		<div>
			<Heading
				title='LMS'
				description='Learning-Management-System'
				keywords='MERN'
			/>
			<Header
				open={open}
				setOpen={setOpen}
				activeItem={activeItem}
				setActiveItem={setActiveItem}
				route={route}
				setRoute={setRoute}
			/>
		</div>
	);
};

export default Home;
