"use client";
import React, { FC, useState } from "react";
import { ChangePassword, ProfileInfo, SidebarProfile } from ".";
import { useSelector } from "react-redux";

type ProfilePros = {
	user: any;
};

const Profile: FC<ProfilePros> = ({ user }) => {
	const { activateRoute } = useSelector(
		(state: any) => state.profileNavigation
	);

	let activateComponent;

	switch (activateRoute) {
		case 1: {
			activateComponent = <ProfileInfo user={user} />;
			break;
		}
		case 2: {
			activateComponent = <ChangePassword />;
			break;
		}
		default: {
			activateComponent = <ProfileInfo user={user} />;
			break;
		}
	}

	return (
		<div className='container p-20'>
			<div className='flex gap-x-10'>
				<div>
					<SidebarProfile user={user} />
				</div>
				<div>{activateComponent}</div>
			</div>
		</div>
	);
};

export default Profile;
