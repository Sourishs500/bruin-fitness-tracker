/*
Remaining Tasks
1) Implement the functionality to obtain a summary of the data from userDataEntries
*/

import { useEffect, useState, useRef } from 'react';

function GetStats({rawInfo}) {
    return(<span>{rawInfo}</span>)
}; //should display user statistics for the most-recently-submitted userDataEntries

function processSetInformation__default(setINF) //This is just some random default functionality; this function and others like it need to be implemented
{
    return setINF.map(set => {return <span> | {set} | <br/> </span>});
}

function getPrintable(x)
{
    if (Object.keys(x).length==0) return x.toString();
    //console.log(x.Workout);
    return(
        <div>
            <br/><b>Workout Details</b> <br/> <br/>
            <table style={{"border":"1px solid black", "borderCollapse":"collapse", "width":"90%"}}>
                <thead>
                <tr>
                    <th style={{"border":"1px solid black", "width":"28%"}}>Exercise</th>
                    <th style={{"border":"1px solid black", "width":"25%"}}>Default 1</th>
                    <th style={{"border":"1px solid black", "width":"25%"}}>Default 2</th>
                    <th style={{"border":"1px solid black", "width":"25%"}}>Default 3</th>
                </tr>
                </thead>
                <tbody>
                {
                    //[...Array(x.Workout.length).keys()].map;
                    //row = x.Workout[i]
                    [...Array(x.Workout.length).keys()].map
                    ( rowIndex =>
                        {
                            const row = x.Workout[rowIndex];
                            let ex="N/A";
                            let inf="";
                            let infs = ["N/A", "N/A", "N/A"]
                            const funcs = [
                                processSetInformation__default, //this should be a real function
                                processSetInformation__default, //this should be a real function
                                processSetInformation__default //this should be a real function
                            ];
                            if (Object.keys(row).length>0)
                            {
                                ex = row.Exercise;
                                infs = funcs.map(i => i(row.SetInformation));
                            }
                            return (
                                <tr key={ex}>
                                    <td key={-1*rowIndex} style={{"border":"1px solid black", "textAlign":"center"}}>{ex}</td>     
                                    {
                                        [...Array(infs.length).keys()].map(i => (<td key={rowIndex*(infs.length)+i} style={{"border":"1px solid black", "textAlign":"center"}}>{infs[i]}</td>))
                                    }
                                    
                                </tr>
                            );
                        }
                    )
                }
                </tbody>
            </table>
        </div>
    );
}


export default function SummaryBox ({toShow})
{
    //const displayFull = useRef("");
    //displayFull = getPrintableVersion(toShow.current);

    return (<div style={{"display":"inline-block",
                        "width":"470px", "height":"250px", 
                        "border":"1px solid black", "overflow":"scroll",
                        "paddingLeft":"10px"}}> {getPrintable(toShow)} </div>);
}