
import GeneralInformation from '../components/basicInformation/fullGeneralInformation.js'; 

const DirectionsPage = ({username}) => {

    return (

        <div style = {{backgroundColor: '#b3cef2', padding:10, height:"100vmin"}}>
                <div >
                    <div style={{fontFamily: 'verdana, sans-serif', fontSize: "22px", alignSelf: "self-start", marginTop:"10px", fontWeight: 'bold', marginLeft:"10px", marginBottom:"5px"}}>Directions</div>
                </div>
                <div className="directionText" style={{background: "linear-gradient(110deg, #f0f6ff, #e8f2ff)", padding:15, boxShadow: "7px 7px #8daee0", marginLeft:"-20px", marginRight:"-20px"}}>
                <div style = {{marginLeft:"20px", marginRight:"20px"}}>
                <p>
                    To create your workout, enter your workout data on the Home Page. Select the appropriate exercise from the drop-down menu. Then,
                    click the "Add Set" button and enter your information in the following format: [WEIGHT]x[NUMBER OF REPS]. If you changed your weight in the
                    middle of the set, just separate the entries with a comma.
                </p>
                
                <p>
                    As an example, suppose you did 10 reps for your first set of Preacher Curls (5 reps at 115 pounds, 2 reps at 105 pounds, 3 reps at 95 pounds). 
                    First, go to the drop-down menu and select Preacher Curls from the options you see.
                    Then, click the "Add Set" button. In the resulting text box, enter the following string: "115x5, 105x2, 95x3". This is your entry for that set.
                    Once you've done your next set, click "Add Set" again and enter your information in the same style. Keep going until you've finished doing Preacher Curls.
                    Now, you can click the "Add Exercise" button, which will enable you to add the next exercise in your workout. Keep going in this fashion until you're done for the day.
                    At that point, you can click the "Submit Workout" button; this will upload your workout information to your account.
                </p>

                <p>
                    If you have any notes that you want to add, there are designated spaces for you to do so. If your note is about a specific exercise, enter it into
                    the text box to the below the corresponding exercise. If your note is about the workout as a whole, enter it into the large text box titled "Workout Notes".
                    Once you click the submit button, these notes will be recorded alongside your workout information.
                </p>
                </div>
                </div>
        
            <div>
                <div style={{fontFamily: 'verdana, sans-serif', fontSize: "22px", alignSelf: "self-start", marginTop:"30px", fontWeight: 'bold', marginLeft:"10px", marginBottom:"5px"}}>Additional Features</div>
            </div>
            <div className="directionText" style={{background: "linear-gradient(110deg, #f0f6ff, #e8f2ff)", padding:15, boxShadow: "7px 7px #8daee0", marginLeft:"-20px", marginRight:"-20px"}}> 
                <div style = {{marginLeft:"20px", marginRight:"20px"}}>
                <p>
                    1) <b>Recommendation System:</b> Go to the Home Page. Enter the muscle group for the day into the drop-down menu in the top right and then click "Generate Recommendation". <em></em>
                </p>
                <p>
                    2) <b>Past Workout Access:</b> Go to the History page. Enter the date whose records you are looking for into the text box and click submit.
                    If you want the full information for that day, click the "SHOW DETAILED" checkbox before clicking submit. Otherwise, you will be shown a statistical summary of your workout for that date.
                </p>

                <p>
                    3) <b> Graph Generation: </b> This will show you a graph that maps out your progress for a given exercise over time. Go to the History page. 
                    Select the exercise whose graph you want to see and the kind of statistic that you want to track. Then, click the "Submit Request" button.
                </p>
                </div>
            </div>
        </div>

    )
}

export default DirectionsPage;