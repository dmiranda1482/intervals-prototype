import { add, Interval, mergeTwoIntervals } from "..";

test("adds 1 + 2 to equal 3", () => {
  expect(add(1, 2)).toBe(3);
});

test("merge [0,1] with [2,3] to equal [[0,1],[2,3]]", () => {
  // Arrange
  const interval1: Interval = [0, 1];
  const interval2: Interval = [2, 3];

  // Act
  const obtainedArray = mergeTwoIntervals(interval1, interval2);
  console.log(`obtainedArray: ${JSON.stringify(obtainedArray)}`);

  // assert
  const expectedArray = [
    [0, 1],
    [2, 3],
  ];
  expect(obtainedArray).toStrictEqual(expectedArray);
});

test("merge [0,2] with [1,3] to equal [[0,3]]", () => {
    // Arrange
    const interval1: Interval = [0, 2];
    const interval2: Interval = [1, 3];
  
    // Act
    const obtainedArray = mergeTwoIntervals(interval1, interval2);
    console.log(`obtainedArray: ${JSON.stringify(obtainedArray)}`);
  
    // assert
    const expectedArray = [
      [0, 3]
    ];
    expect(obtainedArray).toStrictEqual(expectedArray);
});

test("merge [1,2] with [0,10] to equal [[0,10]]", () => {
    // Arrange
    const interval1: Interval = [0, 2];
    const interval2: Interval = [0, 10];
  
    // Act
    const obtainedArray = mergeTwoIntervals(interval1, interval2);
    console.log(`obtainedArray: ${JSON.stringify(obtainedArray)}`);
  
    // assert
    const expectedArray = [
      [0, 10]
    ];
    expect(obtainedArray).toStrictEqual(expectedArray);
});
