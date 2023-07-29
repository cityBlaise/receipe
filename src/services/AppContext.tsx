import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";

/* eslint-disable prettier/prettier */
type Direction = "NEXT" | "PREVIOUS";
type Step = {
    order: number;
    description: string;
    picture?: string;
}
type State = {
    name: string;
    level: string;
    video: boolean;
    duration: number;
    color:string;
    kcal: number;
    amountOfPeople: number;
    like: boolean;
    favorite: boolean;
    picture: string;
    steps: Step[]
}
type Data = { recipe:State,direction:Direction , setData:Dispatch<SetStateAction<{recipe:State,direction:Direction}>> }
// type Data = { data: State ,direction:Direction }

// type AppContextType = Data & { dispatch: Dispatch<React.SetStateAction<Data>> }

const AppContext = createContext<Data|null>(null);

type Props = {
    children: ReactNode;
};
  const AppProvider =({ children }: Props) =>{ 
    const [data, setData] = useState<{recipe:State,direction:Direction}>({
      recipe:{
            name: "Recipe 2",
            level: "Easy",
            video: true,
            duration: 30,
            color:`321`,
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
          direction:"PREVIOUS"
    }) 
    useEffect(() => {
        // console.log(data.data.duration,data.data.name) 
      },[data])
    return <AppContext.Provider value={{recipe:data.recipe,direction:data.direction,setData}}>
        {children}
    </AppContext.Provider>
}
export default AppProvider;

export const useAppContext = () =>useContext(AppContext);