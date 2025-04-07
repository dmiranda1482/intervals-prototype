export type Interval = [number, number]

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
        const isRemoval = false
        this.addOrRemoveInterval(interval, isRemoval)
    }

    public removeInterval(interval: Interval) {
        const isRemoval = true
        this.addOrRemoveInterval(interval, isRemoval)
    }

    private addOrRemoveInterval(interval: Interval, isRemoval=false) {
        let openStamp = new IntervalTimeStamp(interval[0], 'open')
        let closeStamp = new IntervalTimeStamp(interval[1], 'close')
        if (isRemoval) {
            openStamp = new IntervalTimeStamp(interval[0], 'close')
            closeStamp = new IntervalTimeStamp(interval[1], 'open')
        }
        this.timeStampArray.push(openStamp)
        this.timeStampArray.push(closeStamp)

        // sort sort by time, if the times are equal, then open first
        // this avoid contiguous intervals in the next step
        this.timeStampArray.sort((a, b) => {
            let delta = a.time - b.time
            if (delta == 0) {
                // priorize open first
                delta = a.action === 'open' ? -1 : 1
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
        this.intervalArray = new Array(this.timeStampArray.length/2)
        let index = 0
        for(const stamp of this.timeStampArray) {
            if (stamp.action === 'open') {
                this.intervalArray[index] = [0, 0]
                this.intervalArray[index][0] = stamp.time
            } else {
                this.intervalArray[index][1] = stamp.time
                index++;
            }
        }

        // remove zero lenght intervals
        const copyIntervalArray = this.intervalArray
        this.intervalArray = []
        for(const interval of copyIntervalArray) {
            if (interval[1] !== interval[0]) {
                this.intervalArray = [...this.intervalArray, interval]
            }
        }
    }

    public getIntervals() {
        // console.log(`######----- time stamps : ${JSON.stringify(this.timeStampArray,null, 2)}`)
        return this.intervalArray
    }
}