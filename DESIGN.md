# DESIGN

## Assumptions
The context of the software (business logic) is not given, only that the intervals correspond to time intervals.

There is no guarantee that the intervals of time are added in chronological order, what is the smallest possible difference between two time instants, nor the precision, I am assuming that the precision of the numbers in typescript are more than enough to represent the given times with full accuracy, so I do not expect to have to deal with tolerances.

It is also not know how many intervals will be processed 10, or 10 million, and I wanted an algorithm that scales
well, ideally.

I am also going to assume that the intervals correspond to mathematical sets of real numbers and so, when merging intervals I will get the smallest possible array of intervals, that would correspond to the mathematical union of those intervals. And by the way the extremes of the intervals would always be part of the sets (closed intervals).
So for instance the interval [1, 3] would always contain 1, 3 and everything in between.

I am also not going to bother to sanitize any data at this point. I assume that the given intervals always contain exactly two sorted numbers, so that the first is <= that the second.

Furthermore, if the interval only contains a single point in time -- zero length, then I remove that interval as if it does not exists.

## Definitions

To implement the algorithm, I use the concept
1) `time stamps`, corresponds to a point in time where an interval `open` or `close` - the `time` and `action` (open or close) is saved with it.

## Algorithm

1 > Build an array of `time stamps` when and interval is added or removed
2 > To compute the merged intervals
    * sort the time stamps (when they have the same time, open comes first)
    * loop through the time stamps while keeping a counter of how many intervals are open (this can go to negative to allow removals)
      the value of the counter is then used to generate the array of the merged intervals. I will call this process `pruning`.
    * remove intervals with zero length, that might occur when removing intervals  

Avoid doing the step 2 too often as it's computationally costly

### Future improvements
* Optimize the allocations of arrays, with pre-allocation and avoid many copies
* Use a cache, to avoid step 2, if nothing is added or removed
* Add doxygen documentation