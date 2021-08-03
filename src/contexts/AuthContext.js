import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();


// It allows us to use the created context.
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loaded, setLoaded] = useState(false);

    // we use the auth module to sign up a user
    // it returns a promise, in case there is a failure we show a error message,
    // or redirect to the right page in case it was a success.
    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout(){
        return auth.signOut();
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    function UpdateEmail(email){
        return currentUser.updateEmail(email);
    }

    function UpdatePassword(password){
        return currentUser.updatePassword(password);
    }

    useEffect( () => {
        // This method notify you whenever the user get set.
        // It's important to note that this function should run only once, when the component mount.
        // It returns a method allows us to unsubscribe this onAuthStateChanged listener.
       const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoaded(true);
        })
        // When we unmount this component, we will unsubscribe the listener .
        return unsubscribe;
    }, [])


    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        UpdateEmail,
        UpdatePassword
    }

    // The provider will return a value, and this value contains all curent user information
    // to use anywhere in our application.
    // But we need to set it up so that "currentUser" actually contain is set to the current user.
    // we can achieve that using firebase.
    return (
        <AuthContext.Provider value={value}>
            { loaded && children }
        </AuthContext.Provider>
    )
}
