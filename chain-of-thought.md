# Brainstorming

## starting point/ initial assumptions
Ok, I think I will start by brainstorming some ideas and try to write some code as fast as I can, to fail fast.

From what I read, the context of the software (business logic) is not given, except that the intervals correspond to time, that is quite abstract anyway.
There is no guarantee that the intervals of time are added in chronological order, what is the smallest possible difference between two time instants, precision and things like that.
It is also not know how many intervals will be processed 10, or 10 million, and if an algorithm that scales when the volume of data increases is important. Whether asynchronous merges would be desirable, etc.

Therefore, for now, I am going to ignore all that!!!!

I am also going to assume that the intervals correspond to mathematical sets of real numbers and so, when merging intervals I will get the smallest possible array of intervals, that would correspond to the mathematical union of those intervals. And by the way the extremes of the intervals would always be part of the sets (closed intervals).

So for instance the interval [1, 3] would always contain 1, 3 and everything in between.

I am also not going to bother to sanitize any data at this point. I assume that the given intervals always contain exactly two sorted numbers, so that the first is <= that the second.

## a very simple algorithm

1. I am going to create a very simple algorithm with a routine to merge two intervals into a `disjoint array of intervals` that is intervals that correspond to disjoint sets, that is an array of intervals that does not overlap.

2. then I will use that routine to build another, that merges an interval with the `disjoint array of intervals` and outputs the resulting `disjoint array of intervals`.

This second algorithm will probably be extremely inefficient, and will not scale well when the problem size increases, that is the, amount of intervals increases. However, I might learn something from it and it will allow me to write some tests. To use late.

### algorithm for merging two intervals

When merging two intervals, three cases might occur:
1) the two interval do not overlap, not even at the extremes so when merging we get the same intervals
2) One of the intervals overlaps the other completely, so the result is the wider interval
3) The intervals overlap but only partially, this includes the case where that touch at one extreme, then in that case merging [a,b] with [c, d] would result in a single interval [min(a,c), max(b,d)]

However, the case 2) merging partially overlapping intervals [a, b] with [c, d] will result in an interval of the type [min(a,c), max(b,d)] as in case 3).

So maybe I can just:
1) compute a `trial single merged interval` with [min(a,c), max(b,d)] = [x, y], and
2) verify if I am in case 1, by checking that if the distance between extremes of the resulting interval exceeded the sum of distances between extremes the two given intervals
distance(a,b) + distance(c,d) < distance (x,y)
3) return the appropriate result depending on whether I am in situation 1) or 2).


### algorithm for merging an interval into a `disjoint array of intervals`

If I loop over the array of intervals and use the algorithm to merge two intervals, I might end up with a new array where some of the intervals overlap. In that case I would have to merge every two pairs of the array, until no overlaps occur. That would results in an algorithm with cubic complexity O(n^3), that is not too bad for starting. There will be ways of reducing the complexity. But at this stage I just want to have something working. And this would also allow me to develop more test cases for later use.

##### the naive inefficient algorithm would be:

1) push the new interval into the array
2) repeat until no overlaps occur
    newIntervalArray = []
    for i=0 to intervalArray.length()
        for j=i+1 to intervalArray.length()
            mergeArray = mergeTwoIntervals(intervalArray[i], intervalArray[j])
            newIntervalArray.push(overlappingInThisIteration)
    intervalArray = newIntervalArray

Note: I can try to put a flag on the Intervals, to track the ones that change and combine only those, but it would only be slightly better. There is for sure a more efficient way of doing this, so at this point I am not even loose time doing that. 

Note2: I can check if overlaps occurred in a certain iteration by comparing the length of the arrays before and after the iteration

** It would not work, because when combining pairs of intervals one might get, a growing number of intervals **


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