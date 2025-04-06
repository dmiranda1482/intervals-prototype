# Brainstorming

## starting point/ initial assumptions
Ok, I think I will start by brainstorming some ideas and try to write some code as fast as I can, to fail fast.

From what I read, the context of the software (bussines logic) is not given, except that the intervals correspond to time, that is quite abstract anyway.
There is no garantee that the intrevals of time are added in cronological order, what is the smallest possible difference between two time instants, precision and things like that.
It is also not know how many intervals will be processed 10, or 10 million, and if an algorithm that scales when the volume of data increses is important. Whether assyncronous merges would be desirable, etc.

Therefore, for now, I am going to ignore all that!!!!

I am also going to assume that the intrevals correspond to mathematical sets of real numbers and so, when merging intrevals I will get the smallest possible array of intrevals, that would correspond to the mathematical union of those intrevals. And by the way the extremes of the intrevals would allways be part of the sets (closed intrevals).

So for instance the intreval [1, 3] would allways contain 1, 3 and everything in between.

I am also not going to bother to sanitize any data at this point. I ssume that the given intrevals always contain exactly two sorted numbers, so that the first is <= that the second.

## a very simple algorithm

1. I am going to create a very simple algorithm with a routine to merge two intervals into a `disjoint array of intrevals` that is intervals that correspond to disjoint sets, that is an array of intrevals that does not overlap.

2. then I will use that routine to build another, that meges an interval with the `disjoint array of intrevals` and outputs the resulting `disjoint array of intrevals`.

This second algorithm will probably be extremely ineficient, and will not scale well when the problem size increases, that is the, amont of intervals increases. However, I might learn something from it and it will allow me to write some tests. To use late.

### algorithm for merging two intervals

When merging two intervals, three cases migh ocour:
1) the two interval do not overlap, not even at the extremes so when merging we get the same intervals
2) One of the intervals ovelaps the other completely, so the result is the wider interval
3) The intervals overlap but only partially, this inclues the case where thet touch at one extreme, then in that case merging [a,b] with [c, d] would result in a single interval [min(a,c), max(b,d)]

However, the case 2) merging partially overlaping intervals [a, b] with [c, d] will result in an interval of the type [min(a,c), max(b,d)] as in case 3).

So maybe I can just:
1) compute a `trial single merged interval` with [min(a,c), max(b,d)] = [x, y], and
2) verify if I am in case 1, by checking that if the distance betwen extremes of the resulting intreval exceeded the sum of distances between extremes the two given intervals
distance(a,b) + distance(c,d) < distance (x,y)
3) return the appropriate result depending on whether I am in situation 1) or 2).


