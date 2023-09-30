// UserForm is our functional component
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {setPlayerId, setPlayerName} from '../../appActions';
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import SendPlayerName from '../request/sendPlayerName';
// import SendPlayerName from '../request/sendPlayerName.mock';

// UserForm is our functional component

const UserForm = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const dispatch = useDispatch();
	const initialValues = {username: ''};
	const user = useSelector((state) => state.player);
	useEffect(() => {
		console.log('The user updated:', user);
	}, [user]);
	const onSubmit = async (values) => {
		try {
			// Assuming SendPlayerName returns a promise
			const actualPlayer = {name: values.username, id: 0};
			console.log(actualPlayer);
			const resp = await SendPlayerName({player: actualPlayer});
			console.log(resp);
			const updatedPlayer = {name: resp.json.data.name, id: resp.json.data.id};

			console.log('Updated Player is: ', {updatedPlayer});
			// const updatedPlayer = actualPlayer;
			console.log('family friendly comment');
			console.log(values.username);

			// Dispatch actions to update the Redux store
			dispatch(setPlayerId(updatedPlayer.id));
			dispatch(setPlayerName(updatedPlayer.name));

			console.log('the updated player is');
			console.log(updatedPlayer); // Assuming updatedPlayer has the response from the API

			// Set isLoggedIn to true when the user is logged in
			setIsLoggedIn(true);
			alert(resp.json.detail);
		} catch (error) {
			// Handle any errors from the API call
			console.error('Error:', error);
			// show an alert to the user and reset the form

			if (!error.json.ok) {
				alert('Error: invalid username please select a diferent one');
			}
			formik.resetForm();
		}
		// Reset the form
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

	console.log('Form values', formik.values);

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				{!isLoggedIn ? (
					<div className='form/control'>
						<h1>Choose a nickname </h1>
						<label htmlFor='username'>User Name</label>
						<input
							type='text'
							id='username'
							name='username'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.username}
						/>
						{formik.errors.username ? (
							<div className='error'> {formik.errors.username}</div>
						) : null}
						{/* <h2> {user.id}</h2> */}
						<button type='submit' onClick={formik.handleSubmit}>
							Submit
						</button>
					</div>
				) : (
					<div>
						{/* Show additional buttons for logged-in users */}
						{/* <h2> {user.id} </h2> */}

						<Link to='/'>
							<button>Unirse a partida</button>
						</Link>
						<Link to='/CreateGame'>
							<button>Crear nueva partida</button>
						</Link>
					</div>
				)}
			</form>
		</div>
	);
};
export default UserForm; // Export UserForm as the default export
