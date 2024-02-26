/*
Remaining Tasks
1) Write a function that takes in the exercises done and returns a list of images containing diagrams highlighting which muscles were used
2) Display these images inside the div returned by this function (maybe the user can click through them)
*/
import { useEffect, useState, useRef } from 'react';

const exercisesAndMuscles = {"Chest Press":"Image of muscles associated with Chest Press", 
                             "Bench Press":"Image of muscles associated with Bench Press", 
                             "Preacher Curls":"Image of muscles associated with Preacher Curls", 
                             "Lat Pull-Downs":"Image of muscles associated with Lat Pull-Downs", 
                             "Wall-Sits":"Image of muscles associated with Wall-Sits", 
                             "Calf-Raises":"Image of muscles associated with Calf-Raises"}


/*
Base the actual implementation of this module on: https://www.w3schools.com/howto/howto_js_slideshow.asp

*/


function imageForExercise(ex, oneToShow, place)
{
    console.log("One to show: ", oneToShow);
    console.log("Place: ", place);

    if (place===oneToShow)
        return (<p style={{display:"block"}}>{exercisesAndMuscles[ex]}</p>);
    else
        return null;
}

//{givenExercises.map(x => imageForExercise(x))}
export default function MusclesWorkedOut({givenExercises})
{
    const [imageTracker, updateImageTracker] = useState(0);
    function incrementImageTracker()
    {
        updateImageTracker(imageTracker+1);
        if (imageTracker >= givenExercises.length-1) updateImageTracker(0);
        if (imageTracker < 0) updateImageTracker(givenExercises.length - 1);
    }

    /*
    
    */
    console.log([...Array(givenExercises.length).keys()].map(i => givenExercises[i]));
    console.log("THISTHAT");
    return(
        <div style={{"display":"inline-block","width":"250px", "height":"300px", "border":"1px solid black"}} 
             onClick = {() => {incrementImageTracker(); console.log(imageTracker)}}
        > 
            {[...Array(givenExercises.length).keys()].map(
                i => imageForExercise(givenExercises[i], imageTracker, i)
            )}
            
        </div>
    );
}