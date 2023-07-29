/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { GoDeviceCameraVideo } from "react-icons/go"; 
import { useAppContext } from "../../services/AppContext";
type state = {
  current: string;
  next?: string;
};
export default function Header() {
  const [text, setText] = useState<state>({
    current: "easy",
    next: "hard",
  });
  const parent = useRef<HTMLDivElement>(null);
  const [test, setTest] = useState(false);
  const c = useAppContext();
  useEffect(() => {
    setTest(c?.recipe.video!)
  }, [c?.recipe])
 
  const end = (e: any) => {
    e.target.classList.remove("out");
    e.target.classList.add("opacity-0");
    e.target.classList.remove("translate-y-full");
  };
  return (
    <div className="flex  items-center py-2 justify-between px-3" style={{background:`hsl(${c?.recipe.color},80%,60%)`,transition:`background ease 00ms`}}>
      <FaAngleLeft size={30} fill="white" className="cursor-pointer" />
      <div className="flex items-stretch gap-3  justify-between p-1 ">
        <div className={`${test && "translate-x-2-full"} transition-transform duration-1000 delay-100 shadow-inner rounded-3xl cursor-pointer  px-6 py-2 bg-white`}>
          <GoDeviceCameraVideo size={30} fill={`hsl(${c?.recipe.color},80%,60%)`} />
        </div>
        <div
          ref={parent}
          className="overflow-hidden 
        cursor-pointer px-2 relative text-white font-love  bg-white rounded-3xl w-36 py-2 font-biber text-2xl"
        >
          <div
            data-current
            style={{color:`hsl(${c?.recipe.color},80%,60%)`}}
            className={`transition-transform delay-200 duration-1000 ease-in-out
            bg-inherit flex items-center justify-center text-center  absolute bottom-full left-0
              transform  w-full h-full translate-y-full `}
            onAnimationEnd={end}
          >
            {text.current}
          </div>
          <div
            onAnimationEnd={end}
            data-next
            style={{color:`hsl(${c?.recipe.color},80%,35%)`,transition:`background ease 1000ms`}}
            className="transition-transform delay-200 duration-1000 ease-in-out
            bg-inherit flex items-center justify-center text-center absolute bottom-full left-0
              transform  w-full h-full opacity-0"
          >
            {text.next}
          </div>
        </div>
      </div>
    </div>
  );
}
