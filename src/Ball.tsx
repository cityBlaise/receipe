/* eslint-disable prettier/prettier */  
import BottomMak from "./BottomMak";
import Header from "./components/header/header";
import Duration from "./components/duration/duration";
import QuantityCal from "./components/quantityCal/quantityCal";
import Instructions from "./components/instructions/instructions";
import ScreenNav from "./screenNav";
import Title from "./components/Title/Title";
import { useAppContext } from "./services/AppContext";
import Moving from "./components/Gesture/Moving";
import { imgSwitch } from "./services/Title.service";
import useAllCssLoaded from "./services/cssLoaded";
import { useEffect } from "react";
 
function Ball() { 
  const context = useAppContext();  
  const stylesLoad = useAllCssLoaded()
  useEffect(() => {
    console.log(stylesLoad)
  }, [stylesLoad])
  
  if(stylesLoad)
  return (
    <div className="container">
      <>
        <Header />
        <Title />
       { stylesLoad&&
       <BottomMak className="relative h-[240px] overflow-hidden">  
          <div className="overflow-hidden w-full  mx-auto flex justify-center  h-full relative" style={{ clipPath: ` ellipse(50% 100% at 50% 0%)`,
          background:`linear-gradient(to bottom, hsl(${context?.recipe.color},95%,70%) , hsl(${context?.recipe.color},70%,50%) 40%)`,transition:`background ease 1000ms` }}>
            {context?.images!.map((img,index)=> (
              <Moving 
                      key={`${img}`} 
                      className={`select-none absolute ${index!==0&& 'translate-x-2-full'}`}
                      reset={imgSwitch}>
                <div draggable={false} className="flex justify-center p-4 h-52 w-56 ov">
                  <img className="max-w-non aspect-square " draggable={false} src={`/images/${img}.png`} alt="" 
                  style={{height:`200px`}}/>
                </div>
              </Moving>
            ))}
          </div>
        </BottomMak>
        }
      </> 
      <Duration />
      <QuantityCal />
      <Instructions />
      <ScreenNav />
    </div>
  );
  else
  return(<div>loading...</div>)
}

export default Ball;
