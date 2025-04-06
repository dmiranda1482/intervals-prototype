import { Interval } from "..";
import { IntervalManager } from "../intervalManager";


test("should return [[1,7]]", () => {
    // Arrange
    const expectedArray = [[1, 7]];
    const manager = new IntervalManager()
    
    // Act
    manager.addInterval([1, 3]);
    manager.addInterval([5, 7]);
    manager.addInterval([2, 6]);
    const obtainedArray = manager.getIntervals();
    console.log(`obtainedArray: ${JSON.stringify(obtainedArray)}`);
  
    // Assert
    expect(obtainedArray).toStrictEqual(expectedArray);
  });

  test("should return [[0,20]]", () => {
    // Arrange
    const expectedArray = [[0, 20]];
    const manager = new IntervalManager()
    
    // Act
    const intervals: Interval[] = [[0,10], [10,20]]
    intervals.forEach((x) => manager.addInterval(x))

    const obtainedArray = manager.getIntervals();
    console.log(`obtainedArray: ${JSON.stringify(obtainedArray)}`);
  
    // Assert
    expect(obtainedArray).toStrictEqual(expectedArray);
  });

  test("should return [[0,50]]", () => {
    // Arrange
    const expectedArray = [[0, 50]];
    const manager = new IntervalManager()
    
    // Act
    const intervals: Interval[] = [0, 3, 1, 2, 4].map((x) => [ x*10, (x+1)*10])
    intervals.forEach((x) => manager.addInterval(x))

    const obtainedArray = manager.getIntervals();
    console.log(`obtainedArray: ${JSON.stringify(obtainedArray)}`);
  
    // Assert
    expect(obtainedArray).toStrictEqual(expectedArray);
  });

  test("should return [[0,8], [10,11]]", () => {
    // Arrange
    const manager = new IntervalManager()
    const expectedArray = [[0,8], [10,11]];
    
    // Act
    const intervals: Interval[] = [[0,1],[3,4], [7,8], [10,11], [0,7]]
    intervals.forEach((x) => manager.addInterval(x))

    const obtainedArray = manager.getIntervals();
    console.log(`obtainedArray: ${JSON.stringify(obtainedArray)}`);
  
    // Assert
    expect(obtainedArray).toStrictEqual(expectedArray);
  });