import React, { Component } from 'react'
import Game from './Game'


export default class App extends Component {

    state = {
        gameId : 1
    }

    resetGameFun = () =>
    {
        this.setState((prev) => {
            return {gameId : prev.gameId + 1}
        })
    }
    render() {
        return (
            <Game key = {this.state.gameId} resetGame = {this.resetGameFun} randomNumberCount = {7} initialSeconds = {10}/>
        )
    }
}

