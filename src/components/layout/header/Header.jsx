import scss from './header.module.scss';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const url = "https://api.elchocrud.pro/api/v1/37994b1bca53b437baa12c99795f6786/user_auth";

const Header = () => {
	const navigate = useNavigate();
	const [userProfile, setUserProfile] = useState({});
	const links = [
		{
			name: "Home",
			href: "/",
		},
		{
			name: "Login",
			href: "/login",
		},
		{
			name: "Registration",
			href: "/registration",
		},
	];

	const getUserId = localStorage.getItem("isAuth");

	const getUserProfile = async () => {
		try {
			const response = await axios.get(url);
			const responseData = await response.data;

			if (getUserId) {
				const findUser = responseData.find((item) => item._id === +getUserId);
				setUserProfile(findUser);
			} else {
				console.log("user is not auth");
			}
		} catch (e) {
			console.error(e);
		}
	};

	const removeUserSession = () => {
		localStorage.removeItem("isAuth");
		setUserProfile({});
		navigate("/login");
	};

	useEffect(() => {
		getUserProfile();
	}, []);

	return (
		<header className={scss.header} >
				<h1 className={scss.title}>AUTHENTICATION</h1>
			<div className={scss.links}>
				{links.map((item, index) => (
					<p className={scss.link}>
					<Link key={index} to={item.href}>
					{item.name}
					</Link>
					</p>
				))}
			</div>
				<button className={scss.exit} onClick={removeUserSession}>Exit</button>
		</header>
	);
};

export default Header;
