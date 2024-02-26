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
    
    const dates = ["2/25/2024", "2/26/2024", "2/27/2024", "2/28/2024", "2/29/2024", "3/1/2024", "3/2/2024", "3/3/2024", "3/4/2024", "3/5/2024"]
    const colors = useRef(Array(dates.length).fill("black"));

    let colorMappingFromDate = {};
    for (let i = 0; i < dates.length; i++) {
        colorMappingFromDate[dates[i]] = "black";
    }

    const [colorMappingState, updateColorMappingState] = useState(colorMappingFromDate);

    function implementUpdateToColors(newDate)
    {
        let colorMappingFromDate = {};
        for (let i = 0; i < dates.length; i++) {
            colorMappingFromDate[dates[i]] = "black";
        }
        colorMappingFromDate[newDate] = "blue";
        updateColorMappingState(colorMappingFromDate);   
    }

    const dateWanted = useRef("");
    function  mostRecentlyClickedDate(dateClicked)
    {
        console.log("Date selected: ", dateClicked);
        dateWanted.current = dateClicked;
        const colors = dates.map(x => {
            if (x===dateWanted.current) return "blue";
            return "black";
        })
        console.log("Colors: ", colors);
        return colors;
    }

    return (
        <div style={{marginTop:"20px"}}>
            <span style={{ display: "flex", alignItems: "flex-start" }}>
                <div style={{"width":"100px", "height":"300px", "border":"1px solid black", marginRight:"20px", overflowY:"scroll"}}>

                    
                        {
                            dates.map(x => {
                                            let weight = "normal";
                                            if (colorMappingState[x]==="blue") weight = "bold";
                                            return  <p 
                                                onClick={()=>{implementUpdateToColors(x); console.log(x);}} 
                                                style={{color:colorMappingState[x], 
                                                        fontWeight:weight}}
                                                    >
                                            
                                                        {x}
                                                    </p>
                                            }
                                    )
                        }
                    
                </div>
                <div style={{"width":"300px", "height":"300px", "border":"1px solid black"}}><GetDataOfPastDate date={Date}/></div>
            </span>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <span>
                        <CreateDateBox dateFunc={setDate}/>
                        <br/>
                        <Button size="sm" onClick={() => submitButtonHandler()} style={{marginBottom:"15px"}}>Submit Date</Button>
                    </span>
                    <span>
                        <input type="checkbox" style = {{"width":"150px", height:"20px", marginTop:"10px", marginRight:"-63px"}}/>
                        <span style={{marginTop:"10px"}}>SHOW DETAILED</span>
                        <br/>
                        <input type="checkbox" style = {{"width":"150px", height:"20px", marginTop:"10px", marginRight:"-63px"}}/>
                        <span style={{marginTop:"10px"}}>EDIT PAST WORKOUT</span>
                    </span>
                </div>
            
        </div>
    );
}