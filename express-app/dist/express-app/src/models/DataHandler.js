"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataHandler = void 0;
const documents_types_1 = require("../../../next/src/app/[locale]/documents/documents.types");
const serverEmitter_service_1 = require("../services/serverEmitter.service");
class DataHandler {
    constructor() {
        this.cachedSortedData = Object.assign({}, documents_types_1.INIT_CACHED_SORTED_DATA);
        this._allData = [];
        this.isAllDataFetched = false;
        serverEmitter_service_1.eventEmitter.on("isAllDataFetched", () => {
            this.isAllDataFetched = true;
        });
    }
    set allData(data) {
        this._allData = data;
    }
    get allData() {
        return this._allData;
    }
    pushData(data) {
        this.allData.push(...data);
        serverEmitter_service_1.eventEmitter.emit("documentsAmountChanged", this._allData.length);
    }
    processData() {
        if (this._allData.length) {
            for (const property in this.cachedSortedData) {
                const key = property;
                const ascendingIndexes = this.sortByKey(key);
                const descendingIndexes = ascendingIndexes.slice().reverse();
                this.cachedSortedData[key].ascending = ascendingIndexes;
                this.cachedSortedData[key].notAscending = descendingIndexes;
            }
            return true;
        }
        return false;
    }
    sortByKey(key) {
        const sortedData = this.allData.slice().sort((_a, _b) => {
            const [a, b] = [_a, _b];
            if (typeof a[key] === 'string' && typeof b[key] === 'string') {
                return a[key].localeCompare(b[key]);
            }
            //@ts-expect-error: dsaa
            return a[key] - b[key];
        });
        const ascendingIndexes = sortedData.map((element) => element.id - 1);
        return ascendingIndexes;
    }
    isAllDataCached() {
        for (const prop in this.cachedSortedData) {
            const key = prop;
            if (!this.cachedSortedData[key]["ascending"].length && !this.cachedSortedData[key]["notAscending"].length) {
                return false;
            }
        }
        return true;
    }
    isSortedIndexesCached({ key, isAscending }) {
        const keyObject = isAscending ? "ascending" : "notAscending";
        if (this.cachedSortedData[key][keyObject].length)
            return true;
        return false;
    }
    getCachedData({ key, isAscending, start = -1, end = -1 }) {
        const keyObject = isAscending ? "ascending" : "notAscending";
        const obj = this.cachedSortedData[key][keyObject];
        const cachedDataIds = start === -1 && end === -1 ? obj : obj.slice(start, end);
        console.time("backend sorting");
        const data = [];
        if (!this.isSortedIndexesCached({ key, isAscending }))
            return [];
        cachedDataIds.forEach((element) => {
            data.push(this._allData[element]);
        });
        console.timeEnd("backend sorting");
        return data;
    }
}
exports.DataHandler = DataHandler;
