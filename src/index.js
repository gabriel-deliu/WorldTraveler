import TheWorld from './app';

let theWorld = new TheWorld();
console.log('Initial State');
theWorld.printTravelerMap();

theWorld.move('2e');
console.log('2e');
console.log(theWorld.state.traveler);
theWorld.printTravelerMap();

theWorld.move('e');
console.log('e');
console.log(theWorld.state.traveler);
theWorld.printTravelerMap();

theWorld.move('3n');
console.log('3n');
theWorld.printTravelerMap();

theWorld.move('7w', 's');
console.log('7w', 's');
theWorld.printTravelerMap();

theWorld.move('4n');
console.log('4n');
theWorld.printTravelerMap();

theWorld.reset();
console.log('reset');
console.log(['4s', '2w', 'n']);
theWorld.move(['4s', '2w', 'n']);
theWorld.printTravelerMap();

theWorld.reset();
console.log('reset');
console.log('2s'+' w'+" n"+" e" );
theWorld.move(['2s', 'w']);
theWorld.move("n");
theWorld.move("e");
theWorld.printTravelerMap();
