export const DocumentFieldName = {
  id: "id",
  state: "state",
  stateTime: "stateTime",
  documentNumber: "documentNumber",
  documentName: "documentName",
  documentDate: "documentDate",
  documentTotalAmount: "documentTotalAmount",
  eligibleAmount: "eligibleAmount",
  version: "version",
  eligiblePercentage: "eligiblePercentage",
} as const;
export type DocumentFieldName = (typeof DocumentFieldName[keyof typeof DocumentFieldName])

export const HeaderName = {
  index: "index",
  select: "select",
  ...DocumentFieldName,
  actions: "actions"
} as const;

export type HeaderName = (typeof HeaderName[keyof typeof HeaderName])

export const DocumentState = {
  submitted: 'SUBMITTED',
  inProgress: 'IN_PROCESS',
  additionalReview: 'ADDITIONAL_REVIEW',
  reviewCompleted: 'REVIEW_COMPLETED',
  invalid: 'INVALID',
} as const;

export type DocumentState = typeof DocumentState[keyof typeof DocumentState];

export interface Document {
  id: number;
  state: DocumentState;
  documentNumber: string;
  documentName: string;
  documentDate: string;
  documentTotalAmount: number;
  stateTime: string;
  eligibleAmount: number;
  version: number;
  eligiblePercentage: number;
}

export type CachedSortedDataValue = {
    ascending: number[],
    notAscending: number[]
}

export const INIT_CACHED_SORTED_DATA_VALUE: CachedSortedDataValue = {
    ascending: [],
    notAscending: []
} 



  

export type CachedSortedDataKeys = keyof typeof DocumentFieldName;

export type CachedSortedData = {
    [K in DefaultHeaders]: typeof INIT_CACHED_SORTED_DATA_VALUE
}

export type DefaultHeaders = "id" | "state" | "stateTime" | "documentNumber" | "documentName" | "documentDate" | "documentTotalAmount"

export const DefaultHeaders = [
    HeaderName.index,
    HeaderName.id,
    HeaderName.state,
    HeaderName.stateTime,
    HeaderName.documentName,
    HeaderName.documentNumber,
    HeaderName.documentDate,
    HeaderName.documentTotalAmount,
  ] as DefaultHeaders[];

export const INIT_CACHED_SORTED_DATA: CachedSortedData = {
    id: {
        ascending: [],
        notAscending: []
    },
    state: {
        ascending: [],
        notAscending: []
    },
    stateTime: {
        ascending: [],
        notAscending: []
    },
    documentName: {
        ascending: [],
        notAscending: []
    },
    documentNumber: {
        ascending: [],
        notAscending: []
    },
    documentDate: {
        ascending: [],
        notAscending: []
    },
    documentTotalAmount: {
        ascending: [],
        notAscending: []
    }
}

export type Requests = "dataAmount" | "allData" | "isAllDataProcessed" | "fetchData"

export type DefaultRequest = {
    request: Requests
    body: object | null
}

export type SomeDataRequest = DefaultRequest & {body:null}


export type DataRequest = DefaultRequest & {body:{
    coordinates:{
        start: number,
        end: number
    }
    sorting: {
        key: DefaultHeaders,
        isAscending: boolean
    }
}}

export type DataAmountAnswer = {
    dataAmount: number
}
export type IsAllDataProcessedAnswer = {
    isAllDataProcessed: boolean
}

export type DefaultMessage = {
    data: unknown
}

export type DefaultDocumentsProps = {
    key: DefaultHeaders,
    isAscending: boolean,
    start: number,
    end: number
}


export type clientEvents = "documentsAmountChanged" | "documentsUpdated" | "fieldSortingAvailable" | "fetchIsCompleted" | "anotherDataFetched" | "firstDataFetched" | "sortDocuments" | "bottomRefTriggered" | "topRefTriggered" | "documentsRerendered"