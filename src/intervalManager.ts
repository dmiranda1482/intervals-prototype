import { Interval } from "."


type TimeStampAction = 'open' | 'close'

class IntervalTimeStamp {
    time: number
    action: TimeStampAction
    constructor(time: number, action: TimeStampAction) {
        this.time = time
        this.action = action
    }
}

export class IntervalManager {
    private timeStampArray: IntervalTimeStamp[] = []
    private intervalArray: Interval[] = []


    public addInterval(interval: Interval) {
        const openStamp = new IntervalTimeStamp(interval[0], 'open')
        const closeStamp = new IntervalTimeStamp(interval[1], 'close')
        this.timeStampArray.push(openStamp)
        this.timeStampArray.push(closeStamp)

        // sort sort by time, if the times are equal, then open first
        // this avoid contiguous intervals in the next step
        this.timeStampArray.sort((a, b) => {
            let delta = a.time - b.time
            if (delta == 0) {
                // priorize open first
                delta = a.action === 'open' ? 1 : -1
            }
            return delta
        }
        )

        // prune time stamps
        let openIntervals = 0
        const newTimeStampArray: IntervalTimeStamp[] = []
        for(const stamp of this.timeStampArray) {
            if (stamp.action === 'open') {
                openIntervals++
                if (openIntervals === 1) {
                    newTimeStampArray.push(stamp) // open a new interval, otherwise the interval is already open and dont do anything
                }
            } else if (stamp.action === 'close') {
                openIntervals--
                if (openIntervals === 0) {
                    newTimeStampArray.push(stamp) // close the interval, otherwise the interval is stil open due to another interval and dont do anything
                }
            }
        }
        this.timeStampArray = newTimeStampArray

        // recompute intervalArray (separate from prunning for modularity)
        this.intervalArray = []
        for(const stamp of this.timeStampArray) {
            if (stamp.action === 'open') {
                this.intervalArray.push([stamp.time, 0])
            } else {
                this.intervalArray[this.intervalArray.length-1][1] = stamp.time
            }
        }
    }

    public getIntervals() {
        console.log(`######----- time stamps : ${JSON.stringify(this.timeStampArray,null, 2)}`)
        return this.intervalArray
    }
}