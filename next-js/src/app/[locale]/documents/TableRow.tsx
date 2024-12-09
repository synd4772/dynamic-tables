'use client';
import { forwardRef, LegacyRef, useRef } from "react";
import { HeaderName, Document } from "../../../../../shared/types/documents.types";
import { TableCell } from "./TableCell";
import { documentEventEmitter } from "@/app/lib/documentEventEmitter";

export const TableRow = forwardRef(({ document, headers, index, classes = '' }: TableRowProps, ref: LegacyRef<HTMLTableRowElement> ) => {
    const dee = useRef(documentEventEmitter);
  return (
    <tr ref={ref} key={document.id} id={`${document.id}`} className={classes}>
      {
        headers.map((header) => {
          let value;

          switch(header) {
            case HeaderName.index: {
              value = index + 1;
              break;
            }
            case HeaderName.select: {
              value = ' - '
              break;
            }
            case HeaderName.actions: {
              value = ' - '
              break;
            }
            
            default: {
              value = document[header];
            }
          }

          return (
            <TableCell value={value} key={`${document.id}-${header}`}/>
          )
        })
      }
      <td className={"test-td"}>
        <p onClick={()=>{
            console.log("delete")
            dee.current.emit("documentDelete", document.id)
            }} className={"delete"}>x</p>
        <p onClick={()=>{console.log("change", document.id)}} className={"change"}>w</p>
      </td>
    </tr>
  )
})

TableRow.displayName = 'TableRow';

interface TableRowProps {
  document: Document,
  headers:  HeaderName[], 
  index: number,
  classes?: string
} 
