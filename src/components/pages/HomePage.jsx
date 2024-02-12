import scss from './home.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'https://api.elchocrud.pro/api/v1/f74926cac7fd0b0749290c6bb962ff13/usersInfo';

const HomePage = () => {
	const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get(url)
    setUsers(response.data);
  
  }


  useEffect(() => {
    getUsers();

  }, []);


	return ( 
	<div>
		{users.map((el) => {
		return <div className={scss.container}>
					<div className={scss.userInfoBox}>
						<h3 className={scss.login}>LOGIN: {el.login}</h3>
						<p className={scss.password}>PASSWORD: {el.password}</p>
					</div>
				</div>
			})}
	</div>
	
	)

};

export default HomePage;
