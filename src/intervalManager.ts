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

        // prune stamps
        
        // recompute
    }

    public getIntervals() {
        return this.intervalArray
    }
}