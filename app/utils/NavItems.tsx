"use client";
import Link from "next/link";
import React, { FC } from "react";

export const navitems = [
	{
		name: "Home",
		url: "/",
	},
	{
		name: "Courses",
		url: "/courses",
	},
	{
		name: "About",
		url: "/about",
	},
	{
		name: "Policy",
		url: "/policy",
	},
	{
		name: "FAQ",
		url: "/faq",
	},
];

type Props = {
	activeItem: number;
	isMobile: boolean;
};

const NavItems: FC<Props> = (props) => {
	const { activeItem, isMobile } = props;
	return (
		<>
			<div className='max-sm:hidden md:block lg:block  '>
				{navitems &&
					navitems.map((nav, index) => {
						return (
							<Link href={`${nav.url}`} key={index} passHref>
								<span
									className={`${
										activeItem === index
											? "text-indigo-400 font-semibold text-xl dark:text-orange-500"
											: "text-black dark:text-white "
									} px-6 font-Poppins font-semibold text-base`}
								>
									{nav.name}
								</span>
							</Link>
						);
					})}
			</div>
			<div>
				{isMobile && (
					<div className='flex flex-col space-y-4'>
						{navitems &&
							navitems.map((nav, index) => {
								return (
									<Link
										href={`${nav.url}`}
										key={index}
										passHref
										className='mt-20'
									>
										<span
											className={`${
												activeItem === index
													? "text-indigo-400 font-semibold text-xl dark:text-orange-500"
													: " "
											} font-Poppins font-semibold text-base`}
										>
											{nav.name}
										</span>
									</Link>
								);
							})}
					</div>
				)}
			</div>
		</>
	);
};

export default NavItems;
