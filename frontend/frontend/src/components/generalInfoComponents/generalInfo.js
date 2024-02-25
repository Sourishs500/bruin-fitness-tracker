/*
Remaining Tasks
1) Write an actual recommendation function
2) Extract the possibleCategories from some source instead of hard-coding (optional)
*/

import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';

function CreateTextBox({SendValueUp, x, y})
{
    const [value, setValue] = useState('');
    const handleChange = (event) => 
    {
        setValue(event.target.value); 
        const n = event.target.value;
        SendValueUp({newNotes:{n}})
    };
    
    return <textarea type="text" value={value} onChange={handleChange} placeholder="" style={{"width":x, "height":y, marginRight:"20px", overflowY:"scroll"}}/>;
};

export default function GeneralInfo ({SendValueUp, SendDateUp, exInfo}) //One text box for general notes, one selection for which type of exercises to recommend, a button (generates recommendations), an actual recommendation
/*
    functions defined:
        getCategoryForRandomEx
    variables used:
        possibleCategories (what types of day categorizations are supported), chosenCat, recommendationGenerated
        
*/
{
    let possibleCategories = Object.keys(exInfo);
    const [chosenCat, updateCat] = useState(possibleCategories[0]);

    const [recommendationGenerated, setRec] = useState("");

    const getCategoryForRandomEx = (cat) => {
        const array = exInfo[cat]//Object.values(exInfo).flat();//["Chest Press", "Preacher Curls", "Wall-Sits", "Bench Press", "Lat Pull-Downs", "Calf Raises"];
        const randomElement = array[Math.floor(Math.random() * array.length)];
        setRec("Recommendation: "+randomElement);
    } //To un-hardcode later

    const generalNotes = useRef("");
    function updateNotes({newNotes})
    {
        generalNotes.current = newNotes["n"];
        const n = generalNotes.current;
        SendValueUp({newNotes:{n}});
    }

    const dateOfWorkout = useRef("");
    function updateDateOfWorkout({newNotes})
    {
        console.log("HERE", newNotes["n"]);
        dateOfWorkout.current = newNotes["n"];
        const n = dateOfWorkout.current;
        SendDateUp({newNotes:{n}});
    }

    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div>
                <b style={{marginRight:"20px"}}>
                    Date of Workout
                </b>
                <div style={{marginBottom:"15px"}}><CreateTextBox SendValueUp={updateDateOfWorkout} x = "130px" y = "20px" /></div>
            </div>
            <div>
                <b style={{textAlign:"center"}}>Workout Notes: General</b>
                <div style={{marginBottom:"15px"}}><CreateTextBox SendValueUp={updateNotes} x = "200px" y = "145px" /></div>
            </div>
            <div>
                <div style={{marginBottom:"-20px"}}>
                    <b>Exercise Recommendation System</b>
                </div>
                <br/>
                <span>
                    <select onClick={ (event)=>{updateCat(event.target.value);} }>
                        {possibleCategories.map( (category) =>   <option key={Math.random()} value={category}> {category} </option>)}
                    </select>         
                    
                    <Button variant="light" onClick={() => getCategoryForRandomEx(chosenCat)} style={{marginLeft:"10px", marginRight:"10px"}}>Generate Recommendation</Button>
                    <span> <b>{recommendationGenerated}</b> </span>
                </span>
            </div>
       </div>
    );
};