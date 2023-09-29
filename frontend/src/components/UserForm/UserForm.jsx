// UserForm is our functional component
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {setPlayerName} from '../../appActions';

// UserForm is our functional component

const UserForm = () => {
	const name = useSelector((state) => state.player.name);

	const dispatch = useDispatch();
	const initialValues = {username: ''};
	const onSubmit = (values) => {
		// call the API with this data as a payload

		console.log('family friendly comment');
		console.log('family friendly comment');

		console.log(values.username);

		dispatch(setPlayerName(values.username));
		console.log(name);

		// reset the form
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
