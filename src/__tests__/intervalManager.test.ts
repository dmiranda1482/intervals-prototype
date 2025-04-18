import { IntervalManager, Interval } from "../intervalManager";

test("should return [[1,7]]", () => {
  // Arrange
  const expectedArray = [[1, 7]];
  const manager = new IntervalManager();

  // Act
  manager.addInterval([1, 3]);
  manager.addInterval([5, 7]);
  manager.addInterval([2, 6]);
  const obtainedArray = manager.getIntervals();

  // Assert
  expect(obtainedArray).toStrictEqual(expectedArray);
});

test("should return [[0,20]]", () => {
  // Arrange
  const expectedArray = [[0, 20]];
  const manager = new IntervalManager();

  // Act
  const intervals: Interval[] = [
    [0, 10],
    [10, 20],
  ];
  intervals.forEach((x) => manager.addInterval(x));

  const obtainedArray = manager.getIntervals();

  // Assert
  expect(obtainedArray).toStrictEqual(expectedArray);
});

test("should return [[0,2]] -- irrational numbers", () => {
    // Arrange
    const expectedArray = [[0, 2]];
    const manager = new IntervalManager();
  
    // Act
    const intervals: Interval[] = [
      [0, Math.sqrt(2)],
      [Math.sqrt(2), 2],
    ];
    intervals.forEach((x) => manager.addInterval(x));
  
    const obtainedArray = manager.getIntervals();
    console.log(`obtainedArray: ${JSON.stringify(obtainedArray)}`);
  
    // Assert
    expect(obtainedArray).toStrictEqual(expectedArray);
});

test("should return [[0,50]]", () => {
  // Arrange
  const expectedArray = [[0, 50]];
  const manager = new IntervalManager();

  // Act
  const intervals: Interval[] = [0, 3, 1, 2, 4].map((x) => [
    x * 10,
    (x + 1) * 10,
  ]);
  intervals.forEach((x) => manager.addInterval(x));

  const obtainedArray = manager.getIntervals();

  // Assert
  expect(obtainedArray).toStrictEqual(expectedArray);
});

test("should return [[0,8], [10,11]]", () => {
  // Arrange
  const manager = new IntervalManager();
  const expectedArray = [
    [0, 8],
    [10, 11],
  ];

  // Act
  const intervals: Interval[] = [
    [0, 1],
    [3, 4],
    [7, 8],
    [10, 11],
    [0, 7],
  ];
  intervals.forEach((x) => manager.addInterval(x));

  const obtainedArray = manager.getIntervals();

  // Assert
  expect(obtainedArray).toStrictEqual(expectedArray);
});

test("should return [[0,50]] adds the intervals two times", () => {
  // Arrange
  const expectedArray = [[0, 50]];
  const manager = new IntervalManager();

  // Act
  const intervals: Interval[] = [0, 3, 1, 2, 4].map((x) => [
    x * 10,
    (x + 1) * 10,
  ]);
  intervals.forEach((x) => manager.addInterval(x));
  intervals.forEach((x) => manager.addInterval(x));

  const obtainedArray = manager.getIntervals();

  // Assert
  expect(obtainedArray).toStrictEqual(expectedArray);
});

test("should return an array with the correct size (VeryLargeNumber)", () => {
  // Arrange
  const VeryLargeNumber = 10 * 1000;
  const manager = new IntervalManager();

  // Act
  for (let i = 1; i <= VeryLargeNumber; i++) {
    manager.addInterval([i, i + 0.5]);
  }

  const obtainedSize = manager.getIntervals().length;

  // Assert
  expect(obtainedSize).toEqual(VeryLargeNumber);
});

test("should return [[0,40]]", () => {
  // Arrange
  const expectedArray = [[0, 40]];
  const manager = new IntervalManager();

  // Act
  const intervals: Interval[] = [
    [0, 100],
    [40, 100],
  ];
  manager.addInterval(intervals[0]);
  manager.removeInterval(intervals[1]);

  const obtainedArray = manager.getIntervals();

  // Assert
  expect(obtainedArray).toStrictEqual(expectedArray);
});

test("should return [[20,40]]", () => {
  // Arrange
  const expectedArray = [[20, 40]];
  const manager = new IntervalManager();

  // Act
  const intervals: Interval[] = [
    [10, 100],
    [10, 20],
    [40, 100],
  ];
  manager.addInterval(intervals[0]);
  manager.removeInterval(intervals[1]);
  manager.removeInterval(intervals[2]);

  const obtainedArray = manager.getIntervals();

  // Assert
  expect(obtainedArray).toStrictEqual(expectedArray);
});

test("should return [[20,40]]", () => {
  // Arrange
  const expectedArray = [[20, 40]];
  const manager = new IntervalManager();

  // Act
  const intervals: Interval[] = [
    [10, 100],
    [0, 20],
    [40, 300],
  ];
  manager.addInterval(intervals[0]);
  manager.removeInterval(intervals[1]);
  manager.removeInterval(intervals[2]);

  const obtainedArray = manager.getIntervals();

  // Assert
  expect(obtainedArray).toStrictEqual(expectedArray);
});

test("should return []", () => {
  // Arrange
  const expectedArray: Interval[] = [];
  const manager = new IntervalManager();

  // Act
  const intervals: Interval[] = [
    [10, 100],
    [0, 200],
    [0, 300],
  ];
  manager.addInterval(intervals[0]);
  manager.removeInterval(intervals[1]);
  manager.removeInterval(intervals[2]);

  const obtainedArray = manager.getIntervals();

  // Assert
  expect(obtainedArray).toStrictEqual(expectedArray);
});
