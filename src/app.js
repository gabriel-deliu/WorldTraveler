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
    this.state.traveler = [4, 4];
  }

  translateMove(moveInput) {
    let moveOutput = null;
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
      console.log(this.state.goblins[0]);
      console.log(this.state.goblins[1]);
      console.log(this.state.goblins[2]);
      console.log(this.state.traveler);
      console.log("D='Dead Traveler'");
      console.log("T='Traveler'");
      console.log("G='Goblin'");
  }
}

export default TheWorld;
