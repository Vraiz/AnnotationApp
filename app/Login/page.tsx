'use client'
import react, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link";



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
            try{
                const response = await fetch("/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                }).then(async data => {
                        let test = await data.json()
                            if (test.message == "Successfully logged in"){
                                localStorage.setItem('userID', test.user._id);
                                if(data.status == 201){
                                router.push('/annotate')
                            } else {
                                alert("Invalid email/password")
                            }
                        }
                })
            }catch (e){
                alert("Something went wrong with the server")
            }
            
        } else {
            alert("Please fill up all fields")
        }
    }   

    return(
        <div id='quiz_main'>
                <h1>Log in</h1>
                <div id='quiz_div'><h3>Email: </h3><input type="email" name='email' placeholder='example.com' value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                <div id='quiz_div'><h3>Password: </h3><input type="password" name='password' placeholder='' value={password} onChange={(e) => setPassword(e.target.value)}/></div>
                <button id='quiz_button' onClick={finishQuiz}>Register</button>
                <Link id='quiz_link' href="/Register">Don't have an account yet? Register here!</Link>
        </div>
    )
}

export default Login