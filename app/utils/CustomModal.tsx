"use client";
import { Box, Modal } from "@mui/material";
import React, { Component, FC } from "react";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	route: string;
	Component: any;
	setRoute?: (route: string) => void;
	activeItem: number;
};

const CustomModal: FC<Props> = (props) => {
	const { open, setOpen, setRoute, Component: Component } = props;

	return (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-[450px] rounded-lg bg-white dark:bg-black text-black dark:text-white shadow outline-none '>
				<Component open={setOpen} setRoute={setRoute} />
			</Box>
		</Modal>
	);
};

export default CustomModal;
