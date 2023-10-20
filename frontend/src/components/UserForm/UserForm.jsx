import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {setPlayerId, setPlayerName, setPlayerLogedIn} from '../../appActions';
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
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
// import SendPlayerName from '../request/sendPlayerName.mock';

// UserForm is our functional component
const UserForm = () => {
	const dispatch = useDispatch();
	const firstPlayer = useSelector((state) => state.player);
	const initialValues = {username: ''};
	const [alertMessage, setAlertMessage] = useState(''); // State for alert message

	const onSubmit = async (values) => {
		// console.log('onSubmit called'); // Add this line

		const actualPlayer = {name: values.username, id: 0};
		try {
			const resp = await sendPlayerName({player: actualPlayer});
			const updatedPlayer = {name: resp.name, id: resp.id};
			dispatch(setPlayerId(updatedPlayer.id));
			dispatch(setPlayerName(updatedPlayer.name));
			// console.log('Setting success message:', 'Success: ' + resp.detail);
			setAlertMessage('Success: ' + resp.detail); // Set success message
			dispatch(setPlayerLogedIn(true));
		} catch (error) {
			// The status code is missing in the response
			if (!error.ok) {
				setAlertMessage(error.detail); // Set error message
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
	return (
		<Center height='100vh'>
			<Box width='25%' textAlign='center' p={5}>
				<div>
					{alertMessage && (
						<div
							className={`alert ${
								alertMessage.includes('Success') ? 'success' : 'error'
							}`}
						>
							{alertMessage}
						</div>
					)}
					<form onSubmit={formik.handleSubmit}>
						{!firstPlayer.loged ? (
							<FormControl>
								<Text fontSize='3xl' fontWeight='bold'>
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
									colorScheme='gray'
									type='submit'
									onClick={formik.handleSubmit}
								>
									Submit
								</Button>
							</FormControl>
						) : (
							<HStack spacing={4}>
								<Link to='Games/'>
									<Button>Unirse a partida</Button>
								</Link>
								<Link to='/CreateGame'>
									<Button>Crear nueva partida</Button>
								</Link>
							</HStack>
						)}
					</form>
				</div>
			</Box>
		</Center>
	);
};
export default UserForm; // Export UserForm as the default export
