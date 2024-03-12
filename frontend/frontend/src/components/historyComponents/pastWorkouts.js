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

    let workoutId = (json.GeneralNotes[workoutNumber-1]).workoutId; console.log("WID: ", workoutId)
    let desiredWorkouts = []
    for(let elem=0; elem < json.Workout.length; elem++)
    {
        let currElem = json.Workout[elem]
        if(currElem.workoutId == workoutId) { desiredWorkouts.push(currElem) }
    }
    return desiredWorkouts;
}

function GetDataOfPastDate(username, date, detail, statGetter)
{
    const information = useRef([])
    if(date == "CLEAR") { return "" }

    const getWorkoutInfo = async () => {
        information.current = (await fetchWorkoutInfo(username, date));
    }
    getWorkoutInfo();

    let text_to_display = "\n"
    for(let i=0; i<information.current.length; i++)
    {
        let curr_workout_object = (information.current)[i]
        text_to_display += curr_workout_object.name + ": " + curr_workout_object.sets
        if (detail == true) { text_to_display += "  -  Notes: " + curr_workout_object.notes}
        text_to_display +=  "\n\n"
    }

    // let failure_text = " Cannot retrieve the workout for "+date+" at this time. We apologize for the inconvenience.";
    // if (detail!==false) failure_text = "Full data requested. "+failure_text;
    return text_to_display;
}

function GetDataOfPastDate_element({user,date, edit, detail, stg}) {
    let displayText = ""

    if (date!="")
    {
        if (edit==true) { displayText = "CANNOT PROVIDE EDITING ACCESS AT THIS TIME."}
        else { displayText =  GetDataOfPastDate(user, date, detail, stg);}
    }
    return (
        <div>
            <pre style={{marginLeft:"10px", fontFamily: "Helvetica", fontSize: "16px"}}> <b> <em> 
                {displayText}
            </em> </b> </pre>
        </div>
    )
};

// --------- MAIN FUNCTION --------

export default function PastWorkouts({getStats, username}) 
//One text box for the display of past data, [one text box for entering the date, one checkbox to show detailed version], one submit button
{
    // -------------------- Date Display Handling ------------------------------
    const [enteredDate, setDate] = useState("");
    const [selectedDate, setTrueDate] = useState("");
    const dates = useRef([])

    const getThoseDates = async () => {
        dates.current = (await fetchDates(username));
    }
    getThoseDates();
    dates.current = dates.current.filter(x => x.startsWith(enteredDate))
    
    let colorMappingFromDate = {};
    for (let i = 0; i < dates.current.length; i++) {
        colorMappingFromDate[dates[i]] = "black";
    }

    const [colorMappingState, updateColorMappingState] = useState(colorMappingFromDate);

    function implementUpdateToColors(newDate)
    {
        console.log("UPDATED")
        if(newDate != selectedDate) { setTrueDate(newDate); }
        let colorMappingFromDate = {};
        for (let i = 0; i < dates.length; i++) {
            colorMappingFromDate[dates[i]] = "black";
        }
        colorMappingFromDate[newDate] = "blue";
        updateColorMappingState(colorMappingFromDate);   
    }

    // -------------------- Workout Display Handling ------------------------------
    const [detailed_yn, setDetailed_yn] = useState(false); //setting for details
    const [edit_yn, setEdited_yn] = useState(false); //setting for edits

    const clearTextShown = useRef("CLEAR");

    if (enteredDate!=="") clearTextShown.current = "";
    else clearTextShown.current = "CLEAR";

    return (
        <div style={{marginTop:"10px"}}>
            <p style={{marginLeft:"8px", fontWeight: "bold"}}>Submitted Dates</p>
            <span style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{"width":"150px", "height":"300px", "border":"3px solid black", marginRight:"20px", overflowY:"scroll"}}>

                        <p onClick={e=>{implementUpdateToColors(""); 
                                           console.log("called"); }} 
                                       style={{color:colorMappingState[""], 
                                               marginLeft:"5px", 
                                               textAlign: "center"}}
                        >
                            {clearTextShown.current}
                        </p>                       
                        {
                            (dates.current).map(x => {
                                            let weight = "normal";
                                            console.log("JUST CLICKED");
                                            if (colorMappingState[x]==="blue") weight = "bold";
                                            return  <p 
                                                onClick={()=>{implementUpdateToColors(x); console.log(x);}} 
                                                style={{color:colorMappingState[x], 
                                                        fontWeight:weight,
                                                        marginLeft:"5px", 
                                                        textAlign: "center"}}
                                                    >                                        
                                                        {x}
                                                    </p>
                                            }
                                    )
                        }
                    
                </div>
                <div style={{"width":"400px", "height":"300px", "border":"3px solid black"}}>
                    <GetDataOfPastDate_element user={username} date={selectedDate} edit={edit_yn} detail={detailed_yn} std={getStats}/>
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