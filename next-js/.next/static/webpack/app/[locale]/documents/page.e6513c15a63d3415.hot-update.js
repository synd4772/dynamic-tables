"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/[locale]/documents/page",{

/***/ "(app-pages-browser)/./src/app/[locale]/documents/useData.ts":
/*!***********************************************!*\
  !*** ./src/app/[locale]/documents/useData.ts ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useData: function() { return /* binding */ useData; }\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/documentEventEmitter */ \"(app-pages-browser)/./src/app/lib/documentEventEmitter.ts\");\n/* harmony import */ var _app_utils_shiftCoordinates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/utils/shiftCoordinates */ \"(app-pages-browser)/./src/app/utils/shiftCoordinates.ts\");\n/* harmony import */ var _app_lib_documentDataRequestHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/lib/documentDataRequestHandler */ \"(app-pages-browser)/./src/app/lib/documentDataRequestHandler.ts\");\n\n\n\n\nconst DOCUMENTS_RENDER_LIMIT = 100;\nconst INIT_COORDINATES = {\n    start: 0,\n    end: 5 * DOCUMENTS_RENDER_LIMIT\n};\nconst useData = ()=>{\n    const getData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(_app_lib_documentDataRequestHandler__WEBPACK_IMPORTED_MODULE_3__.clientDataRequestHandler.fetchDocumentsData, []);\n    const deleteRecord = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(_app_lib_documentDataRequestHandler__WEBPACK_IMPORTED_MODULE_3__.clientDataRequestHandler.deleteRecord, []);\n    const [coordinates, setCoordinates] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(INIT_COORDINATES);\n    const [documents, setDocuments] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n    const [sorter, setSorter] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({\n        key: \"id\",\n        isAscending: true\n    });\n    const isRendering = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);\n    const isFetching = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);\n    const dataAmount = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(-1);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.on(\"dataFetched\", (jsonData)=>{\n            dataAmount.current = jsonData.length;\n            setDocuments(()=>jsonData.data);\n            isFetching.current = false;\n        });\n        return ()=>{\n            _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.unsubscribe(\"dataFetched\");\n        };\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (documents) {\n            _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.emit(\"documentsUpdated\", {\n                documents,\n                indexStart: coordinates.start\n            });\n        }\n    }, [\n        documents\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (dataAmount.current != -1) {\n            const sortRequest = {\n                request: \"fetchData\",\n                body: {\n                    coordinates: coordinates,\n                    sorting: {\n                        key: sorter.key,\n                        isAscending: sorter.isAscending\n                    }\n                }\n            };\n            getData(sortRequest);\n        }\n    }, [\n        sorter.isAscending,\n        sorter.key\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        //@ts-expect-error: asdasdasd\n        _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.on(\"sortDocuments\", (param)=>{\n            let { key, isAscending: isAscending } = param;\n            isRendering.current = true;\n            setSorter({\n                key,\n                isAscending\n            });\n        });\n        _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.on(\"bottomRefTriggered\", ()=>{\n            if (!isRendering.current) {\n                setCoordinates((prev)=>(0,_app_utils_shiftCoordinates__WEBPACK_IMPORTED_MODULE_2__.shiftCoordinates)({\n                        maxEnd: dataAmount.current,\n                        coordinates: prev,\n                        shift: DOCUMENTS_RENDER_LIMIT\n                    }));\n            }\n        });\n        _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.on(\"topRefTriggered\", ()=>{\n            if (!isRendering.current) {\n                setCoordinates((prev)=>{\n                    return {\n                        start: prev.start,\n                        end: prev.end\n                    };\n                });\n            }\n        });\n        _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.on(\"documentDelete\", (id)=>{\n            if (!isRendering.current) {\n                deleteRecord(id);\n            }\n        });\n        _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.on(\"updateCurrentDocuments\", ()=>{\n            if (!isRendering.current) {\n                console.log(12333);\n                setCoordinates((prev)=>(0,_app_utils_shiftCoordinates__WEBPACK_IMPORTED_MODULE_2__.shiftCoordinates)({\n                        maxEnd: dataAmount.current,\n                        coordinates: prev,\n                        shift: 0\n                    }));\n            }\n        });\n        _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.on(\"documentsRerendered\", ()=>{\n            isRendering.current = false;\n        });\n        return ()=>{\n            _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.unsubscribe(\"sortDocuments\");\n            _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.unsubscribe(\"bottomRefTriggered\");\n            _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.unsubscribe(\"topRefTriggered\");\n            _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.unsubscribe(\"documentsRerendered\");\n            _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.unsubscribe(\"updateCurrentDocuments\");\n            _lib_documentEventEmitter__WEBPACK_IMPORTED_MODULE_1__.documentEventEmitter.unsubscribe(\"documentDelete\");\n        };\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        isRendering.current = true;\n        const request = {\n            request: \"fetchData\",\n            body: {\n                coordinates: {\n                    start: coordinates.start,\n                    end: coordinates.end\n                },\n                sorting: {\n                    key: sorter.key,\n                    isAscending: sorter.isAscending\n                }\n            }\n        };\n        getData(request);\n    }, [\n        coordinates.end,\n        coordinates.start\n    ]);\n    // return {documents, documentsAmount: documentDataHandler.allData ? documentDataHandler.allData.length : null, sortDocuments, coordinates, isRendering}\n    return {\n        documents,\n        coordinates,\n        isRendering\n    };\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvW2xvY2FsZV0vZG9jdW1lbnRzL3VzZURhdGEudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ2lFO0FBQ0s7QUFDTztBQUNHO0FBRWhGLE1BQU1PLHlCQUF5QjtBQUUvQixNQUFNQyxtQkFBZ0M7SUFDcENDLE9BQU87SUFDUEMsS0FBSyxJQUFJSDtBQUNYO0FBT08sTUFBTUksVUFBVTtJQUNuQixNQUFNQyxVQUFVWixrREFBV0EsQ0FBQ00seUZBQXdCQSxDQUFDTyxrQkFBa0IsRUFBRSxFQUFFO0lBQzNFLE1BQU1DLGVBQWVkLGtEQUFXQSxDQUFDTSx5RkFBd0JBLENBQUNRLFlBQVksRUFBRSxFQUFFO0lBQzFFLE1BQU0sQ0FBQ0MsYUFBYUMsZUFBZSxHQUFHYiwrQ0FBUUEsQ0FBY0s7SUFFNUQsTUFBTSxDQUFDUyxXQUFXQyxhQUFhLEdBQUdmLCtDQUFRQSxDQUFhLEVBQUU7SUFFekQsTUFBTSxDQUFDZ0IsUUFBUUMsVUFBVSxHQUFHakIsK0NBQVFBLENBQWdEO1FBQUVrQixLQUFLO1FBQU1DLGFBQWE7SUFBSztJQUVuSCxNQUFNQyxjQUFjckIsNkNBQU1BLENBQUM7SUFDM0IsTUFBTXNCLGFBQWF0Qiw2Q0FBTUEsQ0FBQztJQUMxQixNQUFNdUIsYUFBYXZCLDZDQUFNQSxDQUFDLENBQUM7SUFFM0JELGdEQUFTQSxDQUFDO1FBQ05HLDJFQUFvQkEsQ0FBQ3NCLEVBQUUsQ0FBQyxlQUFlLENBQUNDO1lBQ3BDRixXQUFXRyxPQUFPLEdBQUcsU0FBeUJDLE1BQU07WUFDcERYLGFBQWEsSUFBTSxTQUE2QlksSUFBSTtZQUNwRE4sV0FBV0ksT0FBTyxHQUFHO1FBQ3pCO1FBQ0EsT0FBTztZQUNIeEIsMkVBQW9CQSxDQUFDMkIsV0FBVyxDQUFDO1FBQ3JDO0lBQ0osR0FBRyxFQUFFO0lBRUw5QixnREFBU0EsQ0FBQztRQUNOLElBQUlnQixXQUFXO1lBQ1hiLDJFQUFvQkEsQ0FBQzRCLElBQUksQ0FBQyxvQkFBb0I7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QUFXO0FBQy9DLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9bbG9jYWxlXS9kb2N1bWVudHMvdXNlRGF0YS50cz9jNWExIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvY3VtZW50LCBEZWZhdWx0SGVhZGVycywgRGF0YVJlcXVlc3QgLCBEZWZhdWx0TWVzc2FnZX0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL3NoYXJlZC90eXBlcy9kb2N1bWVudHMudHlwZXNcIlxuaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZG9jdW1lbnRFdmVudEVtaXR0ZXIgfSBmcm9tIFwiLi4vLi4vbGliL2RvY3VtZW50RXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgeyBDb29yZGluYXRlcywgc2hpZnRDb29yZGluYXRlcyB9IGZyb20gXCJAL2FwcC91dGlscy9zaGlmdENvb3JkaW5hdGVzXCI7XG5pbXBvcnQgeyBjbGllbnREYXRhUmVxdWVzdEhhbmRsZXIgfSBmcm9tIFwiQC9hcHAvbGliL2RvY3VtZW50RGF0YVJlcXVlc3RIYW5kbGVyXCI7XG5cbmNvbnN0IERPQ1VNRU5UU19SRU5ERVJfTElNSVQgPSAxMDA7XG5cbmNvbnN0IElOSVRfQ09PUkRJTkFURVM6IENvb3JkaW5hdGVzID0ge1xuICBzdGFydDogMCxcbiAgZW5kOiA1ICogRE9DVU1FTlRTX1JFTkRFUl9MSU1JVCxcbn07XG5cbnR5cGUgTGFzdFJlc3BvbnNlID0ge1xuICAgIHJlYWR5OmJvb2xlYW4sXG4gICAgZG9jdW1lbnRBbW91bnQ6IG51bWJlclxufVxuXG5leHBvcnQgY29uc3QgdXNlRGF0YSA9ICgpID0+IHtcbiAgICBjb25zdCBnZXREYXRhID0gdXNlQ2FsbGJhY2soY2xpZW50RGF0YVJlcXVlc3RIYW5kbGVyLmZldGNoRG9jdW1lbnRzRGF0YSwgW10pO1xuICAgIGNvbnN0IGRlbGV0ZVJlY29yZCA9IHVzZUNhbGxiYWNrKGNsaWVudERhdGFSZXF1ZXN0SGFuZGxlci5kZWxldGVSZWNvcmQsIFtdKTtcbiAgICBjb25zdCBbY29vcmRpbmF0ZXMsIHNldENvb3JkaW5hdGVzXSA9IHVzZVN0YXRlPENvb3JkaW5hdGVzPihJTklUX0NPT1JESU5BVEVTKTtcblxuICAgIGNvbnN0IFtkb2N1bWVudHMsIHNldERvY3VtZW50c10gPSB1c2VTdGF0ZTxEb2N1bWVudFtdPihbXSk7XG5cbiAgICBjb25zdCBbc29ydGVyLCBzZXRTb3J0ZXJdID0gdXNlU3RhdGU8eyBrZXk6IERlZmF1bHRIZWFkZXJzLCBpc0FzY2VuZGluZzogYm9vbGVhbn0+KCB7IGtleTogJ2lkJywgaXNBc2NlbmRpbmc6IHRydWUgfSk7XG5cbiAgICBjb25zdCBpc1JlbmRlcmluZyA9IHVzZVJlZihmYWxzZSk7XG4gICAgY29uc3QgaXNGZXRjaGluZyA9IHVzZVJlZihmYWxzZSk7XG4gICAgY29uc3QgZGF0YUFtb3VudCA9IHVzZVJlZigtMSlcblxuICAgIHVzZUVmZmVjdCgoKT0+e1xuICAgICAgICBkb2N1bWVudEV2ZW50RW1pdHRlci5vbihcImRhdGFGZXRjaGVkXCIsIChqc29uRGF0YSk9PntcbiAgICAgICAgICAgIGRhdGFBbW91bnQuY3VycmVudCA9IChqc29uRGF0YSBhcyBEb2N1bWVudFtdKS5sZW5ndGg7XG4gICAgICAgICAgICBzZXREb2N1bWVudHMoKCkgPT4gKGpzb25EYXRhIGFzIERlZmF1bHRNZXNzYWdlKS5kYXRhIGFzIERvY3VtZW50W10pO1xuICAgICAgICAgICAgaXNGZXRjaGluZy5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiAoKT0+e1xuICAgICAgICAgICAgZG9jdW1lbnRFdmVudEVtaXR0ZXIudW5zdWJzY3JpYmUoXCJkYXRhRmV0Y2hlZFwiKVxuICAgICAgICB9XG4gICAgfSwgW10pXG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoZG9jdW1lbnRzKSB7XG4gICAgICAgICAgICBkb2N1bWVudEV2ZW50RW1pdHRlci5lbWl0KCdkb2N1bWVudHNVcGRhdGVkJywge2RvY3VtZW50cywgaW5kZXhTdGFydDogY29vcmRpbmF0ZXMuc3RhcnR9KTtcbiAgICAgICAgfVxuICAgIH0sIFtkb2N1bWVudHNdKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmKGRhdGFBbW91bnQuY3VycmVudCAhPSAtMSl7XG4gICAgICAgICAgICBjb25zdCBzb3J0UmVxdWVzdDogRGF0YVJlcXVlc3QgPSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdDogXCJmZXRjaERhdGFcIixcbiAgICAgICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgICAgICAgIGNvb3JkaW5hdGVzOiBjb29yZGluYXRlcyxcbiAgICAgICAgICAgICAgICAgICAgc29ydGluZzoge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBzb3J0ZXIua2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBc2NlbmRpbmc6IHNvcnRlci5pc0FzY2VuZGluZ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2V0RGF0YShzb3J0UmVxdWVzdClcbiAgICAgICAgfVxuICAgIH0sIFtzb3J0ZXIuaXNBc2NlbmRpbmcsIHNvcnRlci5rZXldKVxuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgLy9AdHMtZXhwZWN0LWVycm9yOiBhc2Rhc2Rhc2RcbiAgICAgICAgZG9jdW1lbnRFdmVudEVtaXR0ZXIub24oJ3NvcnREb2N1bWVudHMnLCAoe2tleSwgaXNBc2NlbmRpbmc6IGlzQXNjZW5kaW5nfSkgPT4ge1xuICAgICAgICAgICAgaXNSZW5kZXJpbmcuY3VycmVudCA9IHRydWVcbiAgICAgICAgICAgIHNldFNvcnRlcih7IGtleSwgaXNBc2NlbmRpbmcgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnRFdmVudEVtaXR0ZXIub24oJ2JvdHRvbVJlZlRyaWdnZXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghaXNSZW5kZXJpbmcuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHNldENvb3JkaW5hdGVzKChwcmV2KSA9PiBzaGlmdENvb3JkaW5hdGVzKHsgbWF4RW5kOiBkYXRhQW1vdW50LmN1cnJlbnQsIGNvb3JkaW5hdGVzOiBwcmV2LCBzaGlmdDogIERPQ1VNRU5UU19SRU5ERVJfTElNSVQgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnRFdmVudEVtaXR0ZXIub24oJ3RvcFJlZlRyaWdnZXJlZCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghaXNSZW5kZXJpbmcuY3VycmVudCkge1xuICAgICAgICAgICAgICAgIHNldENvb3JkaW5hdGVzKChwcmV2KSA9PiB7cmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IHByZXYuc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogcHJldi5lbmR9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRvY3VtZW50RXZlbnRFbWl0dGVyLm9uKCdkb2N1bWVudERlbGV0ZScsIChpZCkgPT57XG4gICAgICAgICAgICBpZighaXNSZW5kZXJpbmcuY3VycmVudCl7XG4gICAgICAgICAgICAgICAgZGVsZXRlUmVjb3JkKGlkIGFzIG51bWJlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgZG9jdW1lbnRFdmVudEVtaXR0ZXIub24oXCJ1cGRhdGVDdXJyZW50RG9jdW1lbnRzXCIsICgpPT57XG4gICAgICAgICAgICBpZighaXNSZW5kZXJpbmcuY3VycmVudCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coMTIzMzMpXG4gICAgICAgICAgICAgICAgc2V0Q29vcmRpbmF0ZXMoKHByZXYpID0+IHNoaWZ0Q29vcmRpbmF0ZXMoeyBtYXhFbmQ6IGRhdGFBbW91bnQuY3VycmVudCwgY29vcmRpbmF0ZXM6IHByZXYsIHNoaWZ0OiAgMCAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGRvY3VtZW50RXZlbnRFbWl0dGVyLm9uKCdkb2N1bWVudHNSZXJlbmRlcmVkJywgKCkgPT4ge1xuICAgICAgICAgICAgaXNSZW5kZXJpbmcuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gKCk9PntcbiAgICAgICAgICAgIGRvY3VtZW50RXZlbnRFbWl0dGVyLnVuc3Vic2NyaWJlKFwic29ydERvY3VtZW50c1wiKVxuICAgICAgICAgICAgZG9jdW1lbnRFdmVudEVtaXR0ZXIudW5zdWJzY3JpYmUoXCJib3R0b21SZWZUcmlnZ2VyZWRcIilcbiAgICAgICAgICAgIGRvY3VtZW50RXZlbnRFbWl0dGVyLnVuc3Vic2NyaWJlKFwidG9wUmVmVHJpZ2dlcmVkXCIpXG4gICAgICAgICAgICBkb2N1bWVudEV2ZW50RW1pdHRlci51bnN1YnNjcmliZShcImRvY3VtZW50c1JlcmVuZGVyZWRcIilcbiAgICAgICAgICAgIGRvY3VtZW50RXZlbnRFbWl0dGVyLnVuc3Vic2NyaWJlKFwidXBkYXRlQ3VycmVudERvY3VtZW50c1wiKVxuICAgICAgICAgICAgZG9jdW1lbnRFdmVudEVtaXR0ZXIudW5zdWJzY3JpYmUoXCJkb2N1bWVudERlbGV0ZVwiKVxuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaXNSZW5kZXJpbmcuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGNvbnN0IHJlcXVlc3Q6IERhdGFSZXF1ZXN0ICA9IHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IFwiZmV0Y2hEYXRhXCIsXG4gICAgICAgICAgICBib2R5OntcbiAgICAgICAgICAgICAgICBjb29yZGluYXRlczp7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBjb29yZGluYXRlcy5zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiBjb29yZGluYXRlcy5lbmRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNvcnRpbmc6e1xuICAgICAgICAgICAgICAgICAgICBrZXk6IHNvcnRlci5rZXksXG4gICAgICAgICAgICAgICAgICAgIGlzQXNjZW5kaW5nOiBzb3J0ZXIuaXNBc2NlbmRpbmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ2V0RGF0YShyZXF1ZXN0KVxuICAgIH0sIFtjb29yZGluYXRlcy5lbmQsIGNvb3JkaW5hdGVzLnN0YXJ0XSk7XG5cbiAgICAvLyByZXR1cm4ge2RvY3VtZW50cywgZG9jdW1lbnRzQW1vdW50OiBkb2N1bWVudERhdGFIYW5kbGVyLmFsbERhdGEgPyBkb2N1bWVudERhdGFIYW5kbGVyLmFsbERhdGEubGVuZ3RoIDogbnVsbCwgc29ydERvY3VtZW50cywgY29vcmRpbmF0ZXMsIGlzUmVuZGVyaW5nfVxuICAgIHJldHVybiB7ZG9jdW1lbnRzLCBjb29yZGluYXRlcywgaXNSZW5kZXJpbmd9XG59XG4iXSwibmFtZXMiOlsidXNlQ2FsbGJhY2siLCJ1c2VFZmZlY3QiLCJ1c2VSZWYiLCJ1c2VTdGF0ZSIsImRvY3VtZW50RXZlbnRFbWl0dGVyIiwic2hpZnRDb29yZGluYXRlcyIsImNsaWVudERhdGFSZXF1ZXN0SGFuZGxlciIsIkRPQ1VNRU5UU19SRU5ERVJfTElNSVQiLCJJTklUX0NPT1JESU5BVEVTIiwic3RhcnQiLCJlbmQiLCJ1c2VEYXRhIiwiZ2V0RGF0YSIsImZldGNoRG9jdW1lbnRzRGF0YSIsImRlbGV0ZVJlY29yZCIsImNvb3JkaW5hdGVzIiwic2V0Q29vcmRpbmF0ZXMiLCJkb2N1bWVudHMiLCJzZXREb2N1bWVudHMiLCJzb3J0ZXIiLCJzZXRTb3J0ZXIiLCJrZXkiLCJpc0FzY2VuZGluZyIsImlzUmVuZGVyaW5nIiwiaXNGZXRjaGluZyIsImRhdGFBbW91bnQiLCJvbiIsImpzb25EYXRhIiwiY3VycmVudCIsImxlbmd0aCIsImRhdGEiLCJ1bnN1YnNjcmliZSIsImVtaXQiLCJpbmRleFN0YXJ0Iiwic29ydFJlcXVlc3QiLCJyZXF1ZXN0IiwiYm9keSIsInNvcnRpbmciLCJwcmV2IiwibWF4RW5kIiwic2hpZnQiLCJpZCIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/[locale]/documents/useData.ts\n"));

/***/ })

});