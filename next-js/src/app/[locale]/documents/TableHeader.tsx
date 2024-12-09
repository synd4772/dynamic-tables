'use client';
import { useTranslations } from "next-intl";
import { DocumentFieldName, HeaderName } from "../../../../../shared/types/documents.types";
import { useState } from "react";
import { documentEventEmitter } from "../../lib/documentEventEmitter";

interface TableHeaderProps {
  headers: HeaderName[];
}


export const TableHeader = ({ headers }: TableHeaderProps) => {
  const t = useTranslations('DocumentsPage');

  const [sortedBy, setSortedBy] = useState<{header: HeaderName, isAscending: boolean}>({
    header: HeaderName.id,
    isAscending: true
  });



  const handleSort = (header: HeaderName) => {

        if (!(header in DocumentFieldName)) {
            return;
          }
          const isAscending = sortedBy.header === header? !sortedBy.isAscending: true;
          documentEventEmitter.emit('sortDocuments', { key: header, isAscending });
          setSortedBy(({
            header,
            isAscending
          }));
    
  };

  return (
    <tr>
      {
        headers.map((header) => {
          return (
            <th className={header in DocumentFieldName? `sortable`:''} key={header} onClick={() => handleSort(header)}>
              {t(`table.header.${header}`)}
              { sortedBy.header !== header 
                  ? ''
                  :  !sortedBy.isAscending 
                    ? ' ↑ ':' ↓ '}
            </th>
          )
        })
      }
    </tr>
  )
};