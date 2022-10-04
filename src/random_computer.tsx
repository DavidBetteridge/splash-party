import { SquareNumber, Game, LastMove } from "./board";

export const nextMove = async (game: Game, lastMove: LastMove) : Promise<SquareNumber> => {
  await timeout(2000)
  const board = game.Board

  while (true) {
    const squareNumber =  Math.floor(Math.random() * Object.keys(game.Board).length);
    const element = board[squareNumber];
    if (element.type === "meeple" && squareNumber !== lastMove.squareNumber) {
      return squareNumber as SquareNumber
    }
  }
}

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}