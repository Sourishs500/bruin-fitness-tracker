import { useEffect, useState, useRef } from 'react';
import Directions from './directions.js';

export default function Information()
{
    return (
        <div style={{display:"flex", alignItems:"flex-start"}}>
        <div style={{marginBottom:"20px", marginLeft:"20px", marginTop:"20px"}}> <Directions/> </div>
        </div>
    )
}