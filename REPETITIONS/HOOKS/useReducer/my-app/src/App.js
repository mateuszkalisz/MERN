import React, { useReducer, useState} from "react";
import "./App.css";

const counterReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        counter: state.counter + 1
      };
    case "SUBSTRACT": {
      return {
        counter: state.counter - 1
      };
    }

    case "RESET": {
      return {
        counter: 0
      };
    }
    case "OTHER":
        return {
          counter: state.counter + action.value,
        };
    default:
      return {
        counter: state
      };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(counterReducer, { counter: 0 });

  const [otherValue, setOtherValue] = useState(0);

  const inputHandler = (e) =>{
    setOtherValue(parseInt(e.target.value));
  }

  const buttonHandler = () =>{
    dispatch({ type: "OTHER", value: otherValue });
    setOtherValue(0);
  }

  return (
    <div className="App">
      <p>Licznik: {state.counter}</p>
      <button onClick={() => dispatch({ type: "ADD" })}>Dodaj</button>
      <button onClick={() => dispatch({ type: "SUBSTRACT" })}>Odejmij</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>

      <div>
        <label htmlFor="value">
          DODAJ WARTOŚĆ:
          <input type="text" id="value" onChange={inputHandler} value={otherValue}/>
        </label>
        <div>
          <button onClick={buttonHandler}>
            WYKONAJ
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
