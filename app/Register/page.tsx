'use client'
import react, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link";
import "./register.css";



const Register = () => {
    const router = useRouter();


    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isFilipino, setIsFilipino] = useState(false)
    const [isFluent, setIsFluent] = useState(false)

    const finishQuiz = async () => {
        if(fName && lName && age && sex && email && password && confirmPassword && password == confirmPassword && isFilipino && isFluent){
            try{
                const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_Name: fName,
                    last_Name: lName,
                    age: age,
                    sex: sex,
                    email: email,
                    password: password
                }),
                }).then(async data => {
                    let test = await data.json()
                    if(test.message == "user with email already exists"){
                        alert("user with email already exists")
                    } else {
                        localStorage.setItem('userID', test.user._id);
                        if(data.status == 201){
                        router.push('/annotate')
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
        <div className = "register-bg">
            <div id='register_main'>
                <h1>Account Registration</h1>
                <div className='input-row'>
                    <div className = 'input-group'>
                        <h3>First Name: </h3>
                        <input type="text" name='fName' placeholder='First Name' value={fName} onChange={(e) => setFName(e.target.value)}/>    
                    </div>
                    <div className='input-group'>
                        <h3>Last Name: </h3>
                        <input type="text" name='lName' placeholder='Last Name' value={lName} onChange={(e) => setLName(e.target.value)}/>   
                    </div>
                </div>
                <div className="input-row">
                <div className='input-group'>
                    <h3>Gender:</h3>
                        <select id="Sex" name="Sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                        <option hidden>Gender</option>
                        <option value="m">Male</option>
                        <option value="f">Female</option>
                        </select>
                    </div>
                    <div className='input-group'>
                        <h3>Age: </h3>
                        <input type="number" name='age' placeholder='age' value={age} onChange={(e) => setAge(e.target.value)}/>
                    </div>
                </div>
                <div className='input-group'>
                    <h3>Email: </h3>
                    <input type="email" name='email' placeholder='example.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='input-group'>
                    <h3>Password: </h3>
                    <input type="password" name='password' placeholder='' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='input-group'>
                    <h3>Confirm Password: </h3>
                    <input type="password" name='confirmPassword' placeholder='' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                <div className="checkbox-group">
                    <label>
                        <input type="checkbox" checked={isFilipino} onChange={(e) => setIsFilipino(e.target.checked)}/>{" "} Are you a Filipino citizen?
                    </label>
                    <label>
                        <input type="checkbox" checked={isFluent} onChange={(e) => setIsFluent(e.target.checked)}/> Can you read/speak both Filipino and English fluently?
                    </label>
                </div>
                <button className='register-button' onClick={finishQuiz}>Register</button>
                <Link className='login-link' href="/Login">Already have an account? Log in here!</Link>
            </div>
        </div>
    )
}

export default Register