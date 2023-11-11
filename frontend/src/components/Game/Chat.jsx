// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {Textarea, Card, Flex, Button, Box, FormControl} from '@chakra-ui/react';
import {useFormik} from 'formik';
import PropTypes from 'prop-types';

export const Chat = ({connection}) => {
	const [messages, setMessages] = useState([]);
	const initialValues = {message: ''};

	useEffect(() => {
		const messageHandler = (event) => {
			if (event.type === 'chat_message') {
				console.log('Recieved a message: ', event.content);
				setMessages([...messages, event.content]);
			}
		};
		if (connection) {
			connection.onmessage = function (event) {
				const message = JSON.parse(event.data);
				console.log('In message, recieved a messasge:', message);
				if (message.type === 'chat_message') {
					console.log('Recieved a message: ', message.content);
					messageHandler(message);
				}
			};
		}
	}, [connection, messages]);
	const onSubmit = async (values) => {
		if (connection) {
			const chatMessage = {
				type: 'chat_message',
				content: values.message,
			};
			connection.send(JSON.stringify(chatMessage));
		}
		formik.resetForm();
	};
	const handleEnterPress = async (event) => {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			await onSubmit(formik.values);
		}
	};
	const formik = useFormik({
		initialValues,
		onSubmit,
	});
	return (
		<Card>
			<Flex direction='column'>
				<Box h='600px' color='black' overflowY='scroll' bg='green.100'>
					{messages.map((msg, index) => (
						<div key={index}>{msg}</div>
					))}
				</Box>
				<form onSubmit={formik.handleSubmit}>
					<FormControl>
						<Textarea
							border='2px green solid'
							bg='green.100'
							color='black'
							name='message'
							placeholder='Type a message'
							h='110px'
							onKeyDown={handleEnterPress}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.message}
						></Textarea>
					</FormControl>
					<Flex
						bg='green.100'
						direction='row'
						justify='center'
						p='5px'
						h='90px'
					>
						<Button
							type='submit'
							size='lg'
							m='5px'
							bg='green.300'
							justifyContent='center'
							onClick={formik.handleSubmit}
						>
							Send
						</Button>
						<Button onClick={formik.resetForm} bg='green.300' size='lg' m='5px'>
							Cancel
						</Button>
					</Flex>
				</form>
			</Flex>
		</Card>
	);
};

Chat.propTypes = {
	connection: PropTypes.instanceOf(WebSocket),
};
export default Chat;
