/* eslint-disable prettier/prettier */
import React, { useRef } from 'react'
const animOption: KeyframeAnimationOptions = {
    duration: 150, // The duration is 0 to move the element instantly without any delay
    fill: 'forwards',
    delay: 55,
    easing: 'ease'
}
type props = React.PropsWithChildren<{
    className?: string;
    reset?:(target:HTMLDivElement,offsetX:number)=>void
}>
function isMouseEvent(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): e is React.MouseEvent<HTMLDivElement> {
    return 'clientX' in e;
}
  const Moving: React.FC<props>= ({ children, className,reset }: props) =>{
    let dragElement = useRef<HTMLDivElement>(null)
    let offsetX: number, offsetY: number, isDragging = false;
    let clampedX=0,clampedY=0;

    function startDrag(e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
        isDragging = true;

        if (isMouseEvent(e)) {
            offsetX = e.clientX - dragElement.current!.getBoundingClientRect().left;
            offsetY = e.clientY - dragElement.current!.getBoundingClientRect().top;
        }
        else {
            console.log(offsetX)
            offsetX = e.touches[0].clientX - dragElement.current!.getBoundingClientRect().left;
            offsetY = e.touches[0].clientY - dragElement.current!.getBoundingClientRect().top;
        }
        // document.body.style.cursor = 'grab';
       dragElement.current!.style.cursor = 'grab';

        // Add event listeners to handle mousemove and mouseup events during drag 
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
    }

    function drag(e: MouseEvent | TouchEvent) {
        e.preventDefault()
        if (!isDragging) return;
        // Calcule la nouvelle position du drag
        let newX: number, newY: number;
        if (e instanceof MouseEvent) {
            newX = e.clientX - offsetX;
            newY = e.clientY - offsetY;
        }
        if (e instanceof TouchEvent) {
            newX = e.touches[0].clientX - offsetX;
            newY = e.touches[0].clientY - offsetY;
        }



        // Obtient la taille de la fenêtre
        const windowLeft = dragElement.current!.parentElement!.getBoundingClientRect().left;
        const windowTop = dragElement.current!.parentElement!.getBoundingClientRect().top;
        // Obtient la taille de la fenêtre
        const windowWidth = dragElement.current!.parentElement!.getBoundingClientRect().width;
        const windowHeight = dragElement.current!.parentElement!.getBoundingClientRect().height;

        // Obtient la taille de l'élément
        const elementWidth = dragElement.current!.getBoundingClientRect().width;
        const elementHeight = dragElement.current!.getBoundingClientRect().height;

        // Limite la position de l'élément pour éviter le débordement de la fenêtre
        const maxX = windowLeft + windowWidth - elementWidth;
        const maxY = windowTop + windowHeight - elementHeight;

        // Assure que la position du drag reste dans les limites de la fenêtre
        clampedX = Math.min(Math.max(newX!, windowLeft), maxX) - windowLeft - Math.round(dragElement.current!.offsetLeft);
        clampedY = Math.min(Math.max(newY!, windowTop), maxY) - Math.round(dragElement.current!.offsetTop + dragElement.current!.parentElement!.getBoundingClientRect().top);
        dragElement.current!.animate(
            [
                // { left: dragElement.current!.style.left, top: dragElement.current!.style.top },
                // { transform: `transalate(${dragElement.current!.style.transform.}px, ${clampedY}px` },
                { transform: `translate(${Math.round(clampedX)}px, ${Math.round(clampedY)}px)` }
            ],
            {
                duration: 10,
                fill: 'forwards',
                delay: 15,
            }
        );
    }
    function endDrag() {
        isDragging = false;
        // document.body.style.cursor = 'auto';
        dragElement.current!.style.cursor = 'auto';
        if( reset===undefined) 
        dragElement.current!.animate(
            [ 
                { transform: `translate(0)` }
            ],
            animOption
        )
        else
        reset(dragElement.current!,clampedX)
        // Remove the event listeners when the drag ends 
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', endDrag);
    }


    return (

        <div className={`cursor-grab inline-block ${className ?? ``}`} style={{ touchAction: `none` }}
            onMouseDown={startDrag}
            onTouchStart={startDrag}
            ref={dragElement}
        >
            {children}
        </div> 
    )
}

Moving.defaultProps={
    // reset:()=>console.log('bonjour')
}

export default Moving;