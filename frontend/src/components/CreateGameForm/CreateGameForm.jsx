// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {useFormik} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import createGame from '../request/createGame';
import {useNavigate} from 'react-router-dom';
import {setPlayerIdGame} from '../../appActions';
// import gameSlice from "../../services/gameSlice";
import {Flex, Button, Text, FormControl, Input} from '@chakra-ui/react';
const CreateGameForm = () => {
	const userId = useSelector((state) => state.player.id);
	const [alertMessage, setAlertMessage] = useState(''); // State for alert message
	const initialValues = {GameName: ''};
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const onSubmit = async (values) => {
		// en este sprint min_players: 4, max_players: 12, esta harcodeado pero en proximos lo agregamos
		//console.log('onSubmit called'); // Add this line
		const Game = {
			id_player: userId,
			name: values.GameName,
			// password: 'elpepe',
			min_players: 4,
			max_players: 12,
		};
		//console.log('Game to be created: ', Game);
		try {
			const resp = await createGame({game: Game});
			//console.log('The response of the call is: ', resp);
			// alert('Partida creada correctamente. Detail: ' + resp.detail);
			setAlertMessage('Success: ' + resp.detail); // Set success message
			dispatch(setPlayerIdGame(resp.gameId));
			navigate(`/Games/${resp.gameId}`);
			//console.log(	"it will display if navigate doesn't work, is mocked correctly",);
		} catch (error) {
			//console.log('Error al crear la partida');
			//console.log(error);
			if (!error.ok) {
				// alert('Detail: ' + error.detail);
				setAlertMessage('Error ' + error.detail); // Set error message
			}
		}
		//console.log('After the try-catch statement');
	};

	const validate = (values) => {
		const errors = {};
		if (!values.GameName) {
			errors.GameName = 'this field is required';
		}
		return errors;
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validate,
	});

	return (
		<Flex h='100vh' justifyContent='center' alignItems='center'>
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
					<div className='form/control'>
						<Text fontSize='2xl' fontWeight='bold' textAlign='center'>
							Elige el nombre de la partida
						</Text>
						<FormControl>
							<Input
								type='text'
								id='GameName'
								name='GameName'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.GameName}
							/>
							{formik.errors.GameName ? (
								<div className='error'> {formik.errors.GameName}</div>
							) : null}
						</FormControl>
					</div>
				</form>
				<Button
					px={4}
					fontSize={'lg'}
					rounded={'full'}
					bg={'blue.400'}
					color={'white'}
					boxShadow={
						'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
					}
					_hover={{
						bg: 'blue.500',
					}}
					_focus={{
						bg: 'blue.500',
					}}
					type='submit'
					onClick={formik.handleSubmit}
				>
					Submit
				</Button>
			</div>
		</Flex>
	);
};
export default CreateGameForm; // Export CreateGameForm as the default export
