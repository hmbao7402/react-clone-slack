import React, { useState } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { collection, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';

const ChatInput = ({ channelId, channelName }) => {
	const [input, setInput] = useState('');
	const [user] = useAuthState(auth);

	const sendMessage = (event) => {
		event.preventDefault(); // prevents refresh page

		if (!channelId) {
			return false;
		}

		// avoid sending empty messages
		if (input) {
			const messageRef = collection(
				doc(collection(db, 'rooms'), channelId),
				'messages'
			);
			addDoc(messageRef, {
				message: input,
				timestamp: serverTimestamp(),
				user: user?.displayName,
				userImage: user?.photoURL,
			});

			setInput('');
		}
	};

	return (
		<ChatInputContainer>
			<form>
				<input
					value={input}
					onChange={(event) => setInput(event.target.value)}
					type='text'
					placeholder={`Message #${channelName}`}
				/>
				<Button hidden type='submit' onClick={sendMessage}>
					SEND
				</Button>
			</form>
		</ChatInputContainer>
	);
};

export default ChatInput;

const ChatInputContainer = styled.div`
	border-radius: 20px;

	> form {
		position: relative;
		display: flex;
		justify-content: center;
	}

	> form > input {
		position: fixed;
		bottom: 30px;
		width: 60%;
		border: 1px solid gray;
		border-radius: 3px;
		padding: 20px;
		outline: none;
	}

	> form > button {
		display: none !important;
	}
`;
