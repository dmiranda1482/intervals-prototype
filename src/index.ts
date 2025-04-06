export function add(a: number, b: number): number {
  return a + b;
}

export type Interval = [number, number]

export function mergeTwoIntervals(interval1: Interval, interval2: Interval): Interval[] {
    // assume the intervals touch or overlap and compute a trial merge
    const trialSingleMergedInterval: Interval = [
        Math.min(interval1[0], interval2[0]), 
        Math.max(interval1[1], interval2[1])
    ]

    // verify that the given intervals overlap
    const getLenght = (interval: Interval) => (interval[1] - interval[0])
    const isOverlappingMerge = getLenght(trialSingleMergedInterval) < (getLenght(interval1) + getLenght(interval2))

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


console.log(`Hello Tokenovate 1 + 2 = ${add(1, 2)}`);
