import DetailsPanel from "./components/DetailsPanel";
import Map from "./components/Map";
import { useState } from "react";


export default function App(){
    const [panelState, setPanelState ] = useState(2)

return <div id="frame" className="main overflow-hidden bg-blue-300 mx-auto h-full">
        <DetailsPanel panelState={panelState} />
        <Map panelState={panelState}/>
    </div>

}