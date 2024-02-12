import { useEffect, useState, useRef } from 'react';

function InstantiateNewExercise()
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(event.target.value);};
    const TextBox = () => (<textarea type="text" value={value} onChange={handleChange} placeholder="" style={{"width":"200px", "height":"25px", marginRight:"20px", overflowY:"scroll"}}/>); 

    const [numExercises, setExercises] = useState(1);

    const incrementSets = () => {setExercises(numExercises+1)}; 
    const decrementSets = () => 
    {
        if (numExercises>1)
            {setExercises(numExercises-1) };
    };
    const removeExercise = () => {};
    const allExercises = ["Chest Press", "Preacher Curls", "Wall-Sits", "Bench Press", "Lat Pull-Downs", "Calf Raises"]
    let setsForEx = () => [...Array(numExercises).keys()].map(n => <input type="text" style = {{"width":"100px", height:"10px"}}/>);

    return (
        <div style={{display:"flex"}}>
            <TextBox/>
            <select style={{marginRight:"10px"}}>{allExercises.map(category => <option value="Type of Exercise">{category}</option>)}</select> 
            <div>{setsForEx()}</div>
            <button onClick={incrementSets} style={{marginLeft:"10px", marginRight:"10px"}}>Add Set</button>
            <button onClick={decrementSets} style={{marginLeft:"10px", marginRight:"10px"}}>Remove Set</button>
            <button onClick={removeExercise} style={{marginLeft:"10px", marginRight:"10px"}}>Remove Exercise</button>
        </div>
    );
}

export default function UserDataEntries ()
{
    //const AddWorkoutButton = () => (<button className="square">Add Workout</button>);
    return (
        <div>
            <div style={{marginBottom:"15px"}}> 
                <InstantiateNewExercise/>
            </div>
            <div><button style={{marginBottom:"15px"}}>Add Exercise</button></div>
            <div><button style={{marginBottom:"15px"}}>Submit Workout</button></div>
        </div>
    );
}
