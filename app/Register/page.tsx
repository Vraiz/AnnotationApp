'use client'
import react, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link";



const Register = () => {
    const router = useRouter();


    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const finishQuiz = async () => {
        if(fName != "" && lName != "" && age != "" && sex != "" && email != "" && password != "" && confirmPassword != "" && password == confirmPassword){
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
        <div id='quiz_main'>
                <h1>Register</h1>
                <div id='quiz_div'><h3>First Name: </h3><input type="text" name='fName' placeholder='First Name' value={fName} onChange={(e) => setFName(e.target.value)}/></div>
                <div id='quiz_div'><h3>Last Name: </h3><input type="text" name='lName' placeholder='Last Name' value={lName} onChange={(e) => setLName(e.target.value)}/></div>
                <div id='quiz_div'><h3>Age: </h3><input type="number" name='age' placeholder='age' value={age} onChange={(e) => setAge(e.target.value)}/></div>
                <div id='gender_div'>
                    <label>Gender:</label>
                    <select id="Sex" name="Sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                    <option hidden>Gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    </select>
                </div>
                <div id='quiz_div'><h3>Email: </h3><input type="email" name='email' placeholder='example.com' value={email} onChange={(e) => setEmail(e.target.value)}/></div>
                <div id='quiz_div'><h3>Password: </h3><input type="password" name='password' placeholder='' value={password} onChange={(e) => setPassword(e.target.value)}/></div>
                <div id='quiz_div'><h3>Confirm Password: </h3><input type="password" name='confirmPassword' placeholder='' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/></div>
                <button id='quiz_button' onClick={finishQuiz}>Register</button>
                <Link id='quiz_link' href="/Login">Already have an account? Log in here!</Link>
        </div>
    )
}

export default Register