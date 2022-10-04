import { SquareNumber, Game, LastMove } from "./board";

export class Computer {
  
  nextMove = async (game: Game, lastMove: LastMove) : Promise<SquareNumber> => {
    await this.timeout(2000)
    const board = game.Board
  
    while (true) {
      const squareNumber =  Math.floor(Math.random() * Object.keys(game.Board).length);
      const element = board[squareNumber];
      if (element.type === "meeple" && squareNumber !== lastMove.squareNumber) {
        return squareNumber as SquareNumber
      }
    }
  }
  
  timeout = (delay: number) => {
    return new Promise( res => setTimeout(res, delay) );
  }
}

