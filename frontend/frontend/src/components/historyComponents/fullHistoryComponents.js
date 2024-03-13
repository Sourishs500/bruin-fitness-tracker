import GraphGeneration from './graphGeneration.js';
import PastWorkouts from './pastWorkouts.js';

//To-do: Everything

export default function FullHistoryComponents({username, measureGetter})
{
    return (
        <div style={{ display: "flex", justifyContent: 'space-between' }}>
            <div></div> 
            <div style={{ flex: 2 }}> 
                <GraphGeneration username={username} style={{ width: '125%', height: '125%' }} />
            </div>
            <div style={{ flex: 2 }}> 
                <PastWorkouts getStats={measureGetter} username={username} style={{ width: '125%', height: '125%' }} />
            </div>
            <div></div>
        </div>
    );
}