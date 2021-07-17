import { useState, useEffect, useContext } from 'react';
import { UserAuthStateContext, UserAuthDispatchContext } from '../../App';

const LoginForm = (props) => {

    const userAuth = useContext(UserAuthStateContext);
    const userDispatch = useContext(UserAuthDispatchContext);
 
    // handle user form login request 
    const _handleUserLogin = async (event) => {
        event.preventDefault();
        try {
            const API_ENDPOINT = 'http://localhost:4000/users/login';
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                },
            });     
            const data = await response.json();
            if (response.status === 200) {
                localStorage.setItem('BookStopUser', data._id );
                // localStorage.removeItem('BookStopUser');
                // localStorage.getItem('BookStopUser');
                userDispatch({"type":"Login", "login": data} );
            }
        } catch (err) {
            console.log(err)
        }
    };

    // Login form on this component
    const initialFormValues = {
        username: '',
        password: '',
    };

    const [values, setValues] = useState(initialFormValues);

    // handle change function
    const _handleChange = (e) => {
        setValues((prevState) => {
            return {
                ...prevState,
                [e.target.id]: e.target.value,
            };
        });
    };

 
    return (
        <form onSubmit={_handleUserLogin}>
            <div>
                <label htmlFor='username'>Username: </label>
                    <input
                        type='text'
                        id='username'
                        value={values.username}
                        onChange={_handleChange}
                        required
                    />  
            </div>
            <div>
                <label htmlFor='password'>Password: </label>
                    <input
                        type='password'
                        id='password'
                        value={values.password}
                        onChange={_handleChange}
                        unique
                    />
            </div>
            <input type='submit' value='Login to BookStop' />
        </form>
    )
};

export default LoginForm;

