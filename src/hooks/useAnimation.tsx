import { useState, useRef, useEffect } from "react";

export const useScrollAnimation = (option = {}) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(()=>{
        const observer = new IntersectionObserver(
            ([entry]) => {
                if(entry.isIntersecting){
                    setIsVisible(true)
                }
            },
            {
                threshold: 0.2,
                ...option
            }
        );

        const currentElement = elementRef.current;
        if(currentElement){
            observer.observe(currentElement);
        }
        return ()=>{
            if(currentElement){
                observer.unobserve(currentElement)
            }
        }
    }, [])

    return {elementRef, isVisible}
}