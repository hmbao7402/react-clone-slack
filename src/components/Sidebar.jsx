import React from 'react';
import styled from 'styled-components';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../firebase';
import {
	FiberManualRecord,
	Create,
	InsertComment,
	Inbox,
	Drafts,
	BookmarkBorder,
	FileCopy,
	PeopleAlt,
	Apps,
	ExpandLess,
	ExpandMore,
	Add,
} from '@mui/icons-material';
import SidebarOption from './SidebarOption';

const Sidebar = () => {
	const [user] = useAuthState(auth);
	const roomsCollection = collection(db, 'rooms');
	const [channels, loading, error] = useCollection(roomsCollection);

	return (
		<SidebarContainer>
			{/* sidebar header */}
			<SidebarHeader>
				<SidebarInfo>
					<h2>my name is {user?.displayName}</h2>
					<h3>
						<FiberManualRecord />
						{user?.displayName}
					</h3>
				</SidebarInfo>
				<Create />
			</SidebarHeader>

			{/* sidebar options */}
			<SidebarOption Icon={InsertComment} title='Threads' />
			<SidebarOption Icon={Inbox} title='Mentions & Reactions' />
			<SidebarOption Icon={Drafts} title='Saved items' />
			<SidebarOption Icon={BookmarkBorder} title='Channel browser' />
			<SidebarOption Icon={PeopleAlt} title='People & user groups' />
			<SidebarOption Icon={Apps} title='Apps' />
			<SidebarOption Icon={FileCopy} title='File browser' />
			<SidebarOption Icon={ExpandLess} title='Show less' />
			<hr />
			<SidebarOption Icon={ExpandMore} title='Channels' />
			<hr />
			<SidebarOption Icon={Add} title='Add Channel' addChannelOption />

			{/* display list channels from firestore */}
			{loading && (
				<LoadingMessage>
					<span>Loading...</span>
				</LoadingMessage>
			)}
			{error && (
				<ErrorMessage>
					<span>Error: {JSON.stringify(error)}</span>
				</ErrorMessage>
			)}
			{channels?.docs.map((doc) => {
				return (
					<SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
				);
			})}
		</SidebarContainer>
	);
};

export default Sidebar;

const SidebarContainer = styled.div`
	color: white;
	background-color: var(--slack-color);
	flex: 0.3;
	border-top: 1px solid #49274b;
	max-width: 260px;
	margin-top: 60px;
	overflow-y: auto;

	/* hide scrollbar */
	::-webkit-scrollbar {
		display: none;
	}

	> hr {
		margin-top: 10px;
		margin-bottom: 10px;
		border: 1px solid #49274b;
	}
`;

const SidebarHeader = styled.div`
	display: flex;
	border-bottom: 1px solid #49274b;
	padding: 13px;

	> .MuiSvgIcon-root {
		padding: 8px;
		color: #49274b;
		font-size: 18px;
		background-color: white;
		border-radius: 50%;
	}
`;

const SidebarInfo = styled.div`
	flex: 1;

	> h2 {
		font-size: 15px;
		font-weight: 900;
		margin-bottom: 5px;
	}

	> h3 {
		display: flex;
		font-size: 13px;
		font-weight: 400;
		align-items: center;
	}

	> h3 > .MuiSvgIcon-root {
		font-size: 14px;
		margin-top: 1px;
		margin-right: 2px;
		color: green;
	}
`;

const LoadingMessage = styled.h3`
	padding: 10px;
	font-weight: 400;
	text-transform: capitalize;
`;

const ErrorMessage = styled.h3`
	padding: 10px;
	font-weight: 400;
	text-transform: capitalize;
`;
