import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import Spinner from 'react-spinkit';
import { Header, Sidebar, Chat, Login } from './components';
import './App.css';
import { auth } from './firebase';

const App = () => {
	const [user, loading] = useAuthState(auth);

	if (loading) {
		return (
			<AppLoading>
				<AppLoadingContents>
					<img src='/logo-slack.jpg' alt='' />
					<Spinner name='ball-spin-fade-loader' color='purple' fadeIn='none' />
				</AppLoadingContents>
			</AppLoading>
		);
	}

	return (
		<div className='app'>
			{!user ? (
				<Login />
			) : (
				<>
					<Header />
					<AppBody>
						<Sidebar />
						<Routes>
							<Route path='/' element={<Chat />} />
						</Routes>
					</AppBody>
				</>
			)}
		</div>
	);
};

export default App;

const AppBody = styled.div`
	display: flex;
	height: 100vh;
`;

const AppLoading = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	width: 100%;
`;

const AppLoadingContents = styled.div`
	text-align: center;
	padding-bottom: 100px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	> img {
		height: 100px;
		padding: 20px;
		margin-bottom: 40px;
	}
`;
