import TheWorld from './app';

let theWorld = null;

beforeAll(() => {
  theWorld = new TheWorld();
});

test('test reset method', () => {
  theWorld.reset();
  const travelerPosition = theWorld.getTravelerPosition();
  expect(travelerPosition).toEqual([4,4])
});

test('test translateMove method', () => {
    const moveNorth = theWorld.translateMove("3n");
    expect(moveNorth).toEqual([0, -3]);
    const moveSouth = theWorld.translateMove("6s");
    expect(moveSouth).toEqual([0, 6]);
    const moveWest = theWorld.translateMove("9w");
    expect(moveWest).toEqual([-9, 0]);
    const moveEast = theWorld.translateMove("e");
    expect(moveEast).toEqual([1, 0]);
    const error = theWorld.translateMove("3");
    expect(error).toEqual("Error: input not valid!");
});

test('test move method', () => {
    theWorld.move('2e', 'e', '3n');
    let travelerPosition = theWorld.getTravelerPosition();
    expect(travelerPosition).toEqual([7,1]);

    theWorld.reset();
    theWorld.move('2e');
    travelerPosition = theWorld.getTravelerPosition();
    expect(travelerPosition).toEqual([6,4]);
    theWorld.move('e');
    travelerPosition = theWorld.getTravelerPosition();
    expect(travelerPosition).toEqual([7,4]);
    theWorld.move('3n');
    travelerPosition = theWorld.getTravelerPosition();
    expect(travelerPosition).toEqual([7,1]);
    theWorld.move('7w', 's');
    travelerPosition = theWorld.getTravelerPosition();
    expect(travelerPosition).toEqual([0,2]);
    theWorld.move('4n');
    travelerPosition = theWorld.getTravelerPosition();
    expect(travelerPosition).toEqual([0,0]);
    theWorld.move('10s');
    travelerPosition = theWorld.getTravelerPosition();
    expect(travelerPosition).toEqual([0,9]);

    theWorld.reset();
    theWorld.move(['4s', '2w', 'n']);
    travelerPosition = theWorld.getTravelerPosition();
    expect(travelerPosition).toEqual([2,7]);

    theWorld.reset();
    theWorld.move(['2n', '3e', '2s']);
    travelerPosition = theWorld.getTravelerPosition();
    expect(travelerPosition).toEqual([7,4]);

    theWorld.reset();
    theWorld.move(['2s', 'w']);
    travelerPosition = theWorld.getTravelerPosition();
    expect(theWorld.state.isDead).toEqual(true);

    theWorld.move("n");
    travelerPosition = theWorld.getTravelerPosition();
    expect(theWorld.state.isDead).toEqual(true);

    theWorld.move("e");
    travelerPosition = theWorld.getTravelerPosition();
    expect(theWorld.state.isDead).toEqual(true);
});

afterAll(() => {
  theWorld = null;
});
