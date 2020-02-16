import React, {useState} from 'react';
import './App.css'
import GoalList from './components/GoalList/GoalList';
import NewGoal from './components/NewGoal/NewGoal';

function App() {

  const [courseGoals, setCourseGoals] = useState([
    {id: 'cg1', text: 'Finish the course'},
    {id: 'cg2', text: 'Learn all bout the Course Main Topic'},
    {id: 'cg3', text: 'Help other students in the Course Q&amp;A'},
  ]);

  const addNewGoalHandler = (newGoal) =>{
    // setCourseGoals(courseGoals.concat(newGoal));
    setCourseGoals((prevCourseGoals)=>prevCourseGoals.concat(newGoal));
  };

  return (
    <div>
      <h1>Course goals</h1>
      <NewGoal onAddGoal={addNewGoalHandler} courseGoals={courseGoals}/>
      <GoalList courseGoals={courseGoals}/>
    </div>
  );
};

export default App;
