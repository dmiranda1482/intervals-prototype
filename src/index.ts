export type Interval = [number, number]

export function mergeTwoIntervals(interval1: Interval, interval2: Interval): Interval[] {
    // assume the intervals touch or overlap and compute a trial merge
    const trialSingleMergedInterval: Interval = [
        Math.min(interval1[0], interval2[0]), 
        Math.max(interval1[1], interval2[1])
    ]

    // verify that the given intervals overlap
    const getLenght = (interval: Interval) => (interval[1] - interval[0])
    const isOverlappingMerge = getLenght(trialSingleMergedInterval) <= (getLenght(interval1) + getLenght(interval2))

    // compute appropriate result
    let resultArray = [ trialSingleMergedInterval ]
    if (!isOverlappingMerge) {
        // return the two given intervals sorted 
        resultArray = [ interval1, interval2]
        if (interval1[0] > interval2[0]) {
            resultArray = [ interval2, interval1]
        }
    }
    return resultArray
}

function iterateToResolveInternalMerges(intervalArray: Interval[]): Interval[] {
    console.log(`####--- intervalArray: ${JSON.stringify(intervalArray)}`)
    if (intervalArray.length < 2) {
        return intervalArray
    }
    let newIntervalArray: Interval[] = []
    for(let i=0; i< intervalArray.length-1; i++) {
        for(let j=i+1; j< intervalArray.length; j++) {
            console.log(`####*** for loops [i,j]: ${JSON.stringify([i, j])}`)
            console.log(`####***** intervalArray[${i}]: ${JSON.stringify(intervalArray[i])}`)
            console.log(`####***** intervalArray[${j}]: ${JSON.stringify(intervalArray[j])}`)
            const mergeArray = mergeTwoIntervals(intervalArray[i], intervalArray[j])
            console.log(`####***** mergeArray: ${JSON.stringify(mergeArray)}`)
            newIntervalArray = [...newIntervalArray, ...mergeArray]
            console.log(`####***** newIntervalArray: ${JSON.stringify(newIntervalArray)}`)
        }
    }
    console.log(`####*** newIntervalArray: ${JSON.stringify(newIntervalArray)}`)
    return newIntervalArray
}

 function mergeIntrevalIntoArray(inputIntervalArray: Interval[], newInterval: Interval): Interval[] {
    let intervalArray = [...inputIntervalArray, newInterval]
    console.log(`#### 1 intervalArray: ${JSON.stringify(intervalArray)}`)
    const maxIteration = intervalArray.length
    let overlapingInThisIteration = false
    for(let iteration=0; iteration <= maxIteration; iteration++) {
        console.log(`iteration: ${iteration}`)
        const newIntervalArray = iterateToResolveInternalMerges(intervalArray)
        const overlapingInThisIteration = newIntervalArray.length !== intervalArray.length
        if (newIntervalArray.length > intervalArray.length) {
            console.log(`#### ISSUE `)
            break // DEBUG
        }
        intervalArray = newIntervalArray
        console.log(`#### 2 intervalArray merged: ${JSON.stringify(intervalArray)}`)

        if (!overlapingInThisIteration) {
            break; // exits the loop
        }
    }
    return intervalArray
}

export class IntervalManager {
    private intervalArray: Interval[] = []
    public addInterval(interval: Interval) {
        if (this.intervalArray.length > 0) {
            this.intervalArray = mergeIntrevalIntoArray(this.intervalArray, interval)
        } else {
            this.intervalArray = [interval]
        }
    }
    public getIntervals() {
        return this.intervalArray
    }
}

console.log(`Hello Tokenovate!`);
