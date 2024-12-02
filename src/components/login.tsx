import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../DB/api.ts";
import {AccountCircleTwoTone} from '@mui/icons-material';
import { login } from "../store/createSlice.ts";
import reducer from "../store/createSlice.ts";


export function Login() {

	const date = new Date(
		new Date().getFullYear() + 1,
		new Date().getMonth(),
		new Date().getDate(),
		new Date().getHours() + 1,
		new Date().getMinutes()
	);
	const isLogged = useSelector((state: any) => state.authLogin.isLogged);
	const dispatch = useDispatch();
	const handleClick = async (eve: any) => {
		eve.preventDefault();
		const id = eve.target.username.value;
		const password = eve.target.password.value;
		dispatch(login({id, password}))
		if(isLogged){	
			window.location.assign('../');
			
		}
		console.log(isLogged)
		
	}

	const forgotPass = () => window.location.href = ('forgot_password')
	const navigateRegistration = () => window.location.href = ('registration')


	return (
		<div className={`relative`}>
			<div className={`absolute`} style={{ minWidth: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', top: '30%' }}>
			
			<h2 className={`pt-1 pb-3`}>TaskTrack Login <AccountCircleTwoTone style={{width: '60px', height: '60px'}} /></h2>
			{/* {error && <div style={{ color: 'red' }}>{error}</div>} */}
			<form onSubmit={handleClick}>
				<div style={{ marginBottom: '15px' }}>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						style={{ width: '100%', padding: '8px', marginTop: '5px' }}
						className={`border-gray-200	border outline outline-1 rounded`}
						placeholder="Username"
					/>
				</div>
				<div style={{ marginBottom: '15px' }}>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						style={{ width: '100%', padding: '8px', marginTop: '5px' }}
						className={`border-gray-200	border outline outline-1 rounded`}
						placeholder="Password"
					/>
				</div>
				<button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px' }}>
					Login
				</button>
			</form>
			<div className={`p-2 relative right-0 text-right`}>
				<p className={`right-0 hover:underline text-blue-800`} onClick={forgotPass}>forgot password?</p>
				<p className={`right-0 hover:underline text-blue-800`} onClick={navigateRegistration}>create account?</p>
			</div>
			<div>
				<p id="p"></p>
			</div>
		</div>
		</div>
	);
}



