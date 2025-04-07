# DESIGN

## Assumptions
The context of the software (business logic) is not given, only that the intervals correspond to time intervals.

There is no guarantee that the intervals of time are added in chronological order, what is the smallest possible difference between two time instants, nor the precision, I am assuming that the precision of the numbers in typescript are more than enough to represent the given times with full accuracy, so I do not expect to have to deal with tolerances.

It is also not know how many intervals will be processed 10, or 10 million, and I wanted an algorithm that scales
well, ideally.

I am also going to assume that the intervals correspond to mathematical sets of real numbers and so, when merging intervals I will get the smallest possible array of intervals, that would correspond to the mathematical union of those intervals. And by the way the extremes of the intervals would always be part of the sets (closed intervals).
So for instance the interval [1, 3] would always contain 1, 3 and everything in between.

I am also not going to bother to sanitize any data at this point. I assume that the given intervals always contain exactly two sorted numbers, so that the first is <= that the second.

Furthermore, if the interval only contains a single point in time, then I remove that interval as if it does not exists.


### An improved algorithm

Idea: Keep the array with the intervals always sorted after each operation.

Then when an new interval is inserted we loop over the extremes of the intervals and the new one, in order... while doing that, we construct the merged array of intervals by using a state variable `open intervals`. The state variable `open intervals` would keep track of how many intervals are `open` as we step into an extreme value.

How about if instead I just merge all the extremes of the intervals, `time stamps`, with label is it is a open or a close. Then when inserting a new interval I only have to loop trough. And then somehow I merge time stamps that correspond to the same instant to eliminate the case where intervals touch each other.

### Review the improved algorithm
The last test with a very large number of intervals
does not scale very well. 20000 intervals takes about 45 seconds to compute.

TODO: Next, replace the call to sort by an insert of the time stamp in the right place

### Remove interval
With this logic of openIntervals counter, for the interval removals, I only need to invert the order of the action of the time stamps, that is close first and open after.

### Quick Optimization
Besides replacing the sort algorithm by an insert when adding a new interval, there is something quicker that I can do.
If I only sort the the `time stamps` just before getting the Intervals getIntervals(), then we don't need calling for the sort so many times (I am assuming that getIntervals() is called infrequently). 