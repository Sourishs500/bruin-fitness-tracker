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
    return <input type="text" style = {{"width":"150px", height:"15px", marginTop:"10px"}} onInput = {handleChange}/>;   
}

function GetDataOfPastDate({date}) {}; //should return the data of the json object from a given date, but formatted nicely

export default function PastWorkouts() 
//One text box for the display of past data, [one text box for entering the date, one checkbox to show detailed version], one submit button
/*
    functions defined:
        submitButtonHandler
    variables used:
        Date
*/
{
    const [Date, setDate] = useState(0);
    function submitButtonHandler(){};
    
    return (
        <div style={{marginTop:"20px"}}>
            <div style={{"width":"300px", "height":"300px", "border":"1px solid black"}}><GetDataOfPastDate date={Date}/></div>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
                <CreateDateBox dateFunc={setDate}/>
                <input type="checkbox" style = {{"width":"150px", height:"20px", marginTop:"10px", marginRight:"-63px"}}/>
                <span style={{marginTop:"10px"}}>SHOW DETAILED</span>
            </div>
            <Button size="sm" onClick={() => submitButtonHandler()} style={{marginBottom:"15px"}}>Submit Date</Button>
        </div>
    );
}