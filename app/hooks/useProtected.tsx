import React from "react";
import { userAuth } from "./userAuth";
import { redirect } from "next/navigation";

interface ProtectedProps {
	children: React.ReactNode;
}

const useProtected = ({ children }: ProtectedProps) => {
	const isAuthenticated = userAuth();
	return isAuthenticated ? children : redirect("/");
};
export default useProtected;
