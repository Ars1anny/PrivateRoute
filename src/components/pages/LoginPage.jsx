import scss from './login.module.scss'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const url = 'https://api.elchocrud.pro/api/v1/f74926cac7fd0b0749290c6bb962ff13/usersInfo';

const LoginPage = () => {
	const navigate = useNavigate();
	const [userLogin, setUserLogin] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const handleAuth = () => {
		const formUser = {
			login: userLogin,
			password: userPassword,
		};
		getUser(formUser);
	};

	const getUser = async (formUser) => {
		try {
			const response = await axios.get(url);
			const responseData = await response.data;

			const findUser = responseData.find(
				(item) =>
					item.login === formUser.login && item.password === formUser.password
			);

			if (findUser) {
				localStorage.setItem("isAuth", findUser._id);
				navigate("/");
			} else {
				alert("user not found");
			}
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="container">
			<input
				type="text"
				placeholder="login"
				value={userLogin}
				onChange={(e) => {
					setUserLogin(e.target.value);
				}}
			/>
			<input
				type="password"
				placeholder="password"
				value={userPassword}
				onChange={(e) => {
					setUserPassword(e.target.value);
				}}
			/>
			<button onClick={handleAuth}>login</button>
		</div>
	);
};

export default LoginPage;
