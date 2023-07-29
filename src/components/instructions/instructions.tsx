/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { useAppContext } from "../../services/AppContext";
import "./instructions.scss";
export default function Instructions() {
  const c = useAppContext();
  useEffect(() => {
      // console.log(c?.data)
    }, [c?.recipe])
  return (
    <div className="instructions overflow-y-scroll mt-28 pt-7">
      <div className="">
        <h3 className="font-biber text-2xl mb-2 px-5">
          1. wash potatoes well
        </h3>
        <p className="px-9 py-2">
          To prepare hot sandwiches, we need the
          following ingredients: sliced white
          loaf, smoked sausage, tomato, bell
          pepper, hard cheese, eggs, mayonnaise
          and vegetable oil.
        </p>
        <figure className="bg-white mt-2 p-7 overflow-hidden ">
          <div className="flex overflow-hidden rounded-65 ">
            <img
              draggable={false}
              src="/images/5.jpg"
              className="w-full shadow-lg shadow-slate-300 mask1"
              alt=""
            />
          </div>
        </figure>
      </div>
      <div className="bg-white bdr-bt pb-5">
        <h3 className="font-biber text-2xl mb-2 px-5 flex gap-2">
          <span>2.</span> <span>turn over, cover and fry</span>
        </h3>
        <p className="px-9 py-2 ">
          Then turn over, cover and fry over low
          heat for about 10 minutes. Turn the
          potatoes over again, cover with a lid
          and fry over low heat for about 5 move
          minutes. Whole fried potatoes are ready.
          Bon appetit!!
        </p>
      </div>
      <div className="mt-5">
        <h3 className="font-biber text-2xl mb-2 px-5">
          3. cooking salad
        </h3>
        <p className="px-9 py-2 text-lg">
          To prepare a salad, only young nettle
          leaves should be used, it is better not
          to usee stems and old damaged leaves.
          Before cutting, the leaves can be
          blanched for 30 seconds or simply poured
          over with boilling water. Then drain the
          broth, and throw the nettle into a
          colander, rinse with cold water, let it
          drain.
        </p>
        <figure className="mt-2 p-7  overflow-hidden  ">
          <div className="flex overflow-hidden rounded-65 shadow-lg shadow-slate-400">
            <img
              draggable={false}
              src="/images/6.jpg"
              alt=""
              className="w-full"
            />
          </div>
        </figure>
      </div>
    </div>
  );
}
