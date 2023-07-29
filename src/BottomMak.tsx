/* eslint-disable prettier/prettier */
import React from 'react'
type props = React.PropsWithChildren<{
    className?: string;
}>;

export default function BottomMak({ children, className }: props) {
    return (
        <div className={className} >
            <div className="w-full h-full  ">
                {children}
            </div>
        </div>
    )
}
