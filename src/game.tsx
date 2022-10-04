import React, { useState, useReducer } from 'react';
import { styled } from '@mui/material';
import { newGame, MeepleColour, play, SquareNumber, descriptionOfPlayersLastMove, LastMove, descriptionOfComputersLastMove } from './board'
import { nextMove } from './computer';


const CELL_SIZE = "4rem"
const NOT_A_SQUARE = -1
const CAPTURED_SQUARE = -2

const Board = styled('div')({
  backgroundColor: 'aliceblue',
  display: "grid",
  gridTemplateColumns: `repeat(5, ${CELL_SIZE})`
})

const Cell = styled('div', {
  shouldForwardProp: (prop) => prop !== "highlight",
})<{ highlight?: boolean }>(({ highlight }) => ({
  backgroundColor: highlight ? 'grey' : 'yellow',
  border: 1,
  borderStyle: "solid",
  borderColor: 'black',
  width: CELL_SIZE,
  height: CELL_SIZE,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "&:hover": {
    backgroundColor: "rgba(255, 0, 0, .5)"
  }
}));


const EmptyCell = styled('div')({
  backgroundColor: 'yellow',
  border: 1,
  borderStyle: "solid",
  borderColor: 'black',
  width: CELL_SIZE,
  height: CELL_SIZE
});

const NotACell = styled('div')({
  backgroundColor: 'blue',
  border: 1,
  borderStyle: "solid",
  borderColor: 'blue',
  width: CELL_SIZE,
  height: CELL_SIZE
});

const Meeple = styled("div", {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color?: string }>(({ color }) => ({
  backgroundColor: color,
  width: 30,
  height: 30,
  border: 1,
  borderStyle: "solid",
  borderColor: 'black',
  borderRadius: 30
}));

const colours = {
  [MeepleColour.White]: "white",
  [MeepleColour.Blue]: "blue",
  [MeepleColour.Red]: "red",
  [MeepleColour.Orange]: "orange",
  [MeepleColour.Yellow]: "yellow",
  [MeepleColour.Green]: "green"
};

function Game() {
  const [game, setGame] = useState(newGame())
  const [lastMove, setLastMove] = useState<LastMove | undefined>(undefined)
  const [message, setMessage] = useState("")
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const grid = [
    -1, 0, 1, 2, -1,
    17, -1, -1, -1, 3,
    16, -1, -1, -1, 4,
    15, -1, -2, -1, 5,
    14, -1, -1, -1, 6,
    13, -1, -1, -1, 7,
    12, -1, -1, -1, 8,
    -1, 11, 10, 9, -1
  ]


  const computersTurn = async (movePlayedByPlayer: LastMove) => {
    const moveToMake = await nextMove(game, movePlayedByPlayer)
    const movePlayed = play(moveToMake, game)
    const description = descriptionOfComputersLastMove(game, movePlayed)
    setMessage(description)
    setLastMove(movePlayed)
    forceUpdate()
  }

  const handleOnClick = (squareNumber: SquareNumber) => {
    const movePlayed = play(squareNumber, game)
    const description = descriptionOfPlayersLastMove(game, movePlayed)
    setMessage(description)
    setLastMove(movePlayed)
    forceUpdate()
    computersTurn(movePlayed)
  }

  function Piece(colour: MeepleColour, squareNumber: SquareNumber) {
    const highlight = lastMove && squareNumber === lastMove.squareNumber;
    if (highlight) {
      return (
        <Cell highlight>
          <Meeple color={colours[colour]}></Meeple>
        </Cell>);
    } else {
      return (
        <Cell
          onClick={() => handleOnClick(squareNumber)}>
          <Meeple color={colours[colour]}></Meeple>
        </Cell>);
    }
  }

  function CapturedCell() {
    if (lastMove === undefined || lastMove.capturedColour === undefined) {
      return (<NotACell />);
    } else {
      return (
        <Cell highlight>
          <Meeple color={colours[lastMove.capturedColour]}></Meeple>
        </Cell>);
    }
  }

  function PlayersCell() {
    return (
      <Cell>
        <Meeple color={colours[game.Player]}></Meeple>
      </Cell>);
  }

  return (
    <>
      <div>{message}</div>
      <Board>
        {grid.map(squareNumber => {
          if (squareNumber === NOT_A_SQUARE) {
            return (<NotACell />)
          } else if (squareNumber === CAPTURED_SQUARE) {
            return (<CapturedCell />)
          } else {
            const piece = game.Board[squareNumber];
            if (piece.type === "meeple") {
              return (Piece(piece.colour, squareNumber as SquareNumber))
            } else {
              return (<EmptyCell />)
            }
          }
        })}
      </Board>
      <div>
        You are a <PlayersCell />
      </div>
    </>
  );
}

export default Game;