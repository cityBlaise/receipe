/* eslint-disable prettier/prettier */
import { FaRedhat, } from "react-icons/fa6";
import { GoBookmark } from 'react-icons/go';
import { HiViewGrid, HiOutlineHome } from 'react-icons/hi';

export default function ScreenNav() {
    return (
        <div className="fixed bottom-1 -translate-y-1  left-1/2 -translate-x-1/2 bg-slate-900 grid grid-flow-col px-8 rounded-3xl py-3  gap-6 ">
            <HiViewGrid size={45} fill='white' className="cursor-pointer" />
            <GoBookmark size={45} fill='white' className="cursor-pointer" />
            <FaRedhat size={45} fill='white' className="cursor-pointer" />
            <HiOutlineHome size={45} stroke='white' className="cursor-pointer" />

        </div>
    )

}