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
    const getData = useCallback(clientDataRequestHandler.fetchDocumentsData, []);
    const deleteRecord = useCallback(clientDataRequestHandler.deleteRecord, []);
    const [coordinates, setCoordinates] = useState<Coordinates>(INIT_COORDINATES);

    const [documents, setDocuments] = useState<Document[]>([]);

    const [sorter, setSorter] = useState<{ key: DefaultHeaders, isAscending: boolean}>( { key: 'id', isAscending: true });
    const [updateFlag, setUpdateFlag] = useState(false);
    const isRendering = useRef(false);
    const isFetching = useRef(false);
    const dataAmount = useRef(-1)

    useEffect(()=>{
        documentEventEmitter.on("dataFetched", (jsonData)=>{
            dataAmount.current = (jsonData as Document[]).length;
            setDocuments(() => (jsonData as DefaultMessage).data as Document[]);
            isFetching.current = false;
        })
        return ()=>{
            documentEventEmitter.unsubscribe("dataFetched")
        }
    }, [])

    useEffect(() => {
        if (documents) {
            documentEventEmitter.emit('documentsUpdated', {documents, indexStart: coordinates.start});
        }
    }, [documents]);

    useEffect(() => {
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
            getData(sortRequest)
        }
    }, [sorter.isAscending, sorter.key])

    useEffect(() => {
        //@ts-expect-error: asdasdasd
        documentEventEmitter.on('sortDocuments', ({key, isAscending: isAscending}) => {
            isRendering.current = true
            setSorter({ key, isAscending })
        });

        documentEventEmitter.on('bottomRefTriggered', () => {
            if (!isRendering.current) {
                setCoordinates((prev) => shiftCoordinates({ maxEnd: dataAmount.current, coordinates: prev, shift:  DOCUMENTS_RENDER_LIMIT  }));
            }
        });

        documentEventEmitter.on('topRefTriggered', () => {
            if (!isRendering.current) {
                setCoordinates((prev) => {return {
                    start: prev.start,
                    end: prev.end}
                });
            }
        });

        documentEventEmitter.on('documentDelete', (id) =>{
            if(!isRendering.current){
                deleteRecord(id as number);
            }
        })

        documentEventEmitter.on("updateCurrentDocuments", ()=>{
            if(!isRendering.current){
                console.log(12333)
                setUpdateFlag(prev=>!prev)
            }
        })

        documentEventEmitter.on('documentsRerendered', () => {
            isRendering.current = false;
        })
        return ()=>{
            documentEventEmitter.unsubscribe("sortDocuments")
            documentEventEmitter.unsubscribe("bottomRefTriggered")
            documentEventEmitter.unsubscribe("topRefTriggered")
            documentEventEmitter.unsubscribe("documentsRerendered")
            documentEventEmitter.unsubscribe("updateCurrentDocuments")
            documentEventEmitter.unsubscribe("documentDelete")
        }
    }, []);

    useEffect(() => {
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
        getData(request)
    }, [coordinates.end, coordinates.start]);
    useEffect(()=>{
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
        getData(request)
    }, [updateFlag])

    // return {documents, documentsAmount: documentDataHandler.allData ? documentDataHandler.allData.length : null, sortDocuments, coordinates, isRendering}
    return {documents, coordinates, isRendering}
}
