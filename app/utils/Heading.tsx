"use client"
import React, { FC } from "react";

interface HeadingProps {
	title: string;
	description: string;
	keywords: string;
}

const Heading: FC<HeadingProps> = (props) => {
	const { title, description, keywords } = props;
	return (
		<>
			<title>{title}</title>
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1'
			/>
			<meta name='description' content={description} />
			<meta name='keyword' content={keywords} />
		</>
	);
};

export default Heading;
