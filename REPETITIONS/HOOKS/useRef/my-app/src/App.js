import React, {useRef} from 'react';
import './App.css';

const App = () => {

 const inputRef = useRef();
 const outputRef = useRef();

 const buttonHandler = () =>{
  outputRef.current.value = inputRef.current.value;
 }

  return (
    <div className="App">
      <p>
        <label>INPUT 
          <input ref={inputRef} type="text"/>
        </label>
      </p>

      <button onClick={buttonHandler}>PRZEKAŻ</button>

      <p>
      <label>OUTPUT
        <input ref={outputRef}type="text"/>
      </label>
      </p>
    </div>
  );
}

export default App;
