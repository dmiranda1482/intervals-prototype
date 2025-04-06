# Brainstorming

## starting point/ initial assumptions
Ok, I think I will start by brainstorming some ideas and try to write some code as fast as I can, to fail fast.

From what I read, the context of the software (bussines logic) is not given, except that the intervals correspond to time, that is quite abstract anyway.
There is no garantee that the intrevals of time are added in cronological order, what is the smallest possible difference between two time instants, precision and things like that.
It is also not know how many intervals will be processed 10, or 10 million, and if an algorithm that scales when the volume of data increses is important. Whether assyncronous merges would be desirable, etc.

Therefore, for now, I am going to ignore all that!!!!

I am also going to assume that the intrevals correspond to mathematical sets of real numbers and so, when merging intrevals I will get the smallest possible array of intrevals, that would correspond to the mathematical union of those intrevals. And by the way the extremes of the intrevals would allways be part of the sets (closed intrevals).

So for instance the intreval [1, 3] would allways contain 1, 3 and everything in between.

## a very simple algorithm

1. I am going to create a very simple algorithm with a routine to merge two intervals into a `disjoint array of intrevals` that is intervals that correspond to disjoint sets, that is an array of intrevals that does not overlap.

2. then I will use that routine to build another, that meges an interval with the `disjoint array of intrevals` and outputs the resulting `disjoint array of intrevals`.

This second algorithm will probably be extremely ineficient, and will not scale well when the problem size increases, that is the, amont of intervals increases. However, I might learn something from it and it will allow me to write some tests. To use late.



