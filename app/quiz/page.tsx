'use client'
import react, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


const QuizPage = () => {
    const router = useRouter();

    useEffect(() => {
    var userID = localStorage.getItem('userID');
    if(userID != null) {
        router.push('/annotate')
    }
    }, []);

    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")

    const finishQuiz = async () => {
        if(fName != "" && lName != "" && age != "" && sex != ""){
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_Name: fName,
                    last_Name: lName,
                    age,
                    sex,
                }),
            }).then(async data => {
                let test = await data.json()
                localStorage.setItem('userID', test.user._id);
                if(data.status == 201){
                router.push('/annotate')
                }
            })
            
        } else {
            alert("Please fill up all fields")
        }
    }   

    return(
        <div id='quiz_main'>
            <div>
                <h1>Quick Survey</h1>
                <div id='quiz_div'><h3>First Name: </h3><input type="text" name='fName' placeholder='First Name' value={fName} onChange={(e) => setFName(e.target.value)}/></div>
                <div id='quiz_div'><h3>Last Name: </h3><input type="text" name='lName' placeholder='Last Name' value={lName} onChange={(e) => setLName(e.target.value)}/></div>
                <div id='quiz_div'><h3>Age: </h3><input type="number" name='age' placeholder='age' value={age} onChange={(e) => setAge(e.target.value)}/></div>
                <div id='quiz_div'><label>Gender:</label>
                    <select id="Sex" name="Sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                    <option hidden>Gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    </select></div>
                <button onClick={finishQuiz}>Finish</button>
            </div>
        </div>
    )
}

export default QuizPage