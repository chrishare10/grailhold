import Hexes from "./Hexes";

export default function Map({panelState}) {
    return <>
        <Hexes panelState={panelState}/>
        <div id="map-container" className="absolute bg-blue-300 flex justify-center items-center" >   
				  <img className="h-full" src="./assets/static/Grailhold-map.svg" />
		    </div>
    </>
}