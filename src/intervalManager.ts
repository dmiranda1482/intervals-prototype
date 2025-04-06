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

        // sort

        // prune stamps

        // recompute
    }

    public getIntervals() {
        return this.intervalArray
    }
}