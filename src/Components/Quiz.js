import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../Assets/data'

const Quiz = () => {

    const[index,setIndex]=useState(0);
    const[question,setQuestion]=useState(data[index])
    const[lock,setLock]=useState(false);
    const[score,setScore]=useState(0);
    const[result,setResult]=useState(false)

    const Option1=useRef(null);
    const Option2=useRef(null);
    const Option3=useRef(null);
    const Option4=useRef(null);

    const optionArray=[Option1,Option2,Option3,Option4];

    const checkAns=(e,ans)=>{
        if(lock===false){     // once answer is selected can't choose another answer
        if(question.ans===ans){
            e.target.classList.add("correct");
            setLock(true);
            setScore(prev=>prev+1)
        }
        else{
            e.target.classList.add("wrong");
            setLock(true)
            optionArray[question.ans-1].current.classList.add("correct");   // highlight the correct answer
        }
    }
    }

    const next=()=>{
        if(lock===true){    // can't move to the next question if no option is selected
          if(index===data.length-1){    // check if is this the last question?
            setResult(true);
            return 0;
          }
          const newIndex=index+1   // next question so next index needed
            setIndex(newIndex)     
            setQuestion(data[newIndex]);
            setLock(false);
            optionArray.map((options)=>{
              options.current.classList.remove("correct")
              options.current.classList.remove("wrong")
              return null
            })
        }
    }

    const reset=()=>{
      setIndex(0);
      setQuestion(data[0]);
      setLock(false);
      setResult(false);
      setScore(0);
    }

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr></hr>
      {result?
      <>
      <h2>You scored {score} out of {data.length} marks</h2>
      <button onClick={reset}>Reset</button>
      </> : 
      <>
      <h2>{index+1}. {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>
      <div className='ans'>{index+1} out of {data.length} questions</div>
      </>}
    </div>
  )
}

export default Quiz
