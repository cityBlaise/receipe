import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useReducer, useState } from "react";

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
  color: string;
  kcal: number;
  amountOfPeople: number;
  like?: boolean;
  favorite?: boolean;
  picture?: string;
  steps?: Step[]
}
type Data = { recipe: State,images:String[], changeRecipe: Dispatch<Action> }
// type Data = { data: State ,direction:Direction }

// type AppContextType = Data & { dispatch: Dispatch<React.SetStateAction<Data>> }

const AppContext = createContext<Data | null>(null);

type Props = {
  children: ReactNode;
};

const dishes: State[] = [
  { name: "Spaghetti Bolognese", color: '30', level: 'medium', amountOfPeople: 4, duration: 40, favorite: false, kcal: 50, video: true },
  { name: "Chicken Curry", color: '32', level: 'medium', amountOfPeople: 2, duration: 45, kcal: 300, video: false },
  { name: "Beef Stir-Fry", color: '10', level: 'hard', amountOfPeople: 2, duration: 33, kcal: 150, video: true },
  { name: "Margherita Pizza", color: '21', level: 'hard', amountOfPeople: 2, duration: 45, kcal: 50, video: false },
  { name: "Caesar Salad", color: '70', level: 'easy', amountOfPeople: 2, duration: 25, kcal: 85, video: false },
  { name: "Grilled Salmon", color: '30', level: 'medium', amountOfPeople: 2, duration: 40, kcal: 110, video: true },
  { name: "Vegetable Lasagna", color: '20', level: 'hard', amountOfPeople: 2, duration: 45, kcal: 50, video: true },
  { name: "Beef Tacos", color: '27', level: 'hard', amountOfPeople: 5, duration: 55, kcal: 250, video: false },
  { name: "Paella", color: '32', level: 'hard', amountOfPeople: 3, duration: 58, kcal: 200, video: true },
  { name: "Chicken Shawarma", color: '33', level: 'hard', amountOfPeople: 2, duration: 45, kcal: 210, video: true },
  { name: "Sushi Sashimi", color: '20', level: 'hard', amountOfPeople: 1, duration: 30, kcal: 150, video: true },
  { name: "Chocolate Brownie", color: '20', level: 'medium', amountOfPeople: 2, duration: 35, kcal: 144, video: true },
];

export type Action = | { type: 'increment' } | { type: 'decrement'; };
function reducer(index: number, action: Action): number {
  switch (action.type) {
    case 'increment':
      return (index+1)%dishes.length; 
    case 'decrement':
      return index===0?0:index-1 ; 
    default:
      return 0;
  }
}
const AppProvider = ({ children }: Props) => {
  const [index, dispatch] = useReducer(reducer,0);
  const [data, setData] = useState<State>(dishes[index])
  useEffect(() => {
    setData(dishes[index])
  }, [index])
  return <AppContext.Provider value={{ recipe: data,images:dishes.map(x=>x.name) ,changeRecipe:dispatch }}>
    {children}
  </AppContext.Provider>
}
export default AppProvider;

export const useAppContext = () => useContext(AppContext);