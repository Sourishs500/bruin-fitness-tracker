/*
Remaining Tasks
1) Implement getDataOfPastDate
*/

import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function CreateDateBox({dateFunc})
{
    const [value, setValue] = useState('');
    const handleChange = (event) => {setValue(event.target.value); dateFunc(event.target.value);};
    return <input type="text" style = {{"width":"120px", height:"30px", marginTop:"10px"}} onInput = {handleChange}/>;   
}

function GetDataOfPastDate(date, det, statGetter)
{
//IF YOU ARE WORKING ON JUST SHOWING PAST DATA WITHIN THE TEXTBOX (WITHOUT THE WHOLE EDIT-PAST-RECORDS THING)
//YOU CAN CHANGE ANYTHING FROM THIS LINE TO THE LINE THAT SAYS "DO NOT CHANGE ANYTHING BELOW THIS LINE"
//REPLACE THE FOLLOWING LINES WITH THE INFORMATION GLEANED FROM THE BACKEND

//USE THE INFORMATION FROM THE STATGETTER FUNCTION (its implementation is defined in Home.js as GetAllMeasures)

// New comments by sourish:
// change date format to 2-27-2024 rather than 2/27/2024 before putting it in the JSON string that's passed in the fetch request.
// format json string as { "date" : "2-27-2024"}


    let text = " Cannot retrieve the workout for "+date+" at this time. We apologize for the inconvenience.";
    if (det!==false) text = "Full data requested. "+text;
    return text;

//DO NOT CHANGE ANYTHING BELOW THIS LINE
//UNLESS YOU ARE WORKING ON THE WHOLE EDIT-PAST-RECORDS THING
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
    function  submitButtonHandler(){};

    let dates = [];
    console.log("bad")

    const fetchDates = async () => {
        const response = await fetch('/api/workouts/allDates')
        const json = await response.json()
        if (!response.ok){
            //console.log("bad")
            console.error("Something is wrong with getting dates")
        }else{
            for(let i = 0; i < json.length; i++){
                const cur = json[i]
                const date = cur.date
                //console.log(date)
                dates.push(date)
            }
        }
    }
    //console.log("bad")
    //console.log(dates)
    dates.filter(x => x.startsWith(Date));
    
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

                        <
                            p onClick={e=>{implementUpdateToColors(""); 
                                           console.log(""); setReset("bold");}} 
                                       style={{color:colorMappingState[""], 
                                               fontWeight:resetClicked,
                                               marginLeft:"5px"}}
                        >
                            {clearTextShown.current}
                        </p>                       
                        {
                            dates.map(x => {
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
                    <Button size="sm" onClick={() => submitButtonHandler()} style={{marginTop:"15px", marginBottom:"30px"}}>Submit Date</Button>
                </span>
                <span>
                    <Form>
                    <Form.Check onClick = {() => {setDetailed_yn(!(detailed_yn))}} label="SHOW DETAILED"
                    style = {{marginTop:"10px", marginLeft:"100px"}}/>
                    <br/>
                    <Form.Check onClick = {() => {setEdited_yn(!(edit_yn))}} label="EDIT PAST WORKOUT"
                    style = {{marginTop:"-20px", marginLeft:"100px"}}/>
                    </Form>
                </span>
            </div>
            
        </div>
    );
}