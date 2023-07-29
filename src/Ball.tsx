/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from "react";
import "./Ball.scss";
import "./BottomMak.scss";
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
 


const style: React.CSSProperties[] = [
  {
    background: `linear-gradient(
    to bottom,
    hsla(39, 100%, 50%, 0.596) 50%,
    #ffb012 65%)`,
    height: `500px`,
    clipPath: `ellipse()`,
    // marginTop:`-60%`
  },
  {
    background: `linear-gradient(
    to bottom,
    red 50%,
    red 65%
  )`,
    clipPath: `ellipse()`,
  },
];

 
function Ball({ left = 0, top = 0 }: { left?: number; top?: number }) {
  const [isDragging, setIsDragging] = useState(false);
  const [item, setItem] = useState("0");

  const newspaperSpinning = [
    { transform: "rotate(0) scale(1)" },
    // Add an intermediate state with a delay
    { transform: "rotate(0) scale(1)", offset: 0.5 },
    { transform: "rotate(360deg) scale(0)" },
  ];
  
  const newspaperTiming = {
    duration: 2000,
    iterations: 1,
  };
 
  const c = useAppContext();
  const animateElement = useRef<HTMLDivElement | null>(null);
  const dishes:  {name:string,color:number}[] = [
    {name:"Spaghetti Bolognese",color:332},
    {name:"Chicken Curry",color:211},
    {name:"Beef Stir-Fry",color:254},
    {name:"Margherita Pizza",color:210},
    {name:"Spaghetti Bolognese",color:225},
    {name:"Caesar Salad",color:78},
    {name:"Grilled Salmon",color:108},
    {name:"Vegetable Lasagna",color:10},
    {name:"Beef Tacos",color:87},
    {name:"Chocolate Brownie",color:0}, 
  ];
  useEffect(() => { 

    let timer = setTimeout(() => {
      const rand = Math.floor(Math.random() * 51)
      const randColor = Math.floor(Math.random() * 10)
      c?.setData({
        recipe: {
          color:`${dishes[randColor].color}`,
          name: dishes[randColor].name,
          level: "Easy",
          video: rand % 2 === 0,
          duration: rand + 5,
          kcal: 300,
          amountOfPeople: 2,
          like: false,
          favorite: true,
          picture: "recipe2.jpg",
          steps: [
            { order: 1, description: "Step 1", picture: "step1.jpg" },
            { order: 2, description: "Step 2", picture: "step2.jpg" },
          ],
        },
        direction: "PREVIOUS"
      })

    }, 10000);
    return () => {
      clearTimeout(timer)
    }
  }, [c?.recipe]);

  return (
    <div className="container">
      <>
        <Header />
        <Title />
        <BottomMak className="relative h-64 overflow-hidden">  
          <div className="overflow-hidden w-full pt-8 mx-auto flex justify-center  h-full relative" style={{ clipPath: ` ellipse(50% 100% at 50% 0%)`,
          background:`linear-gradient(to bottom, hsl(${c?.recipe.color},80%,60%) , hsl(${c?.recipe.color},80%,35%) 40%)`,transition:`background ease 1000ms` }}>
            {/* <div className=""></div> */}
            <Moving className="select-none polygon absolute"
              reset={imgSwitch}
              >
              <div draggable={false}
                className="aspect-square w-44 inline-block overflow-hidden">
                <img className="aspect-square inline-block w-44" draggable={false} src={`/images/6.jpg`} alt="" />
              </div>
            </Moving>
            {new Array(11).fill(0).map((_, index) => (
              <Moving key={index} className="select-none polygon absolute translate-x-2-full "
                      reset={imgSwitch}
              >
                <div draggable={false}
                  className="aspect-square w-44 inline-block overflow-hidden"
                >
                  <img className="aspect-square inline-block w-44" draggable={false} src={`/images/${index + 7}.jpg`} alt="" />
                </div>
              </Moving>
            ))}
          </div>
        </BottomMak>
      </> 
      <Duration />
      <QuantityCal />
      <Instructions />
      <ScreenNav />
    </div>
  );
}

export default Ball;
