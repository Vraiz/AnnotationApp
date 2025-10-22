'use client'
import react, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import "./login.css";

const Login = () => {
    const router = useRouter();

    useEffect(() => {
    var userID = localStorage.getItem('userID');
    if(userID != null) {
        router.push('/annotate')
    }
    }, []);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const finishQuiz = async () => {
        if(email != "" && password != ""){
            console.log("check");
            try{
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                
                const data = await response.json();

                if (response.status === 201 && data.message === "Successfully logged in"){
                    localStorage.setItem("userID", data.user._id);
                    router.push("/annotate");
                } else {
                    alert("Invalid email/password");
                }
            }catch (e){
                alert("Something went wrong with the server")
            }
            
        } else {
            alert("Please fill up all fields")
        }
    }   

    return(
        <div>
            <div className = 'login-bg'></div>
            <form className='quiz_main' onSubmit={(e) => {e.preventDefault(); finishQuiz();}}>
                <h1>Log in</h1>

                <div className='input-group'>
                    <label htmlFor='email'>Email: </label>
                    <input type="email" name='email' placeholder='example.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password:</label>
                    <input type="password" name='password' placeholder='' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" id="log-button">Login</button><br/>
                <Link id='quiz_link' href="/Register">Don't have an account yet? Register here!</Link>
            </form>
        </div>
    )
}

export default Login