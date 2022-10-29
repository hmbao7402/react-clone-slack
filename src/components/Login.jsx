import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { auth, provider } from '../firebase';

const Login = () => {
	const signIn = (event) => {
		event.preventDefault();

		signInWithPopup(auth, provider).catch((error) => alert(error.message));
	};

	return (
		<LoginContainer>
			<LoginInnerContainer>
				<img src='/logo-slack.jpg' alt='logo slack' />
				<h1>Welcome to Humiba's house</h1>
				<p>Hello, world!</p>

				<Button type='submit' onClick={signIn}>
					Sign in with Google
				</Button>
			</LoginInnerContainer>
		</LoginContainer>
	);
};

export default Login;

const LoginContainer = styled.div`
	background-color: #f8f8f8;
	height: 100vh;
	display: grid;
	place-items: center;
`;

const LoginInnerContainer = styled.div`
	padding: 100px;
	text-align: center;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

	> img {
		object-fit: contain;
		height: 100px;
		margin-bottom: 40px;
	}

	> h1 {
		text-transform: capitalize;
	}

	> button {
		margin-top: 50px;
		text-transform: inherit !important;
		background-color: #0a8d48 !important;
		color: white;

		:hover {
			opacity: 0.8;
		}
	}
`;
