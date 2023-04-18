import { useRef } from "react"
const animateDetailsPanel = () => {
    console.log("animate details panel")
}

    

export default function DetailsPanel() {

   const detailsPanel = useRef()
    
    return <div id="details-panel-wrapper" ref={detailsPanel} className="absolute left-0 bottom-0 z-20 w-full h-96 px-20">
        <div className="bg-green-950 rounded-t-2xl h-full p-20">
        <h1 className="text-white text-5xl">Hello World</h1>
        </div>
    </div>
}