import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default class Dashboard extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            email: this.props.navigation.state.params.JSON_user_email,
            counter: 0
        }
    }

    componentDidMount() {

        firestore()
            .collection('users')
            .doc(this.state.email)
            .get({ source: "server" })
            .then(querysnapshot => {

                this.setState({

                    counter: querysnapshot.data().loginCounter + 1
                })
            })
            .then(
                this.counterUp               
            )
            
    }

    counterUp = () => {

        const userReference = firestore().doc(`users/${this.state.email}`)

        return firestore().runTransaction(async transaction => {

            const userSnapshot = await transaction.get(userReference)

            await transaction.update(userReference, {
                loginCounter: userSnapshot.data().loginCounter + 1
            })
        })

    }


    deslogar = () => {

        auth()
            .signOut()
            .then(() => {
                console.log('Deslogado')
                this.props.navigation.navigate('Main')
            })
    }

    render() {

        return (
            <View style={styles.view}>
                <Text style={styles.text}>Numero de Logins: {this.state.counter}</Text>
                <View style={styles.button}>
                    <Button color='blue' title='Deslogar' onPress={this.deslogar} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    button: {

        marginTop: 25,
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto'

    },

    view: {

        marginTop: 'auto',
        marginBottom: 'auto'

    },

    text: {

        textAlign: 'center',
        fontSize: 30
    }

})