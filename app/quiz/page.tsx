'use client'
import react, { useState } from 'react'
import { useRouter } from 'next/navigation'


const QuizPage = () => {

    const router = useRouter();
    const finishQuiz = () => {
        console.log(fName, lName, age, sex)
        if(fName != "" && lName != "" && age != "" && sex != ""){
            /*Put post req here
            parseInt(age)
            */
           
           router.push('/annotate')
        } else {
            alert("Please fill up all fields")
        }
    }   

    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [age, setAge] = useState("")
    const [sex, setSex] = useState("")

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