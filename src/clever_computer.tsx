import { SquareNumber, Game, LastMove, Meeple, MeepleColour } from "./board";

export class Computer {
  //known_values: { [squareNumber: number]: number } = {};
  seen = new Set<Meeple>();

  observe_move = (squareNumber: SquareNumber, lastMove: LastMove) => {
    // TODO: If we know the value of 2 meeples in a set,  we can infer the value of the 3rd
    this.seen.add(lastMove.movedPiece)
  }

  squareContains = (game: Game,
    squareNumber: SquareNumber,
    colour: MeepleColour): boolean => {
    const element = game.Board[squareNumber];
    if (element.type === "empty") {
      return false
    }

    const meeple = element as Meeple;
    return meeple.colour === colour;
  }

  squareIsEmpty = (game: Game, squareNumber: SquareNumber): boolean => {
    const element = game.Board[squareNumber];
    return (element.type === "empty")
  }

  scoreMove = (game: Game,
               squareNumber: SquareNumber,
               denominator: 1 | 2 | 3): number => {
    const element = game.Board[squareNumber];
    if (element.type === "empty") {
      return -999
    } else {
      const meeple = element as Meeple
      if (this.seen.has(meeple)) {
        // This piece has moved in the past so we know it's value
        const nextSquare = (squareNumber + meeple.value) % 18 as SquareNumber
        if (this.squareContains(game, nextSquare, game.Computer)) {
          // We would kill one of our own meeples
          return -1 / denominator
        }
        if (this.squareIsEmpty(game, nextSquare)) {
          // Neither good or bad
          return 0
        }
        // We would kill someone elses meeple
        return 1 / denominator
      }
    }
    return 0
  }

  nextMove = async (game: Game, lastMove: LastMove): Promise<SquareNumber> => {
    // Score each possible move
    //    If the value of the piece is known then
    //      if will move onto our own piece then score is -1
    //      if will move onto another piece then score is +1
    //   If the value of the piece isn't know then
    //      n =  the number of unknown values for the colour 1,2,3
    //      for each possible colour
    //        repeat the above calculation but using 1/n

    await this.timeout(2000)
    const board = game.Board

    while (true) {
      const squareNumber = Math.floor(Math.random() * Object.keys(game.Board).length);
      const element = board[squareNumber];
      if (element.type === "meeple" && squareNumber !== lastMove.squareNumber) {
        return squareNumber as SquareNumber
      }
    }
  }

  timeout = (delay: number) => {
    return new Promise(res => setTimeout(res, delay));
  }
}

