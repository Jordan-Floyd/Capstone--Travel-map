import "./login.css";
import { Room, Cancel } from "@material-ui/icons";
import { useState, useRef } from 'react';
import axios from "axios";



export default function Login({setShowLogin, myStorage, setCurrentUsername}) {
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        try{
            const res = await axios.post("/users/login", user);
            myStorage.setItem("user", res.data.username);
            setCurrentUsername(res.data.username);
            setShowLogin(false);

        }catch(err){
            setError(true);
        }
    };

    return (
        <div className = "loginContainer">
            <div className= "logoLogin">
                <Room className="logoIcon" />
                <span>Places You've been</span>
            </div>
            <form onSubmit = {handleSubmit}>
                <input autoFocus placeholder = "username" ref = {usernameRef} />
                <input type="password" placeholder = "password" ref = {passwordRef} />
                <button className = "loginBtn" type ="submit">Login</button>
                {error && <span className = "failure">Something went wrong!</span>}
            </form>
            <Cancel className = "loginCancel" onClick = {() =>setShowLogin(false)}/>
        </div>
    );
}