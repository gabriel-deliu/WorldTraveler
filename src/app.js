class TheWorld {
  constructor() {
    this.state = {
      traveler: [4, 4],
      goblins: [
        [2, 2],
        [8, 3],
        [3, 6]
      ],
      grid: [9,9],
      isDead: false
    };
  }
  getTravelerPosition() {
    return this.state.traveler;
  }

  reset() {
    //G: shouldn't the isDead flag be reset?
    this.state.traveler = [4, 4];
  }

  translateMove(moveInput) {
    let moveOutput = null;
    //G: shouldn't the multi move case (eg: "3w") be considered as well?
    switch(moveInput.slice(-1)) {
      case "w" :
          let x;
          // TODO refactor, this keeps on repeating
          (moveInput.substr(0, moveInput.length-1) == "")
              ? x = 1
              : x = Number(moveInput.substr(0, moveInput.length-1));
          moveOutput = [ -x, 0 ]
          break;
      case "e" :
          // The case when you receive only e(East) and no number
          (moveInput.substr(0, moveInput.length-1) == "")
              ? x = 1
              : x = Number(moveInput.substr(0, moveInput.length-1));
          moveOutput = [ x, 0 ]
          break;
      case "n" :
          let y;
          (moveInput.substr(0, moveInput.length-1) == "")
              ? y = 1
              : y = Number(moveInput.substr(0, moveInput.length-1));
          moveOutput = [ 0, -y ]
          break;
      case "s" :
          (moveInput.substr(0, moveInput.length-1) == "")
              ? y = 1
              : y = Number(moveInput.substr(0, moveInput.length-1));
          moveOutput = [ 0, y ]
          break;
      default :
          moveOutput = "Error: input not valid!";
    }

    return moveOutput;
  }

  move(...args) {
      if(this.state.traveler == "dead") {
          return "dead";
      }
      // Problems with this scope inside map loop
      var self = this;
      // Receiving array
      //G: the if can be avoided if using _.flatten(args)
      if(Array.isArray(args[0])) {
        // Take first array element, ignore rest
        args = args[0];
        // TODO refactor, this is repeating
        args.map(function(element) {
          const move = self.translateMove(element);
          const newTravelerPosition = self.state.traveler.map(function(val, i) {
              let result = val + move[i];
              // Traveler can't travel to a position smaller than 0
              result = (result < 0) ? 0 : result
              // Traveler should't pass the grid size
              result = (result > self.state.grid[0]) ? 9 : result;
              return result;
          });
          self.state.traveler = newTravelerPosition;
        });
      } else {
        // Receving strings
        //G: code seems to be similar to lines 75-82
        args.map(function(element) {
          const move = self.translateMove(element);
          self.state.traveler = self.state.traveler.map(function(val, i) {
              let result = val + move[i];
              // Traveler can't travel to a position smaller than 0
              result = (result < 0) ? 0 : result
              // Traveler should't pass the grid size
              result = (result > self.state.grid[0]) ? 9 : result;
              return result;
          });
        });
      }

      //G: This check should occure after each move. Currently you can fly over goblins. 
      //G: The check should be done via an iterator and without using JSON.stringify as string comparisons are expensive.
      if(JSON.stringify(self.state.goblins[0]) === JSON.stringify(self.state.traveler)
        || JSON.stringify(self.state.goblins[1]) === JSON.stringify(self.state.traveler)
        || JSON.stringify(self.state.goblins[2]) === JSON.stringify(self.state.traveler)) {
          self.state.isDead = true;
      }

      return self.state.traveler;
  }

  printTravelerMap() {
      for(var i=0;i<this.state.grid[0];i++){
        // line is every line that will be printed
        let line = "";
          for(var j=0;j<this.state.grid[1];j++){
            //G: this should be extracted to a function as it leads to duplicated code
            if((JSON.stringify(this.state.goblins[0]) === JSON.stringify([j, i]))
              || (JSON.stringify(this.state.goblins[1]) === JSON.stringify([j, i]))
              || (JSON.stringify(this.state.goblins[2]) === JSON.stringify([j, i]))) {
                line +="G";
            } else if(JSON.stringify(this.state.traveler) === JSON.stringify([j, i])){
                if(this.state.isDead) {
                    line +="D";
                } else {
                  line +="T";
                }
            } else {
                line +="*";
            }
        }
        console.log(line);
      }
      console.log("D='Dead Traveler'");
      console.log("T='Traveler'");
      console.log("G='Goblin'");
  }
}

export default TheWorld;
