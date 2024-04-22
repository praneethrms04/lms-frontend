import { useState } from "react";

interface ApiError {
	status: number;
	data: {
		message: string;
	};
}

