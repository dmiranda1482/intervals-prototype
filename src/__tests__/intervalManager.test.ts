import { IntervalManager } from "..";

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