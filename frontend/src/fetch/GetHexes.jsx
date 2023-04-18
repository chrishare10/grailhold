import gql from 'graphql-tag'
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'


const GET_HEXES = gql`
    query GET_HEXES{
        entries (section: "hexes"){
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

export default function GetHexes() {

  
    const { isLoading, isError, data } = useQuery({
        queryKey: ['hexes'],
        queryFn: async () =>
          request({
            url: endpoint,
            document: GET_HEXES,
            requestHeaders: headers,
        })
    })
    if (isLoading) {
    return console.log("loading hex entries")
    }
    if (isError) {
    return console.log("could not load hex entries")
    }
    
    return data.entries
}


   

