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

function iterateToResolveInternalMerges(intervalArray: Interval[]): boolean {
    let newintervalArray: Interval[] = []
    let overlapingInThisIteration = false
    for(let i=0; i< intervalArray.length-1; i++) {
        for(let j=i+1; i< intervalArray.length; j++) {
            const mergeArray = mergeTwoIntervals(intervalArray[i], intervalArray[j])
            overlapingInThisIteration = overlapingInThisIteration || (mergeArray.length < 2)
            newintervalArray.concat(mergeArray)
        }
    }
    intervalArray = newintervalArray
    return overlapingInThisIteration
}

 function mergeIntrevalIntoArray(intervalArray: Interval[], newInterval: Interval): Interval[] {
    const maxIteration = intervalArray.length
    let overlapingInThisIteration = false
    for(let iteration=0; iteration <= maxIteration; iteration++) {

        overlapingInThisIteration = iterateToResolveInternalMerges(intervalArray)

        if (!overlapingInThisIteration) {
            break; // exits the loop
        }
    }
    return []
}

export class IntervalManager {
    private intervalArray: Interval[] = []
    public addInterval(interval: Interval) {
        if (this.intervalArray.length > 0) {
            mergeIntrevalIntoArray(this.intervalArray, interval)
        } else {
            this.intervalArray.push(interval)
        }
    }
    public getIntervals() {
        return this.intervalArray
    }
}

console.log(`Hello Tokenovate!`);
