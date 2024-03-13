import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import FullGeneralInfoComponents from '../components/generalInfoComponents/fullGeneralInfoComponents.js';
import GeneralInformation from '../components/basicInformation/fullGeneralInformation.js'; 
import FullHistoryComponents from '../components/historyComponents/fullHistoryComponents.js'; 
import FullSpecificInfoComponents from '../components/specificInfoComponents/fullSpecificInfoComponents.js';

const Home = ({username}) => {
    //console.log("HELLO!", username)

    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            if (username != "")
            {
                const path = '/api/workouts/' + username
                const response = await fetch(path)
                const json = await response.json()

                if (response.ok){
                    setWorkouts(json)
                }
            } 
            else
            {
                setWorkouts([])
            }      
        }

        fetchWorkouts();
    }, [username])

    let allExercisesOrganizedByTheme = {
        "Push":["Chest Press", "Bench Press", "Lateral Raises", "Incline Press"],
        "Pull":["Preacher Curls", "Lat Pull-Downs","Seated Cable Row"],
        "Legs":["Wall-Sits", "Calf Raises", "Hip Thrusts", "Deadlift"]   
    }; //to be un-hardcoded once we figure out the API stuff

    const allThemes = Object.keys(allExercisesOrganizedByTheme); //Push, pull, legs
    const allExercises = Object.values(allExercisesOrganizedByTheme).flat(); //List of all the exercises across all of the themes

    const dataWithoutGeneralComments = useRef([]);
    const generalNotes = useRef("");

    const currentDateToday = new Date();
    const initialDate = String(currentDateToday.getMonth()+1)+"/"+currentDateToday.getDate()+"/"+currentDateToday.getFullYear()
    const generalDate = useRef(initialDate);
    const completeWorkoutData = useRef({});
    const [updatedVersionOfCompleteworkouts, updateCompleteWorkout] = useState({});
    const updatedWorkouts = useRef({});

    const [allExercisesAcrossWorkout, updateExercisesAcrossWorkout] = useState([]);


    const workoutcopy = useRef({});

    //receives the general notes from FullGeneralInfo and stores it in generalNotes
    function receiveGeneralNotes({notes})   {generalNotes.current = notes["n"];} 

    function receiveGeneralDate({date})  
    {
        console.log("HOME"); 
        generalDate.current = date["n"]; 
        console.log("HOME.JS: ", generalDate.current); 
    }
    
    function GetAllMeasures({completeWorkoutData2})
    {
        let workoutcopy = JSON.parse(JSON.stringify(completeWorkoutData2));
        console.log("ABLE TO PARSE WORKOUT", workoutcopy.Workout.length)

        //console.log("GET ALL MEASURES: ", workoutcopy, workoutcopy.Workout[0], " | ", workoutcopy.Workout[0].length)
        //if (workoutcopy.Workout.length==0) return "ERROR";
        if (workoutcopy.Workout.length==0) return "ERROR";
        if (Object.keys(workoutcopy.Workout[0]).length==0) return "ERROR";
        workoutcopy.Workout.map(
                                        exercise => {
                                                        if (Object.keys(exercise).length!==0)
                                                        {
                                                            let exCopy = exercise;

                                                            //console.log("Processing ", exCopy);
                                                            exCopy["UnwrappedSetInfo"] = exCopy.SetInformation.map(x => 
                                                                parseWorkoutString(x, false, "x", ",")
                                                            );

                                                            //console.log("Parsed it into  ", exCopy["UnwrappedSetInfo"]);

                                                            if (exCopy["UnwrappedSetInfo"].includes("ERROR") || exCopy["UnwrappedSetInfo"].length===0)
                                                            {
                                                                return "ERROR";
                                                            }

                                                            exCopy["SetLevelStats"] = exCopy["UnwrappedSetInfo"].map(x => calculateStats(x));

                                                            exCopy["AllSetsTogether"] = exCopy.UnwrappedSetInfo.flat();
                                                            exCopy["OverallStats"] = calculateStats(exCopy["AllSetsTogether"]);
                                                            exCopy["OverallStats"]["Total Sets"] = exCopy["SetLevelStats"].length;
                                                            return exCopy;
                                                        }
                                                        else return exercise; //handle the case when {} is the only thing in the record
                                                    }
                                );
        //if (workoutcopy.Workout.UnwrappedSetInfo.includes("ERROR")) workoutcopy = "ERROR";
        if(workoutcopy.Workout[0].UnwrappedSetInfo.includes("ERROR")) return "ERROR";
        return workoutcopy;
    }

    //receives the workout data from FullSpecificInfo and stores it dataWithoutGeneralComments
    // handleSubmitWorkoutButton()
    function receiveData({data}){
        dataWithoutGeneralComments.current = data["n"];
        completeWorkoutData.current = {"Date":generalDate.current, "GeneralNotes":generalNotes.current,
                                        "Workout":dataWithoutGeneralComments.current, "User":username};
        updateCompleteWorkout(completeWorkoutData.current);

        updateExercisesAcrossWorkout(dataWithoutGeneralComments.current.map(i => (i["Exercise"])));
        //console.log(allExercisesAcrossWorkout);

        const handleSubmitWorkoutButton = async (e) => {
            //e.preventDefault();

            const response = await fetch('/api/workouts/', {
                method: 'POST',
                body: JSON.stringify(completeWorkoutData.current),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            if(!response.ok){
                console.log(json.error)
            }else{
                console.log('Workout added to the backend')
            }

        }

        const handleSubmitStatistics = async (e) => {
            const response = await fetch('/api/workouts/statistics', {
                method: 'POST',
                body: JSON.stringify(completeWorkoutData.current),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json();

            if(!response.ok){
                console.log(json.error)
            }else{
                console.log('Statistics added to the backend')
            }
        }

        const updateStars = async (e) => {
            const path = '/api/workouts/statistics'
            const response = await fetch(path)


            const json = await response.json();

            if(!response.ok){
                console.log(json.error)
            }else{
                console.log('updatedStars')
            }
        }

        console.log(completeWorkoutData.current);
        let myCopy = completeWorkoutData.current;
        console.log("HERE!")
        myCopy = GetAllMeasures({completeWorkoutData2:myCopy});
        if (myCopy!=="ERROR")
        // Still sending workout data without statistics
            handleSubmitWorkoutButton();
        else
            alert("Errors prevented this workout from being uploaded.");
        // Now workout data includes statistics
        completeWorkoutData.current = myCopy;
        handleSubmitStatistics();
        console.log("Updated: ", completeWorkoutData.current);
        
        //updateStars();

    }

    return (
        <>
        <div style={{ backgroundColor: 'lightyellow', padding:20 }}><FullGeneralInfoComponents 
                                                        SendValueUpGen={receiveGeneralNotes}
                                                        SendDateUpGen={receiveGeneralDate}
                                                        exInfoGen={allExercisesOrganizedByTheme}
                                                        muscleGroupsToDisplay={allExercisesAcrossWorkout}
                                                        SendValueUpSpec={receiveData} 
                                                        exInfoSpec={allExercises}
                                                        summaryToDisplay={completeWorkoutData.current}
                                                        username={username}
                                                        /></div>

           
        </>
    )
}

//Source: https://www.geeksforgeeks.org/how-to-get-the-standard-deviation-of-an-array-of-numbers-using-javascript/
function StandardDeviation(arr) {
 
    // Creating the mean with Array.reduce
    let mean = arr.reduce((acc, curr) => {
        return acc + curr
    }, 0) / arr.length;
 
    // Assigning (value - mean) ^ 2 to
    // every array item
    arr = arr.map((k) => {
        return (k - mean) ** 2
    });
 
    // Calculating the sum of updated array 
    let sum = arr.reduce((acc, curr) => acc + curr, 0);
 
    // Calculating the variance
    let variance = sum / arr.length
 
    // Returning the standard deviation
    return Math.sqrt(sum / arr.length)
}

function calculateStats(listOfValues)
{
    const avg = listOfValues.reduce((a, b) => a + b) / listOfValues.length;
    const max = listOfValues.reduce((a, b) => Math.max(a, b), -Infinity);
    const min = listOfValues.reduce((a, b) => Math.min(a, b), Infinity);

    return {"Mean":Number(avg.toFixed(2)), 
            "Max":max, 
            "Min":min, 
            "Standard Deviation":Number(StandardDeviation(listOfValues).toFixed(2)),
            "Total Reps":listOfValues.length,
            "Sum":listOfValues.reduce((partialSum, a) => partialSum + a, 0)
           };
}

function parseWorkoutString(singleSetRec, isCalisthenics, repSeparator, changeSeparator)
{
    let record = singleSetRec;
    const og = singleSetRec;

    const signs = "[-+]";
    const characterClass = "[^,x0123456789]";
    const digits = "[0123456789]";

    const setFormat = digits+"{1,4}"+repSeparator+digits+"{1,3}";
    const setWithChangingWeights = "^("+setFormat+changeSeparator+")*"+setFormat+"$";

    let extraCharRemoved = record.replaceAll(RegExp(characterClass, "g"), "");
    const n = RegExp(setWithChangingWeights).test(extraCharRemoved);
    if (n!==true) 
    {
        alert("Sensible data could not be recovered from the set entry "+og+". Please reformat it and try again!");
        return "ERROR";
    }
    const b = extraCharRemoved.split(changeSeparator).map(
        weightXreps => {
            const parts = weightXreps.split(repSeparator);
            return Array(Number(parts[1])).fill(Number(parts[0]))
        }
    ).flat();
    return b;
    //return extraCharRemoved;
}

export default Home;