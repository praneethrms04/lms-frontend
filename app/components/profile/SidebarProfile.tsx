"use client";
import Image from "next/image";
import React, { FC } from "react";
import * as assets from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { setActivateRoute } from "@/redux/navigations/profileNavSlice";

type Props = {
	user: any;
};

const SidebarProfile: FC<Props> = (props) => {
	const { user } = props;

	const { activateRoute } = useSelector(
		(state: any) => state.profileNavigation
	);

	const dispatch = useDispatch();

	const navItems = [
		{
			route: 1,
			text: " My Profile",
		},
		{
			route: 2,
			text: "Change Password",
		},
		{
			route: 3,
			text: "Enrolled Courses",
		},
	];

	const handleChangeRoute = (route: number) => {
		dispatch(setActivateRoute(route));
	};

	return (
		<div>
			<div className='bg-indigo-300 w-[200px] flex flex-col space-y-6 px-6 py-6 text-lb '>
				{navItems.map((navItem) => {
					return (
						<div key={navItem.route}>
							<button
								onClick={() => handleChangeRoute(navItem.route)}
							>
								{navItem.text}
							</button>
						</div>
					);
				})}
				{/* <div className='flex '>
					<Image
						src={assets.avatar}
						alt=''
						className='w-12 h-12 rounded-full'
					/>
					<p> My Profile </p>
				</div> */}

				<div>
					<button> LogOut</button>
				</div>
			</div>
		</div>
	);
};

export default SidebarProfile;
