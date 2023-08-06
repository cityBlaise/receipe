/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { useAppContext } from "../../services/AppContext";

export default function QuantityCal() {
    const c = useAppContext();
    useEffect(() => {
        // console.log(c?.data)
      }, [c?.recipe])
    return (
        <section className='font-semibold px-2 gap-2 font-roboto text-xl  grid grid-flow-col py-1 relative'> 
            <div className="bg-slate-50 px-0 text-center py-3 rounded-full border-1 border-white tracking-widest">{c?.recipe.kcal} kcal</div>
            <div className="bg-slate-50 px-0 text-center py-3 rounded-full border-1 border-white">{c?.recipe.amountOfPeople} person</div>
        </section>
    )
}