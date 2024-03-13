 
import FullHistoryComponents from '../components/historyComponents/fullHistoryComponents.js'; 
import GetAllMeasures from './Home.js'

const HistoryPage = ({username}) => {
    //console.log("HELLO!", username)
    //padding: auto
// , height:500, width:1200, marginLeft: "auto", marginRight: "auto", marginTop:"20px", padding:20, borderRadius:25
    return (
        <div style={{ backgroundColor: '#b3cef2',}}>
             <div style={{ height:1000, width:1200, marginLeft: "auto", marginRight: "auto", padding:20, borderRadius:25 }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><FullHistoryComponents username={username} 
                                                        measureGetter={GetAllMeasures}/></div>
            </div>
        </div>
    )
}

export default HistoryPage;