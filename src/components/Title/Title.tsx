/* eslint-disable prettier/prettier */
import { useState, useRef, useLayoutEffect } from "react";
import { useAppContext } from "../../services/AppContext";
import { changeText } from "../../services/Title.service";
export default function Title() {


const [name, setName] = useState<string | undefined>()
const parent = useRef<HTMLSelectElement>(null);
const title = useRef<HTMLDivElement>(null)
let interval = useRef<{ data: NodeJS.Timer | null }>({ data: null });
const c = useAppContext();
useLayoutEffect(() => {
  if (interval.current.data!==null){
    // console.log(`clear ${interval.current.data}`)
    clearInterval(interval.current.data)
  }

  if (name === undefined)
    setName(c?.recipe!.name)
  else
    changeText(c?.recipe.name!, title.current!, setName, interval)
}, [c?.recipe])
  return (
    <div
      className="text-white/90 text-center  text-2xl h-[60px] 
    font-biber"
    style={{background:`hsl(${c?.recipe.color},95%,70%)`,transition:`background ease 00ms`}}
    >
      <section ref={parent} className="h-full relative overflow-hidden">
        <div ref={title} className="grid place-items-center uppercase transition-transform delay-200 duration-1000 ease-in-out h-full w-full ">
          {name}
        </div>
      </section>
    </div>
  );
}
