import GetHexes from '../fetch/GetHexes'
import gql from "graphql-tag"
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import DetailsPanel from './DetailsPanel'

const GET_HEX = gql`
    query GET_HEX ($entryId: [QueryArgument]){
        entries (id: $entryId){
            title
            id
            ...on hexes_default_Entry {
                hexId
            }
        }
    }
`

const endpoint = import.meta.env.VITE_API_ENDPOINT
const headers = {
    authorization: import.meta.env.VITE_API_AUTH,
}




let selectedHex = 0

export default function BuildHexes(panelState) {


    const hexData = GetHexes()


    
    const handleClick = (e) => {
        selectedHex = e.target.id
        hexQuery.refetch()
        // setPanelState(3)
        console.log(panelState)
    }

    const hexQuery = useQuery({
        queryKey: ['hex'],
        queryFn: async () =>
        request({
            url: endpoint,
            document: GET_HEX,
            requestHeaders: headers,
            variables: {
                "entryId": selectedHex
            },
            enabled: false
        }),
    })
    if (hexQuery.isLoading) {
        console.log("loading hex entries")
    }
    if (hexQuery.isError) {
        console.log("could not load hex entries")
    }
    if (hexQuery.isSuccess) {
        
        console.log(hexQuery.data.entries)
    }

    
    
    let exploredHexes 
    const hexCount = 1008
    let hexList=[];
    if(hexData) {

        const exploredHexes = []
        for (let i = 0; i < hexData.length; i++) {
            const el = hexData[i];
            exploredHexes.push(el.hexId)
        }
        
        let exploredCount = 0
        for (let i = 0; i < hexCount; i++) {
            const el = hexCount[i];
            
            if(exploredHexes.includes(i)){
                hexList.push( <div id={hexData[exploredCount].id} key={i} className={"hex explored " + "h-" + hexData[exploredCount].hexId } onClick={ handleClick } ></div>)
                exploredCount++
            } else {
                hexList.push( <div key={i} className={"hex " + "h-" + i } ></div>)
            }
            
        }
    } else {
        for (let i = 0; i < hexCount; i++) {
            const el = hexCount[i];
            hexList.push( <div id={"h-" + i} key={i} className={"hex " + "h-" + i } ></div>)
        }
        
    }
    

    return <>
    {hexList}

    
    </>
}


    

    
     
