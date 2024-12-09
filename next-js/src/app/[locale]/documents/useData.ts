import { Document, DefaultHeaders, DataRequest , DefaultMessage} from "../../../../../shared/types/documents.types"
import { useCallback, useEffect, useRef, useState } from "react";
import { documentEventEmitter } from "../../lib/documentEventEmitter";
import { Coordinates, shiftCoordinates } from "@/app/utils/shiftCoordinates";
import { clientDataRequestHandler } from "@/app/lib/documentDataRequestHandler";

const DOCUMENTS_RENDER_LIMIT = 100;

const INIT_COORDINATES: Coordinates = {
  start: 0,
  end: 5 * DOCUMENTS_RENDER_LIMIT,
};

type LastResponse = {
    ready:boolean,
    documentAmount: number
}

export const useData = () => {
    const callBack = useCallback(clientDataRequestHandler.fetchDocumentsData, [])
    const [coordinates, setCoordinates] = useState<Coordinates>(INIT_COORDINATES);

    const [documents, setDocuments] = useState<Document[]>([]);

    const [sorter, setSorter] = useState<{ key: DefaultHeaders, isAscending: boolean}>( { key: 'id', isAscending: true });

    const isRendering = useRef(false);
    const isFetching = useRef(false);
    const isAllDataFetched = useRef(false)
    const dataAmount = useRef(-1)

    useEffect(()=>{
        documentEventEmitter.on("dataFetched", (jsonData)=>{
            console.log(jsonData, 'hoow');
            dataAmount.current = (jsonData as Document[]).length;
            setDocuments(() => (jsonData as DefaultMessage).data as Document[]);
            isFetching.current = false;
        })
        return ()=>{
            documentEventEmitter.unsubscribe("dataFetched")
        }
    }, [])

    // useEffect(()=>{
    //     if(!isFetching.current){
    //         isFetching.current = true
    //         async function fetchData() {
                
    //             const response = await fetch(`/api/documents?key=${sorter.key}&isAscending=${sorter.isAscending}&start=${coordinates.start}&end=${coordinates.end}`, {cache:"no-cache"})
    //             const jsonResponse = await response.json();
    //             console.log(jsonResponse, "looooooool")
    //             documentEventEmitter.emit("dataFetched", jsonResponse)
    //         }
    //         fetchData();
    //     }
    // }, [])


    useEffect(() => {
        if (documents) {
            documentEventEmitter.emit('documentsUpdated', {documents, indexStart: coordinates.start});
        }
    }, [documents]);

    useEffect(() => {
        console.log("post", dataAmount.current)
        if(dataAmount.current != -1){
            const sortRequest: DataRequest = {
                request: "fetchData",
                body: {
                    coordinates: coordinates,
                    sorting: {
                        key: sorter.key,
                        isAscending: sorter.isAscending
                    }
                }
            }
            console.time("sorting started")
            callBack(sortRequest)
        }
    }, [sorter.isAscending, sorter.key])

    useEffect(() => {
        //@ts-expect-error: asdasdasd
        documentEventEmitter.on('sortDocuments', ({key, isAscending: isAscending}) => {
            isRendering.current = true
            setSorter({ key, isAscending })
        });

        documentEventEmitter.on('bottomRefTriggered', () => {
            console.log("bottom trigger")
            
            if (!isRendering.current) {
                console.log("coordinates is changing")
                
                setCoordinates((prev) => {
                    console.log(prev, "previous")
                    console.log(shiftCoordinates({ maxEnd: dataAmount.current, coordinates: prev, shift:  DOCUMENTS_RENDER_LIMIT  }))
                    return shiftCoordinates({ maxEnd: dataAmount.current, coordinates: prev, shift:  DOCUMENTS_RENDER_LIMIT  })});
            }
        });

        documentEventEmitter.on('topRefTriggered', () => {
            console.log("top trigger")
            if (!isRendering.current) {
                console.log("coordinates is changing")
                setCoordinates((prev) => shiftCoordinates({  maxEnd: dataAmount.current, coordinates: prev, shift:  -1 * DOCUMENTS_RENDER_LIMIT  }));
                
            }
        });

        documentEventEmitter.on('documentsRerendered', () => {
            isRendering.current = false;
        })
        return ()=>{
            documentEventEmitter.unsubscribe("sortDocuments")
            documentEventEmitter.unsubscribe("bottomRefTriggered")
            documentEventEmitter.unsubscribe("topRefTriggered")
            documentEventEmitter.unsubscribe("documentsRerendered")
        }
    }, []);

    useEffect(() => {
        console.log("coordinates changed", coordinates.end, coordinates.start)
        isRendering.current = true;
        const request: DataRequest  = {
            request: "fetchData",
            body:{
                coordinates:{
                    start: coordinates.start,
                    end: coordinates.end
                },
                sorting:{
                    key: sorter.key,
                    isAscending: sorter.isAscending
                }
            }
        }
        callBack(request)
    }, [coordinates.end, coordinates.start]);

    // return {documents, documentsAmount: documentDataHandler.allData ? documentDataHandler.allData.length : null, sortDocuments, coordinates, isRendering}
    return {documents, coordinates, isRendering}
}
