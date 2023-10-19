import {useFormik} from 'formik';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Link} from 'react-router-dom';
import sendPlayerName from '../request/sendPlayerName';
import {
	Center,
	Box,
	FormControl,
	Text,
	Input,
	Button,
	HStack,
} from '@chakra-ui/react';

// UserForm is our functional component
const UserForm = () => {
	const firstPlayer = sessionStorage.getItem('player');
	const initialValues = {username: ''};

	const onSubmit = async (values) => {
		const actualPlayer = {name: values.username, id: 0};
		try {
			const resp = await sendPlayerName({player: actualPlayer});
			const updatedPlayer = {name: resp.name, id: resp.id, isLoged: true};
			sessionStorage.setItem('player', JSON.stringify(updatedPlayer));
			alert('Succes: ' + resp.detail);
		} catch (error) {
			console.error('Error: ' + error);
			if (!error.ok) {
				alert(error.detail);
			}
			formik.resetForm();
		}
		formik.resetForm();
	};

	const validate = (values) => {
		const errors = {};
		if (!values.username) {
			errors.username = 'this field is required';
		}
		return errors;
	};
	const formik = useFormik({
		initialValues,
		onSubmit,
		validate,
	});
	// if the firstPlayer exists prin the isLoged field
	let flag = false;
	if (firstPlayer) {
		flag = JSON.parse(sessionStorage.getItem('player')).isLoged;
	} else {
		flag = false;
	}

	return (
		<Box
			height='100vh'
			// bgGradient='linear(to-r, gray.900,black,gray.900)'
		>
			<Box
				bgImage='url(http://localhost:5173/src/assets/LaCosaBackground.png)'
				position='relative'
				bgSize='center'
				bgPosition='center'
				bgAttachment='fixed'
				bgRepeat='no-repeat' // Set to 'no-repeat' to make it appear only once
				height='100%'
			>
				<Center height='100%' color='white'>
					<Box
						width='25%'
						textAlign='center'
						p={5}
						bg='transparent'
						rounded='lg'
					>
						<form onSubmit={formik.handleSubmit}>
							{!flag ? (
								<FormControl>
									<Text
										fontSize='3xl'
										fontWeight='bold'
										color='white'
										opacity='0.8'
									>
										Elige tu nickname
									</Text>
									<Input
										type='text'
										id='username'
										name='username'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.username}
									/>
									{formik.errors.username ? (
										<div className='error'>{formik.errors.username}</div>
									) : null}
									<Button
										colorScheme='transparent'
										variant='outline'
										type='submit'
										onClick={formik.handleSubmit}
									>
										Submit
									</Button>
								</FormControl>
							) : (
								<HStack spacing={4}>
									<Link to='/Games/'>
										<Button variant='outline' colorScheme='transparent'>
											Unirse a partida
										</Button>
									</Link>
									<Link to='/CreateGame'>
										<Button variant='outline' colorScheme='transparent'>
											Crear nueva partida
										</Button>
									</Link>
								</HStack>
							)}
						</form>
					</Box>
				</Center>
			</Box>
		</Box>
	);
};

export default UserForm; // Export UserForm as the default export
