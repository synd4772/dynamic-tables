import { useEffect, useRef } from "react"
import { documentEventEmitter } from "../../lib/documentEventEmitter";

export const useIntersectionObservers = (rootRef: HTMLDivElement | null ) => {
  const topObserver = useRef<IntersectionObserver|null>(null);
  const bottomObserver = useRef<IntersectionObserver|null>(null);

  useEffect(() => {
    if (rootRef) {
      const options = {
        root: rootRef,
      }

      topObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          documentEventEmitter.emit('topRefTriggered', true)
        }
        console.log('entries', entries[0].isIntersecting,  entries[0].target)

      }, options);
  
      bottomObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          documentEventEmitter.emit('bottomRefTriggered', entries[0].isIntersecting)
        }
        console.log('entries',  entries[0].isIntersecting,  entries[0].target)
      }, options)
    }
  }, [rootRef]);

  return { topObserver, bottomObserver }
}