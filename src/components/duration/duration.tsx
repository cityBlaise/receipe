/* eslint-disable prettier/prettier */
import { GoStar, GoThumbsup } from "react-icons/go";
import { useAppContext } from "../../services/AppContext";
import { useLayoutEffect, useRef, useState } from "react";
import { countTo } from "../../services/Title.service";
export default function Duration() {
  const [duration, setDuration] = useState<string | undefined>()
  const c = useAppContext();
  const count = useRef<HTMLSpanElement>(null) 
  let interval = useRef<{ data: NodeJS.Timer | null }>({ data: null }); 

  useLayoutEffect(() => {
    if (interval.current.data!==null) { 
      // console.log('clear interval');
      clearInterval(interval.current.data)
    } 
    if (duration === undefined)
      setDuration(c?.recipe.duration!.toString() )
    else
    countTo(c?.recipe.duration!, count.current!, setDuration,interval!,150)
  }, [c?.recipe])

  return (
    <section className="flex items-center justify-around gap-1 p-2 px-4 w-full overflow-x-hidden">
      <div className="order-last bg-slate-100 p-3 rounded-3xl grid gap-4">
        <GoThumbsup className="cursor-pointer" size={35} />
        <GoStar className="cursor-pointer" size={35} />
      </div>
      <div className="w-full flex-grow-0 p-4 items-center font-biber flex gap-1"  style={{fontSize:`70px`}}>
        <span  style={{fontSize:`70px`}} className="flex-grow-0" ref={count}>{duration}</span> <span>min</span>
      </div>
    </section>
  );
}
