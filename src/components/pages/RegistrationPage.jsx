import scss from './registration.module.scss'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const url = 'https://api.elchocrud.pro/api/v1/f74926cac7fd0b0749290c6bb962ff13/usersInfo';

const RegistrationPage = () => {
	const navigate = useNavigate();
	const [userLogin, setUserLogin] = useState("");
	const [userPassword, setUserPassword] = useState("");

	const handleAuth = () => {
		const newUser = {
			login: userLogin,
			password: userPassword,
		};
		postUser(newUser);
	};

	const postUser = async (newUser) => {
		try {
			const response = await axios.post(url, newUser);
			console.log(response.data);
			navigate("/login");
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className={scss.container}>
			<h2 className={scss.title}>Registration</h2>
			<input className={scss.input}
				type="text"
				placeholder="login"
				value={userLogin}
				onChange={(e) => {
					setUserLogin(e.target.value);
				}}
			/>
			<input className={scss.input}
				type="password"
				placeholder="password"
				value={userPassword}
				onChange={(e) => {
					setUserPassword(e.target.value);
				}}
			/>
			<button className={scss.button} onClick={handleAuth}>Registration</button>
		</div>
	);
};

export default RegistrationPage;
