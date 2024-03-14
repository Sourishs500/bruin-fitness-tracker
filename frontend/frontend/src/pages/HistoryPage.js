 
import FullHistoryComponents from '../components/historyComponents/fullHistoryComponents.js'; 
import GetAllMeasures from './Home.js'

const HistoryPage = ({username, pastDates}) => {
    return (
        <div style={{ backgroundColor: 'lightblue',}}>
             <div style={{ height:1000, width:1200, marginLeft: "auto", marginRight: "auto", padding:20, borderRadius:25 }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}><FullHistoryComponents username={username} 
                                                        measureGetter={GetAllMeasures} pastDates={pastDates}/></div>
            </div>
        </div>
    )
}

export default HistoryPage;