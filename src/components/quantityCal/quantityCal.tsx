/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { useAppContext } from "../../services/AppContext";

export default function QuantityCal() {
    const c = useAppContext();
    useEffect(() => {
        // console.log(c?.data)
      }, [c?.recipe])
    return (
        <section className='px-2 gap-2 font-roboto text-xl  grid grid-flow-col py-1 relative'> 
            <div className="bg-slate-50 px-0 text-center py-3 rounded-full border-1 border-white tracking-widest">300kcal</div>
            <div className="bg-slate-50 px-0 text-center py-3 rounded-full border-1 border-white">1-4 person</div>
        </section>
    )
}