import { useEffect, useState, useRef } from 'react';
import Directions from './directions.js';

export default function Information()
{
    return (
        <div style={{display:"flex", alignItems:"flex-start"}}>
        <div style={{marginBottom:"20px", marginLeft:"500px", marginTop:"20px"}}> <Directions/> </div>
        </div>
    )
}