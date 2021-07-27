import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

export default class RandomNumber extends Component {

    static propTypes = {
        number : PropTypes.number.isRequired,
        onPress : PropTypes.func.isRequired,
        id : PropTypes.number.isRequired,
        isSelected : PropTypes.bool.isRequired

    }

    handlePress = () => {
        console.log(this.props.number)
        if(!this.props.isSelected)
        this.props.onPress(this.props.id);
    }

    render() {
        return (
            <TouchableOpacity onPress = {this.handlePress}>
                <Text style = {[styles.random, this.props.isSelected && styles.selected_op]}>{this.props.number}</Text>
            </TouchableOpacity>
            
        )
    }
}



const styles = StyleSheet.create({
    random : {
        backgroundColor : '#888',
        fontSize : 35,
        width : 100,
        margin : 15,
        textAlign : 'center',
        padding : 15

    },
    selected_op : {
        opacity : 0.4
    }
})
