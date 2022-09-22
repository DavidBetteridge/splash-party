export enum MeepleColour {
  White,
  Blue,
  Red,
  Green,
  Yellow,
  Orange
}

export type Meeple = {
  type: "meeple"
  value: 1 | 2 | 3;
  colour: MeepleColour;
}

export type SquareNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17

export type Empty = { type: "empty" };

export type Square = Meeple | Empty;

export type Board = Array<Square>;

const shuffle = (array: Board): Board => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};

type EnumDictionary<T extends number, U> = {
  [K in T]: U;
};

type MeepleCount = EnumDictionary<MeepleColour, 0 | 1 | 2 | 3>

type Info = {
  message: string
}

type Game = {
  Player: MeepleColour
  Computer: MeepleColour
  Board: Board
  Counts: MeepleCount
}

const randomMeepleColour = (): MeepleColour => {
  return Math.floor(Math.random() * Object.keys(MeepleColour).length);
}

export const newGame = (): Game => {
  const player = randomMeepleColour()
  let computer = randomMeepleColour()
  while (player === computer) {
    computer = randomMeepleColour()
  }

  return {
    Player: player,
    Computer: computer,
    Board: generateBoard(),
    Counts: initialCounts()
  }
}

const initialCounts = (): MeepleCount => {
  const counts: MeepleCount = {
    [MeepleColour.White]: 3,
    [MeepleColour.Blue]: 3,
    [MeepleColour.Red]: 3,
    [MeepleColour.Orange]: 3,
    [MeepleColour.Yellow]: 3,
    [MeepleColour.Green]: 3
  };
  return counts;
}

const generateBoard = (): Board => {
  const unshuffled: Board = [
    { colour: MeepleColour.White, value: 1, type: "meeple" },
    { colour: MeepleColour.White, value: 2, type: "meeple" },
    { colour: MeepleColour.White, value: 3, type: "meeple" },
    { colour: MeepleColour.Blue, value: 1, type: "meeple" },
    { colour: MeepleColour.Blue, value: 2, type: "meeple" },
    { colour: MeepleColour.Blue, value: 3, type: "meeple" },
    { colour: MeepleColour.Red, value: 1, type: "meeple" },
    { colour: MeepleColour.Red, value: 2, type: "meeple" },
    { colour: MeepleColour.Red, value: 3, type: "meeple" },
    { colour: MeepleColour.Green, value: 1, type: "meeple" },
    { colour: MeepleColour.Green, value: 2, type: "meeple" },
    { colour: MeepleColour.Green, value: 3, type: "meeple" },
    { colour: MeepleColour.Yellow, value: 1, type: "meeple" },
    { colour: MeepleColour.Yellow, value: 2, type: "meeple" },
    { colour: MeepleColour.Yellow, value: 3, type: "meeple" },
    { colour: MeepleColour.Orange, value: 1, type: "meeple" },
    { colour: MeepleColour.Orange, value: 2, type: "meeple" },
    { colour: MeepleColour.Orange, value: 3, type: "meeple" },
  ]

  return shuffle(unshuffled)
}

const unknownPiece = (a: never): never => { throw new Error(""); }

export const play = (squareNumber: SquareNumber, game: Game): Info => {
  // Note;  game gets mutated
  const pieceToMove = game.Board[squareNumber]
  switch (pieceToMove.type) {
    case "empty":
      throw new Error("Move not allowed - the square is empty.");

    case "meeple":
      game.Board[squareNumber] = { type: "empty" }
      const newSquareNumber = (squareNumber + pieceToMove.value) % 18
      const captured = game.Board[newSquareNumber]
      game.Board[newSquareNumber] = pieceToMove

      if (captured.type === "meeple") {
        game.Counts[captured.colour]--;
        if (game.Counts[captured.colour] === 0) {
          if (captured.colour === game.Player) {
            return {
              message: `You moved ${pieceToMove.value} spaces and pushed in your final ${captured.colour} Meeple.`
            }
          } else if (captured.colour === game.Computer) {
            return {
              message: `You moved ${pieceToMove.value} spaces and pushed in the computers final ${captured.colour} Meeple.`
            }
          } else {
            return {
              message: `You moved ${pieceToMove.value} spaces and pushed in the final ${captured.colour} Meeple.`
            }
          }
        } else {
          return { message: `You moved ${pieceToMove.value} spaces and pushed in a ${captured.colour} Meeple` }
        }
      } else {
        return { message: `You moved ${pieceToMove.value} spaces into an empty square` }
      }

    default:
      unknownPiece(pieceToMove)
  }
  return { message: "" }
}