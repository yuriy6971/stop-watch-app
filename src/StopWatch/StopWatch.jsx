import React, { useState, useEffect, useRef } from 'react'
import s from './stopWatch.module.css'



const StopWatch = (props) => {

    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [isWork, setIsWork] = useState(false)



    useInterval(() => {
        if (!isWork) return
        setSeconds((seconds) => { return seconds === 59 ? 0 : seconds + 1 });
    }, 1000);

    useInterval(() => {
        if (!isWork) return
        setMinutes((minutes) => { return minutes === 59 ? 0 : minutes + 1 });
    }, 60000);

    useInterval(() => {
        if(!isWork) return 
        setHours((hours) => {return hours === 12 ? 0 : hours +1});
      }, 3600000);

    const StopWatch = () => {
        setIsWork(false)
        setSeconds(0)
    }

    const StartWatch = () => {
        setIsWork(true)
    }
    const resetWatch = () => {
        setSeconds(0)
        setIsWork(false)
        setTimeout(() => {
            setIsWork(true)
        }, 500)
    }

    const waitWatch = () => {
        setIsWork(!isWork)
    }


    return (
        <div>
            <h2 className = {s.header}>stopwatch</h2>
            <div className={s.screens}>
                <div className={s.item_watch}>
                    <p className={s.screen_watch}>{String(hours).padStart(2, "0")}</p>
                    <p className={s.abr_hours}>HH</p>
                </div>
                <div className={s.item_watch}>
                    <p className={s.screen_watch}>{String(minutes).padStart(2, "0")}</p>
                    <p className={s.abr_hours}>MM</p>
                </div>
                <div className={s.item_watch}>
                    <p className={s.screen_watch}>{String(seconds).padStart(2, "0")}</p>
                    <p className={s.abr_hours}>SS</p>
                </div>
            </div>


            <div className={s.block_buttons}>
                {isWork ? <button className={`${s.butt} ${s.butt_stop}`} onClick={StopWatch} >stop</button> : <button className={`${s.butt} ${s.butt_start}`} onClick={StartWatch} >start</button>}
                <button className={`${s.butt} ${s.butt_wait}`} onDoubleClick={waitWatch}>wait</button>
                <button className={`${s.butt} ${s.butt_reset}`} onClick={resetWatch} >reset</button>
            </div>

        </div>
    )

}
function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
export default StopWatch