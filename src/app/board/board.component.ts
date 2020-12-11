import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: any[];
  xIsNext: boolean;
  winner: string;
  draw: boolean;
  count: number;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = null;
    this.draw = false;
    this.count = 0;
  }

  get nameOfPlayer() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(i: number) {
    if(!this.squares[i]) {
      this.squares.splice(i, 1, this.nameOfPlayer);
      this.xIsNext = !this.xIsNext;
      this.count += 1;
    }
    this.winner = this.calculateWinner();
    if(this.count == 9 && this.winner == null) {
      this.draw = true;
    }
  }

  calculateWinner() {
    const winningMoves = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 4, 6], [2, 5, 8], [6, 7, 8], [3, 4, 5]];
    for(let i = 0; i < winningMoves.length; i++) {
      const [a, b, c] = winningMoves[i];
      if(this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return this.squares[a];
      }
    }
    return null;
  }

}
