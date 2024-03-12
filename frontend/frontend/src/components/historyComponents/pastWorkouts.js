/*
Remaining Tasks
1) Implement getDataOfPastDate
*/

import { useEffect, useState, useRef } from 'react';

// ------------- Date Fetching Functions ------------

function CreateDateBox({dateFunc})
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(event.target.value); dateFunc(event.target.value);};
    return <input type="text" style = {{"width":"120px", height:"30px", marginTop:"10px"}} onInput = {handleChange}/>;   
}

const fetchDates = async (username) => {
    let dates = []
    const path = '/api/workouts/allDates/' + username
    const response = await fetch(path)
    const json = await response.json()
    if (!response.ok){
        console.error("Something is wrong with getting dates")
    }else{
        for(let i = 0; i < json.length; i++){
            const cur = json[i]
            const date = cur.date
            dates.push(date)
        }
    }

    let numberOfWorkouts = dates.length
    let current_date = ""
    let current_date_counter = 0
    for (let i=0; i < numberOfWorkouts; i++)
    {
        // First instance of a new date
        if(current_date != dates[i])  { current_date = dates[i]; current_date_counter = 1 }
        else { current_date_counter += 1 }

        // Next instance of a new date
        if(current_date_counter > 1)
        {
            for(let j = 0; j < current_date_counter; j++)
            {
                dates[i-j] = current_date + " (" + (current_date_counter-j) +")"
            }
        }
    }
    
    return dates.reverse();
}

// ------------- Workout Detail Fetching Functions ------------

const fetchWorkoutInfo = async (username, date) => {
    if(date == "" || date == "CLEAR") { return [] }

    let convertedDate = (date.replace("/", "-")).replace("/", "-")
    let indexOfDescriptor = convertedDate.indexOf("(")
    if(indexOfDescriptor != -1) { convertedDate = convertedDate.substring(0,indexOfDescriptor-1)}

    const path = '/api/workouts/' + convertedDate +"/" +username
    const response = await fetch(path)
    const json = await response.json()
    if (!response.ok){
        console.error("Something is wrong with getting dates")
    }

    let workoutNumber
    if(indexOfDescriptor == -1) { workoutNumber = 0}
    else{ workoutNumber = Math.floor(date.substring(indexOfDescriptor+1, date.indexOf(")")))}

    let workoutId = (json.GeneralNotes[workoutNumber-1]).workoutId
    let desiredWorkouts = []
    for(let elem=0; elem < json.Workout.length; elem++)
    {
        let currElem = json.Workout[elem]
        if(currElem.workoutId == workoutId) { desiredWorkouts.push(currElem) }
    }
    console.log(desiredWorkouts)
    return desiredWorkouts;
}

function GetDataOfPastDate(username, date, det, statGetter)
{
    const information = useRef([])
    if(date == "CLEAR") { return "" }

    const getWorkoutInfo = async () => {
        information.current = (await fetchWorkoutInfo(username, date));
    }
    getWorkoutInfo();

    let text_to_display = ""
    for(let i=0; i<information.length; i++)
    {
        let curr_workout_object = information[i]
        text_to_display += curr_workout_object.name + ": " + curr_workout_object.sets + "  -  Notes: " + curr_workout_object.notes + "\n"
    }

    let failure_text = " Cannot retrieve the workout for "+date+" at this time. We apologize for the inconvenience.";
    if (det!==false) failure_text = "Full data requested. "+failure_text;
    return text_to_display;
}

function GetDataOfPastDate_element({user,date, ed, det, stg}) {
    let text = "";
    console.log("Here is the date:", date);
    console.log("Here is the text:", text);
    if (date!="")
    {
        console.log("IN IF STATEMENT");
        if (ed==true) text = "CANNOT PROVIDE EDITING ACCESS AT THIS TIME."
        else text = GetDataOfPastDate(user, date, det, stg);
    }
    return (
        <div>
            <p style={{marginLeft:"10px"}}> <b> <em> 
                {text}
            </em> </b> </p>
        </div>
    )
};

// --------- MAIN FUNCTION --------

export default function PastWorkouts({getStats, username}) 
//One text box for the display of past data, [one text box for entering the date, one checkbox to show detailed version], one submit button
{
    const [enteredDate, setDate] = useState("");
    const [selectedDate, setTrueDate] = useState("");
    const dates = useRef([])

    const getThoseDates = async () => {
        dates.current = (await fetchDates(username));
    }
    
    getThoseDates();
    dates.current = dates.current.filter(x => x.startsWith(enteredDate))
    
    const colors = useRef(Array(dates.current.length).fill("black"));

    let colorMappingFromDate = {};
    for (let i = 0; i < dates.current.length; i++) {
        colorMappingFromDate[dates[i]] = "black";
    }

    const [colorMappingState, updateColorMappingState] = useState(colorMappingFromDate);

    function implementUpdateToColors(newDate)
    {
        if(newDate != selectedDate) { setTrueDate(newDate); }
        // selectedDate = newDate;
        let colorMappingFromDate = {};
        for (let i = 0; i < dates.length; i++) {
            colorMappingFromDate[dates[i]] = "black";
        }
        colorMappingFromDate[newDate] = "blue";
        updateColorMappingState(colorMappingFromDate);   
    }

    const [detailed_yn, setDetailed_yn] = useState(false); //setting for details
    const [edit_yn, setEdited_yn] = useState(false); //setting for edits

    const [resetClicked, setReset] = useState("normal");
    const clearTextShown = useRef("CLEAR");

    if (enteredDate!=="") clearTextShown.current = "";
    else clearTextShown.current = "CLEAR";

    return (
        <div style={{marginTop:"20px"}}>
            <span style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{"width":"150px", "height":"300px", "border":"1px solid black", marginRight:"20px", overflowY:"scroll"}}>

                        <p onClick={e=>{implementUpdateToColors(""); 
                                           console.log("called"); setReset("bold");}} 
                                       style={{color:colorMappingState[""], 
                                               fontWeight:resetClicked,
                                               marginLeft:"5px"}}
                        >
                            {clearTextShown.current}
                        </p>                       
                        {
                            (dates.current).map(x => {
                                            let weight = "normal";
                                            console.log("JUST CLICKED");
                                            if (colorMappingState[x]==="blue") weight = "bold";
                                            return  <p 
                                                onClick={()=>{implementUpdateToColors(x); console.log(x); setReset("normal")}} 
                                                style={{color:colorMappingState[x], 
                                                        fontWeight:weight,
                                                        marginLeft:"5px"}}
                                                    >                                        
                                                        {x}
                                                    </p>
                                            }
                                    )
                        }
                    
                </div>
                <div style={{"width":"300px", "height":"300px", "border":"1px solid black"}}>
                    <GetDataOfPastDate_element user={username} date={selectedDate} ed={edit_yn} det={detailed_yn} std={getStats}/>
                </div>
            </span>
            
            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <span>
                    <CreateDateBox dateFunc={setDate}/>
                    <br/>
                </span>
                <span>
                    <input type="checkbox" 
                    style = {{"width":"150px", height:"20px", marginTop:"10px", marginRight:"-63px"}}
                    onClick = {() => {setDetailed_yn(!(detailed_yn))}}/>
                    <span style={{marginTop:"10px"}}>SHOW DETAILED</span>
                    <br/>
                    <input type="checkbox" 
                    style = {{"width":"150px", height:"20px", marginTop:"10px", marginRight:"-63px"}}
                    onClick = {() => {setEdited_yn(!(edit_yn))}}/>
                    <span style={{marginTop:"10px"}}>EDIT PAST WORKOUT</span>
                </span>
            </div>
            
        </div>
    );
}