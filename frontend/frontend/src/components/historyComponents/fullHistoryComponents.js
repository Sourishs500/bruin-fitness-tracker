import GraphGeneration from './graphGenerations.js';
import PastWorkouts from './pastWorkouts.js';

//To-do: Everything

export default function FullHistoryComponents({username, measureGetter, pastDates, encrypted})
{
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'space-between', }}>
           
            <div style={{padding:10, boxShadow: "7px 7px #8daee0", background: "linear-gradient(110deg, #f0f6ff, #e8f2ff"}}> 
                <div style={{ fontFamily: 'Trebuchet MS', fontSize: 28, textAlign: "center"}}><p>Past Workout History</p></div>
                <PastWorkouts getStats={measureGetter} username={username} pastDates={pastDates} encrypted={encrypted} style={{ width: '125%', height: '125%' }} />
            </div>
            
            <div style={{marginTop:20, boxShadow: "7px 7px #8daee0", background: "linear-gradient(110deg, #f0f6ff, #e8f2ff"}}> 
                <div style={{padding:2.5, fontFamily: 'Trebuchet MS', fontSize: 28, textAlign: "center"}}><p>Exercise Statistics</p></div>
                <GraphGeneration username={username} encrypted={encrypted} style={{ width: '125%', height: '125%' }} />
            </div>
            <div></div>
        </div>
    );
}