import { SquareNumber, Game, LastMove } from "./board";

export const nextMove = async (game: Game, lastMove: LastMove) : Promise<SquareNumber> => {
  await timeout(2000)

  const board = game.Board
  for (let index = 0; index < board.length; index++) {
    const element = board[index];
    if (element.type === "meeple" && index !== lastMove.squareNumber) {
      return index as SquareNumber
    }
  }
  return 0
}

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}