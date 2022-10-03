import React, { useState, useReducer } from 'react';
import { styled } from '@mui/material';
import { newGame, MeepleColour, play, SquareNumber, descriptionOfLastMove } from './board'

const CELL_SIZE = "4rem"
const NOT_A_SQUARE = -1

const Board = styled('div')({
  backgroundColor: 'aliceblue',
  display: "grid",
  gridTemplateColumns: `repeat(5, ${CELL_SIZE})`
})

const Cell = styled('div')({
  backgroundColor: 'yellow',
  border: 1,
  borderStyle: "solid",
  borderColor: 'black',
  width: CELL_SIZE,
  height: CELL_SIZE
});

const EmptyCell = styled('div')({
  backgroundColor: 'green',
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
  const [message, setMessage] = useState("")
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  const grid = [
    -1, 0, 1, 2, -1,
    17, -1, -1, -1, 3,
    16, -1, -1, -1, 4,
    15, -1, -1, -1, 5,
    14, -1, -1, -1, 6,
    13, -1, -1, -1, 7,
    12, -1, -1, -1, 8,
    -1, 11, 10, 9, -1
  ]


  const handleOnClick = (squareNumber: SquareNumber) => {
    const lastMove = play(squareNumber, game)
    const description = descriptionOfLastMove(game, lastMove)
    setMessage(description)
    forceUpdate()
  }

  function Piece(colour: MeepleColour, squareNumber: SquareNumber) {
    return (<Cell onClick={() => handleOnClick(squareNumber)}>{colours[colour]}</Cell>);
  }

  return (
    <>
      <div>{message}</div>
      <Board>
        {grid.map(squareNumber => {
          if (squareNumber == NOT_A_SQUARE) {
            return (<NotACell />)
          } else {
            const piece = game.Board[squareNumber];
            if (piece.type == "meeple") {
              return (Piece(piece.colour, squareNumber as SquareNumber))
            } else {
              return (<EmptyCell />)
            }
          }
        })}
      </Board>
    </>
  );
}

export default Game;