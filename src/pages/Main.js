import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

import auth from '@react-native-firebase/auth';

function Login() {

    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState()

    function onAuthStateChanged(user) {
        setUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
        return subscriber
    }, [])

    if (initializing) return null
        
    return null
}

export default class Main extends React.Component {

    constructor(props) {

        super(props)

        this.state = {

            email: '',
            senha: ''
        }
    }

    logar = () => {

        auth()
            .signInWithEmailAndPassword(this.state.email, this.state.senha)
            .then(() => {
                console.log('Login realizado!')
                this.props.navigation.navigate('Dashboard', { JSON_user_email: this.state.email })
            })
            .catch(error => {
                console.error(error)
            })
    }

    render() {

        return (

            <View style={styles.view}>
                <Login />
                <TextInput style={styles.input} placeholder={'E-mail'} onChangeText={(text) => this.setState({ email: text })} />
                <TextInput style={styles.input} placeholder={'Senha'} onChangeText={(text) => this.setState({ senha: text })} secureTextEntry />
                <View style={styles.button}>
                    <Button title='Entrar' color='blue' onPress={this.logar} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    input: {

        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        width: 350,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 25

    },

    button: {

        marginTop: 25,
        width: 150,
        marginLeft: 'auto',
        marginRight: 'auto'

    },

    view: {

        marginTop: 'auto',
        marginBottom: 'auto'

    }
})