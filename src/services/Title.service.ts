/* eslint-disable prettier/prettier */
import { Dispatch } from 'react'
import { Action } from './AppContext'
function rpad(str: string, length: number, padChar: string) {
    if (str.length >= length) {
        return str;
    }

    const padding = padChar.repeat(length - str.length);
    return str + padding;
}
export function lpad(str: string, length: number, padChar: string) {
    if (str.length >= length) {
        return str;
    }

    const padding = padChar.repeat(length - str.length);
    return padding + str;
}

export const changeText = (go: string, char: HTMLDivElement, callback: (value: React.SetStateAction<string | undefined>) => void, timer: React.MutableRefObject<{ data: NodeJS.Timer | null }>) => {

    let index: number = 0, tab: string[] = [];
    if (char.textContent!.length > go.length)
        go = rpad(go, char.textContent!.length, " ");
    else
        char.textContent = rpad(char.textContent!, go.length, " ");

    timer.current.data = setInterval(() => {
        if (index !== go.length) {
            if (char.textContent![index] !== go[index!]) {
                tab = char.textContent!.split("");
                tab[index] = go[index]
                char.textContent = tab.join('')
            }
            index += 1;
        } else {
            clearInterval(timer.current.data!);
            callback(go.trim());
        }

    }, 100);
};


export const countTo = (go: number, num: HTMLSpanElement, callback: (value: React.SetStateAction<string | undefined>) => void, timer: React.MutableRefObject<{ data: NodeJS.Timer | null }>, intervall: number) => {

    timer.current.data = setInterval(() => {
        let char1 = '', char2 = '';
        let t1 = lpad(go.toString(), 2, '0'),
            t2 = lpad(num.textContent!, 2, '0');
        if (Number(t1[1]) > Number(t2[1]))
            char2 = '' + (Number(t2[1]) + 1)
        else if (Number(t1[1]) < Number(t2[1]))
            char2 = '' + (Number(t2[1]) - 1)

        if (Number(t1[1]) === Number(t2[1])) {
            if (Number(t1[0]) > Number(t2[0]))
                char1 = '' + (Number(t2[0]) + 1)
            else if (Number(t1[0]) < Number(t2[0]))
                char1 = '' + (Number(t2[0]) - 1)
        }


        char1 = char1 === '' ? t2[0] : char1
        char2 = char2 === '' ? t2[1] : char2
        let numero = Number(char1 + char2)
        if (numero !== go) {
            num.textContent = lpad((char1 + char2).trim(), 2, '0')
        } else {
            clearInterval(timer.current.data!)
            callback(lpad(go.toString().trim(), 2, '0'))
        }


    }, intervall)
}

type Point = {
    x: number;
    y: number;
}

export function getpoint(center: Point, raduis: number, x: number): number[] {
    const a = 1,
        b = -2 * center.y,
        c = Math.pow(center.y, 2) + Math.pow(x - center.x, 2) - Math.pow(raduis, 2);
    const delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0)
        return [];

    if (delta === 0) {
        return [(-b / 2) * a];
    }

    const y1 = (-b + Math.sqrt(delta)) / (2 * a),
        y2 = (-b - Math.sqrt(delta)) / (2 * a);

    return [y1, y2];
}
export function getCircleAnimationKeyFrame(center: Point, raduis: number, direction: number) {
    const iterations = Math.floor(raduis / 20)
    const transform = (index: number) => direction >= 0 ?
        `translate(${raduis - index * 20}%,${getValue(center, raduis, raduis - index * 20)}%)` :
        `translate(${-raduis + index * 20}%,${getValue(center, raduis, -raduis + index * 20)}%)`;
    return [
        ...new Array(iterations).fill(null).map((_, index) => ({
            transform: transform(index), scale: .5,
        })),
        { scale: 1, transform: "translate(0)" },
    ];
}


const getValue = (p: Point, raduis: number, xabs: number) => { return getpoint(p, raduis, xabs).sort((a, b) => a - b)[0] }

//   const newspaperTiming: KeyframeAnimationOptions = {
//     duration: 700,
//     delay: 0,
//   };
//   const newspaperTiming2: KeyframeAnimationOptions = {
//     duration: 10,
//     delay: 0,
//     fill: "forwards"
//   };

export function imgSwitch(dragElement: HTMLDivElement, offsetX: number, changeItem: Dispatch<Action>): void {
    console.log(offsetX)
    if (Math.abs(offsetX) < 30) {
        dragElement.animate(
            [
                { transform: `translate(0)` },
            ],
            {
                duration: 200, // The duration is 0 to move the element instantly without any delay
                fill: 'forwards',
                delay: 0,
                easing: 'linear'
            }
        )
        return
    }
    if (offsetX < 0) {//gauche
        if (dragElement.nextElementSibling != null)
            dragElement.animate(
                [
                    { transform: `translateX(-200%)` },
                ],
                {
                    duration: 300, // The duration is 0 to move the element instantly without any delay
                    fill: 'forwards',
                    delay: 20,
                    easing: 'ease'
                }
            ).onfinish = () => {
                dragElement.nextElementSibling!.animate(

                    getCircleAnimationKeyFrame({ x: 0, y: 300 }, 300, 1) as Keyframe[]
                    ,
                    {
                        duration: 1000, // The duration is 0 to move the element instantly without any delay
                        fill: 'forwards',
                        delay: 150,
                        easing: 'ease'
                    }
                )
                changeItem({ type: 'increment' });
            }
        else
            dragElement.animate(
                [
                    { transform: `translateX(-0%)` },
                ],
                {
                    duration: 300, // The duration is 0 to move the element instantly without any delay
                    fill: 'forwards',
                    delay: 20,
                    easing: 'ease'
                }
            )
    } else {//droite
        if (dragElement.previousElementSibling != null)
            dragElement.animate(
                [
                    { transform: `translateX(200%)` },
                ],
                {
                    duration: 300, // The duration is 0 to move the element instantly without any delay
                    fill: 'forwards',
                    delay: 20,
                    easing: 'ease'
                }
            )
                .onfinish = () => {
                    dragElement.previousElementSibling!.animate(
                        // [
                        //     { transform: `translateX(0%)`,opacity: 0 },
                        //     { transform: `translateX(-200%)`, opacity: 0, offset: 0.1 },
                        //     { transform: `translateX(0%)`, opacity: 1},
                        // ]
                        getCircleAnimationKeyFrame({ x: 0, y: 300 }, 300, -1) as Keyframe[]
                        ,
                        {
                            duration: 1000, // The duration is 0 to move the element instantly without any delay
                            fill: 'forwards',
                            delay: 150,
                            easing: 'ease'
                        }
                    )
                    changeItem({ type: 'decrement' });
                }
        else
            dragElement.animate(
                [
                    { transform: `translateX(-0%)` },
                ],
                {
                    duration: 300, // The duration is 0 to move the element instantly without any delay
                    fill: 'forwards',
                    delay: 20,
                    easing: 'ease'
                }
            )
    }
}

