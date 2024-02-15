import { useEffect, useState, useRef } from 'react';

import FullGeneralInfoComponents from './components/generalInfoComponents/fullGeneralInfoComponents.js'; 
import FullHeaderComponents from './components/headerComponents/fullHeaderComponents.js'; 
import FullHistoryComponents from './components/historyComponents/fullHistoryComponents.js'; 
import FullSpecificInfoComponents from './components/specificInfoComponents/fullSpecificInfoComponents.js'; 

//I haven't touched the history or specific info components
export default function App () {
    return (
        <>
        <div style={{ marginBottom: '30px' }}><FullHeaderComponents/></div>
		<div style={{ marginBottom: '30px' }}><FullGeneralInfoComponents/></div>
		<div style={{ marginBottom: '30px' }}><FullSpecificInfoComponents/></div>
        <div><FullHistoryComponents/></div>
        </>
   );
};