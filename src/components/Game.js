import React, { Component } from 'react'
import {View, Text, StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types'
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle'

export default class Game extends Component {

    // target  = 10 + Math.floor(40 * Math.random());

    static propTypes = {
        randomNumberCount : PropTypes.string.isRequired,
        initialSeconds : PropTypes.number.isRequired,
        resetGame :PropTypes.func.isRequired
    };

    state = {
        selectedIdx : [],
        secondsRem : this.props.initialSeconds,
    }

    randomNumbers = Array
                .from({length : this.props.randomNumberCount})
                .map(() => 1 + Math.floor(10 * Math.random()))

    shuffleRandomNums = shuffle(this.randomNumbers);
    target = this.shuffleRandomNums.slice(0, this.props.randomNumberCount - 2)
            .reduce((acc, cur) => acc + cur, 0);

    gameStatus = 'Playing'

    isNumberSelected = (numIdx) => {
        return this.state.selectedIdx.indexOf(numIdx) >= 0;
    }

    selectNumber = (numIdx) => {
        this.setState((prev) => ( 
            {
                selectedIdx : [...prev.selectedIdx, numIdx]
            }
        ));
    }

    changeGameStatus = (nxtState) =>{
        const sumSelected = nxtState.selectedIdx.reduce((acc, cur) => {
            return acc + this.randomNumbers[cur];
        },0)
        console.log(sumSelected);

        if(nxtState.secondsRem === 0)
            return 'Lost'

        if(sumSelected < this.target)
            return 'Playing';
        if(sumSelected == this.target)
            return 'Won'
        else
            return 'Lost'
    }

    componentDidMount () {

        this.intervalId = setInterval(() =>{
            this.setState((prev)=>{
                return {secondsRem : prev.secondsRem - 1}
            },
            () => {
                if(this.state.secondsRem === 0)
                    clearInterval(this.intervalId);
            })
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    componentWillUpdate(nxtProps, nxtState){
        if(this.state.selectedIdx !== nxtState.selectedIdx || nxtState.secondsRem === 0)
            this.gameStatus = this.changeGameStatus(nxtState);

        if(this.gameStatus !== 'Playing')
            clearInterval(this.intervalId);
    }

    reset = () => {
        this.props.resetGame();
    }


    render() {
        const gameStatus= this.gameStatus;
        const seconds = this.state.secondsRem;
        return (
            <View style = {styles.container}>
                <Text style = {[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
                <View style = {styles.randomContainer}>
                    {
                        this.randomNumbers.map(
                            (num, idx) => 
                            <RandomNumber 
                            key ={idx} 
                            id = {idx}
                            number = {num}
                            isSelected = {this.isNumberSelected(idx) || gameStatus !== 'Playing'}
                            onPress = {this.selectNumber}/>
                        )
                    }
                </View>
                {/* <Text>{gameStatus}</Text> */}
                <Text style = {styles.timer}>{seconds}</Text>
                {   
                    this.gameStatus !== 'Playing' &&
                    <Button title = "Play Again" onPress = {this.reset} style = {styles.btns}/>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container : {
        backgroundColor : '#999',
        flex : 1,
    },
    target : {
        marginHorizontal : 50,
        backgroundColor : '#1e1e1e',
        fontSize : 40,
        color : 'white',
        padding : 10,
        marginTop : 10,
        textAlign : 'center'
    },
    randomContainer : {
        flex : 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
        justifyContent : 'space-around',
        margin : 10
    },

    STATUS_Won : {
        backgroundColor : 'green'
    },

    STATUS_Lost : {
        backgroundColor : 'red'
    },

    STATUS_Playing : {
        backgroundColor : '#1e1e1e'
    },
    timer : {
        fontSize : 50,
        fontWeight : 'bold',
        // textAlign : 'center',
        padding : 15,
        color : 'blue'
    },
    btns : {
        margin : 20,
        backgroundColor : '#000',
        fontSize : 40
    }
   
})