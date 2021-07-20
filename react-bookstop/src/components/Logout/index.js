import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../App";
import { UserAuthStatusContext, UserAuthDispatchContext } from '../../App';

const Logout = (props) => {

    const userContext = useContext(UserContext);
    const userAuth = useContext(UserAuthStatusContext);
    const userDispatch = useContext(UserAuthDispatchContext);
 
    // handle user form login request 
    const _handleUserLogout = async () => {
        
        try {
            const API_ENDPOINT = 'https://bookstop-api.herokuapp.com/users/logout/user';
            const response = await fetch(API_ENDPOINT, {
                method: 'PUT',
                body: JSON.stringify({_id: userAuth._id}),
                headers: {
                    'Content-Type': 'application/json'
                },
            });     
            const data = await response.json();
            if (response.status === 200) {
                // localStorage.setItem('BookStopUser', data._id );
                localStorage.removeItem('BookStopUser');
                // localStorage.getItem('BookStopUser');
                
                userDispatch({"type":"Login", "login": data} );
                userContext.setUser(null);
            }
        } catch (err) {
            console.log(err)
        }
    };

    useEffect( () => {
        _handleUserLogout();
        // eslint-disable-next-line
    }, []);

    return (
        <>
        </>
    )
};

export default Logout;

