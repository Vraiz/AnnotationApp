'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import "./register.css"

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
        if (fName && lName && age && sex && email && password && confirmPassword && password === confirmPassword && isFilipino && isFluent) {
            try {
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
                });

                const data = await response.json();

                if (data.message === "user with email already exists") {
                    alert("User with this email already exists.");
                } else {
                    localStorage.setItem('userID', data.user._id);
                    if (response.status === 201) {
                        router.push('/annotate');
                    }
                }
            } catch (e) {
                alert("Something went wrong with the server.");
            }
        } else {
            alert("Please fill up all fields correctly.");
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h1>Account Registration</h1>

                <div className="name-row">
                    <div className="input-group">
                        <label>First Name</label>
                        <input type="text" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="First Name" />
                    </div>

                    <div className="input-group">
                        <label>Last Name</label>
                        <input type="text" value={lName} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" />
                    </div>
                </div>

                <div className="name-row">
                    <div className="input-group">
                        <label>Gender</label>
                        <select value={sex} onChange={(e) => setSex(e.target.value)}>
                            <option hidden>Gender</option>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Age</label>
                        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
                    </div>
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" />
                </div>

                <div className="input-group">
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" />
                </div>

                <div className="checkbox-group">
                    <label>
                        <input type="checkbox" checked={isFilipino} onChange={(e) => setIsFilipino(e.target.checked)} />
                        Are you a Filipino Citizen?
                    </label>

                    <label>
                        <input type="checkbox" checked={isFluent} onChange={(e) => setIsFluent(e.target.checked)} />
                        Can you read/speak both Filipino and English fluently?
                    </label>
                </div>

                <button className="register-button" onClick={finishQuiz}>Register</button>

                <Link className="login-link" href="/Login">
                    Already have an account? Log in here!
                </Link>
            </div>
        </div>
    );
};

export default Register;
