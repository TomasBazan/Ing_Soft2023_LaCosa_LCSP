import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {setPlayerId, setPlayerName} from '../../appActions';
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import sendPlayerName from '../request/sendPlayerName';
// import SendPlayerName from '../request/sendPlayerName.mock';

// UserForm is our functional component
const UserForm = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const dispatch = useDispatch();
	const initialValues = {username: ''};

	const onSubmit = async (values) => {
		const actualPlayer = {name: values.username, id: 0};
		try {
			const resp = await sendPlayerName({player: actualPlayer});
			const updatedPlayer = {name: resp.name, id: resp.id};
			dispatch(setPlayerId(updatedPlayer.id));
			dispatch(setPlayerName(updatedPlayer.name));
			setIsLoggedIn(true);
			alert('Succes: ' + resp.detail);
		} catch (error) {
			// The status code is missing in the response
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
