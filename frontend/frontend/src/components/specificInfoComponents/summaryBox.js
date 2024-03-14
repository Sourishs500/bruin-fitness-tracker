

import { useEffect, useState, useRef } from 'react';

function getPrintable(x)
{
    if (Object.keys(x).length==0) return "";
    if (x==="ERROR") return (
        <div style={{color:"red", fontSize:"25px",}}>
            <b><em>Error parsing workouts. Please review your formatting to make sure you have entered things correctly.</em></b>
        </div>
    );
    console.log(Object.keys(x["Workout"][0]), Object.keys(x["Workout"][0]).length);

    const widthList = ["10%", "10%", "8%", "8%", "13%", "13%", "14%"];
    const statTypeList = Object.keys(x.Workout[0].OverallStats);
    return(
        <div>
            <br/><b>{"Workout Summary"}</b> <br/> <br/>
            <table style={{"border":"1px solid black", "borderCollapse":"collapse", "width":"97%"}}>
                <thead>
                <tr>
                    <th style={{"border":"1px solid black", "width":"20%", textAlign:"center"}}>Exercise</th>
                    {[...Array(statTypeList.length).keys()].map(
                            (i => 
                            <th style={{"border":"1px solid black", "width":widthList[i], textAlign:"center"}}>{statTypeList[i]}</th>)
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
                        "width":"500px", "height":"300px", 
                        "border":"1px solid black", "overflow":"scroll",
                        "paddingLeft":"10px"}}> {getPrintable(toShow)}  </div>);
}