/*
Remaining Tasks
1) Write an actual recommendation function
2) Extract the possibleCategories from some source instead of hard-coding (optional)
*/

import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function CreateTextBox({SendValueUp, defaultText, x, y, ph})
{
    const [value, setValue] = useState(defaultText);
    const handleChange = (event) => 
    {
        setValue(event.target.value); 
        const n = event.target.value;
        SendValueUp({newNotes:{n}})
    };
    
    return <textarea type="text" value={value} onChange={handleChange} placeholder={ph} style={{"width":x, "height":y, marginRight:"20px", resize: "none"}}>
                
           </textarea>;
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
        var arr = []
        while(arr.length < 3)
        {
            var r = Math.floor(Math.random() * array.length);
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        var sets = []
        while(sets.length < 3)
        {
            var r = Math.floor(Math.random() * 4 + 2);
            if(sets.indexOf(r) === -1) sets.push(r);
        }
        
        var reps = []
        while(reps.length < 3)
        {
            var r = Math.floor(Math.random() * 6 + 6);
            if(reps.indexOf(r) === -1) reps.push(r);
        }
        const randomElement = array[arr[0]].concat(" (", sets[0], "x", reps[0], ")",
            ", ", array[arr[1]], " (", sets[1], "x", reps[1], ")",
            ", ", array[arr[2]], " (", sets[2], "x", reps[2], ")");
        setRec(randomElement);
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

    //<select value={chosenCat} onChange={ (event)=>{updateCat(event.target.value); console.log(event.target.value);} }>
    //                    {possibleCategories.map( (category) =>   <option key={Math.random()} value={category}> {category} </option>)}
    //</select> 

    const currentDateToday = new Date();
    const EVENTS = (eventKey) => {
        updateCat(eventKey);
        console.log("SELECTED IN DROPDOWN: ", eventKey);
      };

    return (
        <div style={{ display: "flex", justifyContent:"space-between", flexDirection: "row", flexGrow: "1"}}>
            
            <div style = {{display: "flex", flexGrow:"1", alignItems: "flex-start", flexDirection: "row", background: "linear-gradient(110deg, #f0f6ff, #e8f2ff)", padding:15, borderRadius:5, width: "800px", marginRight:"20px"}}>
                <div>
                    <b className ="directionText" style={{marginRight:"30px"}}>Date of Workout</b>
                    <div style={{marginBottom:"15px"}}><CreateTextBox defaultText={String(currentDateToday.getMonth()+1)+"/"+currentDateToday.getDate()+"/"+currentDateToday.getFullYear()} SendValueUp={updateDateOfWorkout} x = "160px" y = "30px" /></div>
                </div>
                <div>
                    <b className ="directionText" style={{textAlign:"center"}}>Workout Notes: General</b>
                    <div><CreateTextBox SendValueUp={updateNotes} x = "450px" y = "170px" ph ="Workouts Notes"/></div>
                </div>
            </div>
            <div style={{display:"flex", flexGrow:"1", flexDirection:"column", padding:15, borderRadius:5, width: "700px", background: "linear-gradient(110deg, #f0f6ff, #e8f2ff)"}}>
                <div className ="directionText" style ={{marginBottom:"-17px"}}>
                    <b>Exercise Recommendation System</b></div>
                <br/>
                <div style={{display:"flex", flexDirection: "column"}}>
                    <div style={{display:"flex", flexDirection: "row", marginBottom:10}}>
                        <DropdownButton style={{fontFamily: 'Trebuchet MS'}} title={chosenCat} onSelect={EVENTS} variant="primary">
                            {possibleCategories.map( (category) => <Dropdown.Item eventKey={category}> {category} </Dropdown.Item>)}
                        </DropdownButton>  
                        <Button variant="primary" onClick={() => getCategoryForRandomEx(chosenCat)} style={{marginLeft:"10px", marginRight:"10px", minWidth:300, fontFamily: 'Trebuchet MS', fontSize:"17px", height:"37px"}}>Generate Recommendation</Button> 
                    </div>   
                    <div className="generalText">Recommendation: <b>{recommendationGenerated}</b> </div>
                </div>
            </div>
       </div>
    );
};