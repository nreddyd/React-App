import React, { Component } from "react";
import "./gamecontainer.css";
import clickItems from "../../clickItems.json";
import ClickItem from "../clickitem";

class GameContainer extends Component {
  state = {
    clickers: clickItems,
    score: 0,
    highScore: 0
  };

  handleItemClick = item => {
    const newClickers = this.state.clickers.map(clickItem => {
      if (clickItem.letter === item) {
        if (!clickItem.clicked) {
          clickItem.clicked = true;
          this.state.score++;
        } else {
          console.log("already clicked!");
          this.resetGame();
          console.log(this.state.score);
        }
      }
      return clickItem;
    });

    this.setState({
      clickers: this.shuffleClickers(newClickers),
      score: this.state.score,
      highScore: this.scoreCheck()
    });

    console.log(newClickers);
  };

  shuffleClickers = clickers => {
    for (let i = clickers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clickers[i], clickers[j]] = [clickers[j], clickers[i]];
    }
    return clickers;
  };

  scoreCheck = () => {
    return Math.max(this.state.score, this.state.highScore);
  };

  resetGame = () => {
    const unclicked = this.state.clickers.map(clickItem => {
      clickItem.clicked = false;
      return clickItem;
    });

    this.state.score = 0;

    this.setState({
      clickers: this.shuffleClickers(unclicked),
      score: this.state.score
    });
  };

  render() {
    console.log(this.state);
    return (
      <div className="main-wrapper">
        <div class="jumbotron jumbotron-fluid">
          <div class="container text-center">
            <h1 class="display-4">Cartoon Character Memory Clicker</h1>
            <p class="lead">
              Click all of the characters without selecting a duplicate!
            </p>
          </div>
        </div>{" "}
        <h3>Current Score: {this.state.score}</h3>
        <h4>High Score: {this.state.highScore}</h4>
        {this.state.clickers.map(item => (
          <ClickItem
            key={item.letter}
            handleItemClick={this.handleItemClick}
            letter={item.letter}
            clicked={item.clicked}
            src={item.src}
          />
        ))}
      </div>
    );
  }
}

export default GameContainer;
