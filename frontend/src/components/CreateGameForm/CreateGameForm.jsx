// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {useFormik} from 'formik';
import {createGame} from '../request/createGame';
import {useNavigate} from 'react-router-dom';
import {Flex, Button, Text, FormControl, Input, Box} from '@chakra-ui/react';

const CreateGameForm = () => {
	const userId = JSON.parse(sessionStorage.getItem('player')).id;
	const [alertMessage, setAlertMessage] = useState(''); // State for alert message
	const initialValues = {GameName: ''};
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		// en este sprint min_players: 4, max_players: 12, esta harcodeado pero en proximos lo agregamos
		const Game = {
			id_player: userId,
			name: values.GameName,
			// password: 'elpepe',
			min_players: 4,
			max_players: 12,
		};
		console.log('Game to be created: ', Game);
		try {
			const resp = await createGame({game: Game});
			setAlertMessage('Success: ' + resp.detail); // Set success message
			const game = {
				id: resp.gameId,
			};
			console.log('The id of the game is: ', game);
			sessionStorage.setItem('gameId', JSON.stringify(game));
			navigate(`/Games/${game.id}`);
		} catch (error) {
			console.log('Error al crear la partida');
			console.log(error.detail);
			if (!error.ok) {
				// alert('Detail: ' + error.detail);
				setAlertMessage(error.detail); // Set error message
			}
		}
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
			<Box
				display='flex'
				flexDirection='column'
				alignItems='center'
				justifyContent='center'
			>
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
						<Text
							fontSize='2xl'
							fontWeight='bold'
							textAlign='center'
							color='white'
							mb='4'
						>
							Elige el nombre de la partida
						</Text>
						<FormControl>
							<Input
								type='text'
								id='GameName'
								name='GameName'
								color='white'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.GameName}
								mb='4'
							/>
							{formik.errors.GameName ? (
								<div className='error'> {formik.errors.GameName}</div>
							) : null}
						</FormControl>
					</div>
				</form>
				<Button
					variant='outline'
					fontSize={'lg'}
					colorScheme='transparent'
					justifyContent='center'
					color={'white'}
					boxShadow={
						'0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
					}
					_hover={{
						bg: 'green.600',
					}}
					_focus={{
						bg: 'green.600',
					}}
					type='submit'
					onClick={formik.handleSubmit}
				>
					Submit
				</Button>
			</Box>
		</Flex>
	);
};
export default CreateGameForm;
