/* eslint-disable prettier/prettier */
import "./App.scss";
import { NavLink, Outlet } from "react-router-dom";
import Ball from "./Ball";
import Transition from "./Transition"; 
import Moving from "./components/Gesture/Moving";
type Link = {
  name: string;
  component?: JSX.Element;
};
export const links: Link[] = [
  { name: "fundamentals", component: <Ball top={0} left={0} /> },
  { name: "transitions", component: <Transition /> },
  { name: "keyframe animation" },
  { name: "choreography" },
  { name: "states" },
  { name: "layout animations" },
  { name: "reactive animations" },
  {
    name: "inflight example",
    component: (
      <Moving>
        <div>hello </div>
      </Moving>
    ),
  },
];
function App() {
  return (
    <div className="App">
      <nav>
        {links.map((link, index) => (
          <NavLink key={index} to={link.name.split(" ").length > 1 ? link.name.split(" ").join("-") : link.name}>
            {link.name}
          </NavLink>
        ))}
      </nav>
      <div className="children">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
