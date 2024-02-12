import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {
	const navigate = useNavigate();
	const { pathname } = useLocation();
	console.log(pathname);

	const isAuth = localStorage.getItem("isAuth");
	const isAuthBoolean = !!isAuth;

	useEffect(() => {
		if (isAuthBoolean && pathname === "/login") {
			navigate("/");
		} else if (isAuthBoolean && pathname === "/registration") {
			navigate("/");
		} else if (!isAuthBoolean && pathname === "/") {
			navigate("/login");
		}
	}, [pathname]);

	return children;
};

export default ProtectRoute;
