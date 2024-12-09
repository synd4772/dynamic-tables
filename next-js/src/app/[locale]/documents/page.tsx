'use client';

import "./documents.css";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useData } from "./useData";
import { PageProps } from "../types";
import { DefaultHeaders } from "../../../../../shared/types/documents.types";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useIntersectionObservers } from "./useIntersectionObservers";
import { documentEventEmitter } from "../../lib/documentEventEmitter";

interface TableStatProps{
    params: {
        locale: string
      },
      setHeaderRendered: Dispatch<SetStateAction<boolean>>
}

function TableStatHeader({ params, setHeaderRendered }: TableStatProps){
    const [documentsAmount, setDocumentsAmount] = useState(0);


    const t = useTranslations('DocumentsPage');
    const { coordinates: coordintates } = useData();

    useEffect(()=>{
        setHeaderRendered(true)
    }, [])

    useEffect(()=>{
        documentEventEmitter.on("documentsAmountChanged", (amount)=>{
            setDocumentsAmount(amount as number);
        })
        return ()=>{
            documentEventEmitter.unsubscribe("documentsAmountChanged")
        }
    },[])

    return (
        <div className="header-container">
        <div className="page-header" >
          <Link style={{ paddingRight: 10, textDecoration: params.locale === "en" ? "underline" : "none" }} href={'/documents'} locale="en" >EN</Link>
          <Link style={{ paddingRight: 10, textDecoration: params.locale === "ru" ? "underline" : "none" }} href={'/documents'} locale="ru">RU</Link>
        </div>
        <div className="info-block">
          <span className="info-block-item">{t("rendered", { amount: documentsAmount ? (documentsAmount > 0 ? coordintates.end - coordintates.start : 0) : "loading..."})}</span>
          <span className="info-block-item">{t("allDocuments", { amount: documentsAmount != 0 ? documentsAmount : "loading..."})}</span>
          <span className="info-block-item">{t("start", { start: coordintates.start })}</span>
          <span className="info-block-item">{t("end", { end: coordintates.end })}</span>
        </div>
        
      </div>
    )
}

function SortInput(){
    return (
        <div className={"sort-input-container"}>
            <input className={"sort-input"} name={"sortInput"} type="text"/>
        </div>
        
    )
}

export default function Page({ params }: PageProps) {
    const [isHeaderRendered, setHeaderRendered] = useState(false);
    const pageRef = useRef<HTMLDivElement>(null);
    const { topObserver, bottomObserver } = useIntersectionObservers(pageRef.current);
  
    return (
        <div ref={pageRef} className="page">
            
            <TableStatHeader params={params} setHeaderRendered={setHeaderRendered}/>
            <SortInput/>
            <div className="table-container">
            { isHeaderRendered && (
                <table className="table">
                <thead>
                    <TableHeader headers={DefaultHeaders} />
                </thead>
                <TableBody bottomObserver={bottomObserver} topObserver={topObserver} headers={DefaultHeaders} />
                </table>
            )
            }
        </div>
        </div>
    )
}


