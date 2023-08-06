/* eslint-disable prettier/prettier */
import { useEffect, useRef} from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { GoDeviceCameraVideo } from "react-icons/go"; 
import { useAppContext } from "../../services/AppContext";
import { useNavigate } from "react-router-dom";
 
export default function Header() {  
  const context = useAppContext();
  const video= useRef<HTMLDivElement|null>(null)
  const navigate = useNavigate();
  useEffect(() => { 
    if(context?.recipe.video){
      video.current!.animate(
        [
          // { left: dragElement.current!.style.left, top: dragElement.current!.style.top },
          // { transform: `transalate(${dragElement.current!.style.transform.}px, ${clampedY}px` },
          { transform: `translateX(0%)`,opacity:1  }
      ],
      {
          duration: 350,
          fill: 'forwards',
          delay: 150,
      }
      )
    }else{
      video.current!.animate(
        [
          // { left: dragElement.current!.style.left, top: dragElement.current!.style.top },
          // { transform: `transalate(${dragElement.current!.style.transform.}px, ${clampedY}px` },
          { transform: `translateX(200%)`,opacity:0 }
      ],
      {
          duration: 300,
          fill: 'forwards',
          delay: 15,
      }
      )
    }
  }, [context?.recipe])
 
  return (
    <div className="flex  items-center py-1 justify-between px-3" style={{background:`hsl(${context?.recipe.color},95%,70%)`,transition:`background ease 00ms`}}>
      <FaAngleLeft
      onClick={()=>navigate(-1)}
       size={30} fill="white" className="cursor-pointer" />
      <div className="flex items-stretch gap-3  justify-between">
        <div 
        ref={video}
        className={`translate-x-2-full transition-transform duration-1000 delay-100 shadow-inner rounded-3xl cursor-pointer  px-4 bg-white flex items-center`}>
          <GoDeviceCameraVideo size={30} fill={`hsl(${context?.recipe.color},82%,50%)`} />
        </div>
        <div 
        style={{color:`hsl(${context?.recipe.color},82%,50%)`}}
          className="overflow-hidden  w-32
        cursor-pointer px-4 py-2 relative  text-center font-love  bg-white rounded-3xl   font-biber text-lg"
        > 
        {context?.recipe.level}
        </div>
      </div>
    </div>
  );
}
