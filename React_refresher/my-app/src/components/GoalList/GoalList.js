import React from 'react';
import './GoalList.css';

const GoalList = (props) => {

    return(
        <ul className='goal-list'>
            {props.courseGoals.map((goal)=>{
                return <li key={goal.id}>{goal.text}</li>
            })}
        </ul>
    );
};

export default GoalList;