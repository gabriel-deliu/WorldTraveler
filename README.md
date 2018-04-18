
To run tests please execute in command line the following:
#node t

To view program execution please execute in command line the following:
#npm run build
#node dist/index.js

Thanks for tacking the time to view my code!

# Lost Traveller

## The Exercise

The goal of this exercise is to create a module which implements a simulation of a Traveller moving
around the World.

When required / imported two functions should be available `move()` and `reset()`.

The `move()` function accepts arguments in 2 forms.

If the first argument is a string, it should be assumed that all arguments are strings representing
a movement in the notation shown below. The function can be passed multiple strings! If the first
argument is an array then it should be treated as an array of movement strings. There will only be
one array supplied, any other arguments are ignored.

The string should be of the form `${movementCount}${direction}` where:

`movementCount` is the number of spaces to move the Traveller
`direction` is the direction in which to move the Traveller based on compass points.
  * `n` for `north` should move the Traveller up
  * `e` for `east` should move the Traveller right
  * `s` for `south` should move the Traveller down
  * `w` for `west` should move the Traveller left

## The World

* The world is represented as a *9x9* Grid.
* The Traveller starts in the middle (4,4), marked as `T`.
* There are 3 goblins, marked as `G`.

This is how the world looks at the start of the simulation:

```
. . . . . . . . .
. . . . . . . . .
. . G . . . . . .
. . . . . . . . G
. . . . T . . . .
. . . . . . . . .
. . . G . . . . .
. . . . . . . . .
. . . . . . . . .
```

It's up to you how you want to represent the World in your code. We don't dictate any particular
internal representation but the grid above is an accurate representation of the initial state of
the World.

## move()

Define a `move()` function that moves the traveller around the world. The `move` function takes
movement arguments which should move the Traveller around the world grid. They are in the following
format, where there will be a direction and a number of spaces to move:

```javascript
    move('e') //moves the traveller one space to the right
    move('2s') //moves the traveller 2 spaces down
    move('7w') //moves the traveller 7 spaces left
    move('3n') //moves the traveller 3 spaces up
```

The return type of the `move()` function is a grid coordinate which tells us where the Traveller
now is after moving. The grid coordinate looks like `[x, y]`. e.g:

```javascript
    // assuming the traveller is as [4,4] on the grid
    move('2e') // -> [6,4]
    move('e') // -> [7,4]
    move('3n') // -> [7,1]
```

The Traveller should not be able to move past the edges of the grid, but should keep moving as far
as she can in the direction given. For example:

```javascript
    // assuming the traveller is at [0,2] on the grid
    move('4n') // -> [0,0]
```

The function should be able to handle *multiple* string arguments passed in too:

```javascript
    // assuming the traveller is as [4,4] on the grid
    move('2e', 'e', '3n') // -> [7,1]
```

The `move()` function should also be able to receive arguments as a single array and should process
the list of actions. The array can be any length:

```javascript
    // assuming the traveller is as [4,4] on the grid
    move(['4s', '2w', 'n']) // -> [2,7]
    move(['2n', '3e', '2s']) // -> [7,4]
```

## reset()

The `reset()` function should reset the state back to the initial state, where the Traveller is
alive in the center of the World. It does not need to return anything.

*Your move() and reset() functions should be exported such that they can be used by other files.*

## Goblins

There are 3 Goblins on the grid. If the movement that a traveller takes moves her over the space
with a Goblin, the Traveller is `'dead'`. Once this has happened, the Traveller will take no more
movement actions and the `move()` function should just return `'dead'`:


```javascript
    // assuming the traveller is as [4,4] on the grid and there is a Goblin at [3,6]
    move(['2s', '4w']) // -> 'dead'
    move('n') // -> 'dead'
    move('e') // -> 'dead'
```

The position of the Goblins is marked on the Grid at the top of this README.

## The Output

Please don't put this on GitHub or anywhere publicly accessible. We would like you to email us a
zip file or share a link to a service like Dropbox with the solution, as well as any extra
instructions.
