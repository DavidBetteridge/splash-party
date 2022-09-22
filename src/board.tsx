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

export function shuffle<T>(array: T[]): T[] {
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

export const initialCounts = (): MeepleCount => {
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

export const generateBoard = (): Board => {
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

const unknownPiece = (a: never) => { }

export const play = (squareNumber: SquareNumber,
  currentBoard: Board,
  meepleCount: MeepleCount): Board => {
  const pieceToMove = currentBoard[squareNumber]
  switch (pieceToMove.type) {
    case "empty":
      throw new Error("Move not allowed - the square is empty.");

    case "meeple":
      currentBoard[squareNumber] = { type: "empty" }
      currentBoard[(squareNumber + pieceToMove.value) % 18] = pieceToMove
      meepleCount[pieceToMove.colour]--;
      break;

    default:
      unknownPiece(pieceToMove)
  }

  return currentBoard
}