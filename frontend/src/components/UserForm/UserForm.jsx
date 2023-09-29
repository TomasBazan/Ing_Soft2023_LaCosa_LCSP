// UserForm is our functional component
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {setPlayerId, setPlayerName} from '../../appActions';
import SendPlayerName from '../../sendPlayerName';

// UserForm is our functional component

const UserForm = () => {
	const dispatch = useDispatch();
	const initialValues = {username: ''};
	const onSubmit = async (values) => {
		try {
			// Assuming SendPlayerName returns a promise
			const actualPlayer = {name: values.username, id: 0};
			console.log(actualPlayer);
			const updatedPlayer = await SendPlayerName({player: actualPlayer});

			console.log('family friendly comment');
			console.log('family friendly comment');
			console.log(values.username);

			console.log(updatedPlayer); // Assuming updatedPlayer has the response from the API

			// Dispatch actions to update the Redux store
			dispatch(setPlayerName(updatedPlayer.name));
			dispatch(setPlayerId(updatedPlayer.id));
		} catch (error) {
			// Handle any errors from the API call
			console.error('Error:', error);
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
				<div className='form/control'>
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
				</div>
			</form>
			<button type='submit' onClick={formik.handleSubmit}>
				Submit
			</button>
		</div>
	);
};
export default UserForm; // Export UserForm as the default export
