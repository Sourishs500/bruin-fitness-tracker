/*
Remaining Tasks
1) Implement the functionality to obtain a summary of the data from userDataEntries
*/

import { useEffect, useState, useRef } from 'react';

function getPrintable(x)
{
    if (Object.keys(x).length==0) return "";

    const widthList = ["12%", "10%", "10%", "20%", "13%", "13%"];
    const statTypeList = Object.keys(x.Workout[0].OverallStats);
    return(
        <div>
            <br/><b>{"Workout Summary"}</b> <br/> <br/>
            <table style={{"border":"1px solid black", "borderCollapse":"collapse", "width":"97%"}}>
                <thead>
                <tr>
                    <th style={{"border":"1px solid black", "width":"24%"}}>Exercise</th>
                    {[...Array(statTypeList.length).keys()].map(
                            (i => 
                            <th style={{"border":"1px solid black", "width":widthList[i]}}>{statTypeList[i]}</th>)
                        )
                    }
                </tr>
                </thead>
                <tbody>
                {   
                    [...Array(x.Workout.length).keys()].map
                    ( rowIndex =>
                        {
                            const row = x.Workout[rowIndex];
                            let ex="N/A";
                            if (Object.keys(row).length>0) {ex = row.Exercise;}
                            return (
                                <tr key={ex+String(Math.random())}>
                                    <td style={{"border":"1px solid black", "textAlign":"center"}}>{ex}</td>     
                                    {statTypeList.map(i => <td style={{"border":"1px solid black", "textAlign":"center"}}> {row["OverallStats"][i]} </td>)}                                    
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

    //{getPrintable(toShow)}
    return (<div style={{"display":"inline-block", "backgroundColor":"#ffffaa",
                        "width":"470px", "height":"300px", 
                        "border":"1px solid black", "overflow":"scroll",
                        "paddingLeft":"10px"}}> {getPrintable(toShow)}  </div>);
}