/*
Remaining Tasks
1) Implement getDataOfPastDate
*/

import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';

function CreateDateBox({dateFunc})
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(event.target.value); dateFunc(event.target.value);};
    return <input type="text" style = {{"width":"120px", height:"30px", marginTop:"10px"}} onInput = {handleChange}/>;   
}

function GetDataOfPastDate(date, det, statGetter)
{
//USE THE INFORMATION FROM THE STATGETTER FUNCTION (its implementation is defined in Home.js as GetAllMeasures)

// New comments by sourish:
// change date format to 2-27-2024 rather than 2/27/2024 before putting it in the JSON string that's passed in the fetch request.
// format json string as { "date" : "2-27-2024"}


    let failure_text = " Cannot retrieve the workout for "+date+" at this time. We apologize for the inconvenience.";
    if (det!==false) failure_text = "Full data requested. "+failure_text;
    return failure_text;
}

function GetDataOfPastDate_element({date, ed, det, stg}) {
    let text = "";
    if (date!==text)
    {
        if (ed!==false) text = "CANNOT PROVIDE EDITING ACCESS AT THIS TIME."
        else text = GetDataOfPastDate(date, det, stg);
    }
    return (
        <div>
            <p style={{marginLeft:"10px"}}> <b> <em> 
                {text}
            </em> </b> </p>
        </div>
    )
};

const fetchDates = async () => {
    let dates = []
    const response = await fetch('/api/workouts/allDates')
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
    if (dates.length == 0) { return dates }

    // Properly name workouts occurred on same dates
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
                dates[i-j] = current_date + " (" + (j+1) +")"
            }
        }
    }

    return dates;
}

export default function PastWorkouts({getStats}) 
//One text box for the display of past data, [one text box for entering the date, one checkbox to show detailed version], one submit button
/*
    functions defined:
        submitButtonHandler
    variables used:
        Date
*/
{
    const [Date, setDate] = useState("");
    const [literalDateToGoWith, setTrueDate] = useState("");
    const [dates, updateDateList] = useState([])
    function  submitButtonHandler(){};

    const getThoseDates= async () => {
        updateDateList(await fetchDates());
    }
    
    getThoseDates();
    
    const colors = useRef(Array(dates.length).fill("black"));

    let colorMappingFromDate = {};
    for (let i = 0; i < dates.length; i++) {
        colorMappingFromDate[dates[i]] = "black";
    }

    const [colorMappingState, updateColorMappingState] = useState(colorMappingFromDate);

    function implementUpdateToColors(newDate)
    {
        setTrueDate(newDate);
        let colorMappingFromDate = {};
        for (let i = 0; i < dates.length; i++) {
            colorMappingFromDate[dates[i]] = "black";
        }
        colorMappingFromDate[newDate] = "blue";
        updateColorMappingState(colorMappingFromDate);   
    }

    const dateWanted = useRef("");



    const [detailed_yn, setDetailed_yn] = useState(false);
    const [edit_yn, setEdited_yn] = useState(false);
    const [activate_yn, setActivate_yn] = useState(false);

    const [resetClicked, setReset] = useState("normal");
    const clearTextShown = useRef("CLEAR");

    if (Date!=="") clearTextShown.current = "";
    else clearTextShown.current = "CLEAR";

    return (
        <div style={{marginTop:"20px"}}>
            <span style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{"width":"120px", "height":"300px", "border":"1px solid black", marginRight:"20px", overflowY:"scroll"}}>

                        <p onClick={e=>{implementUpdateToColors(""); 
                                           console.log(""); setReset("bold");}} 
                                       style={{color:colorMappingState[""], 
                                               fontWeight:resetClicked,
                                               marginLeft:"5px"}}
                        >
                            {clearTextShown.current}
                        </p>                       
                        {
                            (dates).map(x => {
                                            let weight = "normal";
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
                    <GetDataOfPastDate_element date={literalDateToGoWith} ed={edit_yn} det={detailed_yn} std={getStats}/>
                </div>
            </span>
            
            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <span>
                    <CreateDateBox dateFunc={setDate}/>
                    <br/>
                    {//<Button size="sm" onClick={() => submitButtonHandler()} style={{marginBottom:"15px"}}>Submit Date</Button>
                    }
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