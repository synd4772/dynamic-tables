"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INIT_CACHED_SORTED_DATA = exports.DefaultHeaders = exports.INIT_CACHED_SORTED_DATA_VALUE = exports.DocumentState = exports.HeaderName = exports.DocumentFieldName = void 0;
exports.DocumentFieldName = {
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
};
exports.HeaderName = Object.assign(Object.assign({ index: "index", select: "select" }, exports.DocumentFieldName), { actions: "actions" });
exports.DocumentState = {
    submitted: 'SUBMITTED',
    inProgress: 'IN_PROCESS',
    additionalReview: 'ADDITIONAL_REVIEW',
    reviewCompleted: 'REVIEW_COMPLETED',
    invalid: 'INVALID',
};
exports.INIT_CACHED_SORTED_DATA_VALUE = {
    ascending: [],
    notAscending: []
};
exports.DefaultHeaders = [
    exports.HeaderName.index,
    exports.HeaderName.id,
    exports.HeaderName.state,
    exports.HeaderName.stateTime,
    exports.HeaderName.documentName,
    exports.HeaderName.documentNumber,
    exports.HeaderName.documentDate,
    exports.HeaderName.documentTotalAmount,
];
exports.INIT_CACHED_SORTED_DATA = {
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
};
