
import {createContext, useContext, useEffect, useState} from 'react'
import { auth, db } from '../firebase' // firebase.js
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth' // npm installed firebase
import { setDoc, doc } from 'firebase/firestore'

const AuthContext = createContext()

export function AuthContextProvider({children}){
    const [user, setUser] = useState(null)

    function signUp(email, password){
        createUserWithEmailAndPassword(auth, email, password)
        setDoc(doc(db, 'users', email), {
            savedShows: []
        })
    }

    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('inside onAuthStateChanged')
        });
        console.log('inside useEffect')
        return () => {
            unSubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}


export function UserAuth() {
    return useContext(AuthContext)
}