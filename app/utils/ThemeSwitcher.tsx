"use client";

import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

type Props = {};
const ThemeSwitcher: FC<Props> = (props) => {
	const [mounted, setmounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setmounted(true);
	}, []);
	if (!mounted) {
		return null;
	}

	return (
		<div className='flex items-center justify-center mx-4'>
			{theme === "light" ? (
				<BiMoon
					className='cursor-pointer'
					fill='black'
					size={25}
					onClick={() => setTheme("dark")}
				/>
			) : (
				<BiSun
					className='cursor-pointer'
					fill='white'
					size={25}
					onClick={() => setTheme("light")}
				/>
			)}
		</div>
	);
};

export default ThemeSwitcher;
