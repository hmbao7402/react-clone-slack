import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { doc, orderBy, query } from 'firebase/firestore';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import { StarBorderOutlined, InfoOutlined } from '@mui/icons-material';
import { selectRoomId } from '../features/appSlice';
import { ChatInput, Message } from './';
import { db } from '../firebase';
import { collection } from 'firebase/firestore';

const Chat = () => {
	const chatRef = useRef(null);
	const roomId = useSelector(selectRoomId);
	const roomsCollection = collection(db, 'rooms');
	const [roomDetails] = useDocument(roomId && doc(roomsCollection, roomId));
	const [roomMessages, loading] = useCollection(
		roomId &&
			query(
				collection(doc(roomsCollection, roomId), 'messages'),
				orderBy('timestamp', 'asc')
			)
	);

	useEffect(() => {
		if (roomId) {
			chatRef?.current?.scrollIntoView({
				behavior: 'smooth',
			});
		}
	}, [roomId, loading]);

	return (
		<ChatContainer>
			{roomDetails && roomMessages && (
				<>
					{/* chat header */}
					<ChatHeader>
						{/* header left */}
						<ChatHeaderLeft>
							<div className='room-info'>
								<h4>
									<strong>
										#
										{roomDetails?.data().name
											? roomDetails?.data().name
											: 'room-name'}
									</strong>
								</h4>
								<StarBorderOutlined />
							</div>
							<div className='room-info'>
								<h4>
									<strong>#{roomId ? roomId : 'room-id'}</strong>
								</h4>
							</div>
						</ChatHeaderLeft>

						{/* header right */}
						<ChatHeaderRight>
							<p>
								<InfoOutlined /> Details
							</p>
						</ChatHeaderRight>
					</ChatHeader>

					{/* list out the messages */}
					<ChatMessages>
						{roomMessages?.docs.map((doc) => {
							const { message, timestamp, user, userImage } = doc.data();

							return (
								<Message
									key={doc.id}
									message={message}
									timestamp={timestamp}
									user={user}
									userImage={userImage}
								/>
							);
						})}
						<ChatBottom ref={chatRef} />
					</ChatMessages>

					{/* Chat input */}
					<ChatInput
						chatRef={chatRef}
						channelName={roomDetails?.data().name}
						channelId={roomId}
					/>
				</>
			)}
		</ChatContainer>
	);
};

export default Chat;

const ChatContainer = styled.div`
	flex: 0.7;
	flex-grow: 1;
	overflow-y: scroll;
	margin-top: 60px; /** 60px = (icon 40px) + (padding top & bottom of header 10*2 = 20px) */

	::-webkit-scrollbar {
		display: none;
	}
`;

const ChatHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 20px;
	border-bottom: 1px solid lightgray;
`;

const ChatHeaderLeft = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	> .room-info {
		display: flex;

		> h4 {
			display: flex;
			text-transform: lowercase;
			margin-right: 10px;
		}

		> h4 > .MuiSvgIcon-root {
			margin-left: 20px;
			font-size: 18px;
		}
	}
`;

const ChatHeaderRight = styled.div`
	> p {
		display: flex;
		align-items: center;
		font-size: 14px;
	}

	> p > .MuiSvgIcon-root {
		margin-right: 5px !important;
		font-size: 16px;
	}
`;

const ChatBottom = styled.div`
	padding-bottom: 200px;
`;

const ChatMessages = styled.div``;
