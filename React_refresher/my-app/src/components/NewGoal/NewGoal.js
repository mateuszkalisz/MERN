import React, {useState} from 'react';
import './NewGoal.css';

const NewGoal = (props) =>{

    const [textInput, setTextInput] = useState('');

    const addGoalHandler = (e) =>{
        e.preventDefault();

        const newId = `cg${props.courseGoals.length+1}`;

        const newGoal = {
            id: newId,
            text: textInput
        }

        setTextInput('');

        props.onAddGoal(newGoal);

    };

    const textInputHandler = (e) => {
        setTextInput(e.target.value);
    }

    return(
        <form className='new-goal' onSubmit={addGoalHandler}>
            <input type="text" value={textInput} onChange={textInputHandler}/>
            <button type="submit">Add Goal</button>
        </form>
    )
}

export default NewGoal;