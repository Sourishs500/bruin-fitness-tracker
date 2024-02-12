import SummaryBox from './summaryBox.js';
import UserDataEntries from './userDataEntries.js';

export default function FullSpecificInfoComponents()
{
    return (
        <div style={{display:"flex", alignItems:"flex-start"}}> 
            <span style={{marginRight:"50px"}}> <SummaryBox/> </span>
            <div><UserDataEntries/></div>
        </div>
    );
}