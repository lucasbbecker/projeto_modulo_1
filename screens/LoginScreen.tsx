import React, { useState, useEffect } from 'react';
import { CommonActions, NavigationProp } from "@react-navigation/native";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from "axios";
import LottieView from 'lottie-react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginProps = {
    navigation: NavigationProp<any>
}

const isValidEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};


export default function LoginScreen({ navigation }: LoginProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const profileRouteMap: Record<string, string> = {
        admin: 'Home',
        filial: 'MovementList',
        motorista: '', // Substitua pelo nome real da rota
    };

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }
        if (!isValidEmail(email)) {
            setErrorMessage('Formato de e-mail inválido');
            return;
        }
        axios.post(`${process.env.EXPO_PUBLIC_API_URL}/login`, { email, password })
            .then(async (response) => {
                await AsyncStorage.setItem('userName', response.data.name);
                await AsyncStorage.setItem('userProfile', response.data.profile);
                console.log('Login efetuado com sucesso:', response.data);

                const routeName = profileRouteMap[response.data.profile];
                if (routeName) {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: routeName }],
                        })
                    );
                }
            })
            .catch((error) => {
                console.log('Erro:', error.response ? error.response.data : error.message);
                setErrorMessage('Credenciais incorretas, tente novamente.');
            });
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userProfile = await AsyncStorage.getItem('userProfile');
                if (userProfile) {
                    const routeName = profileRouteMap[userProfile];
                    if (routeName) {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: routeName }],
                            })
                        );
                    }
                }
            } catch (error) {
                console.log('Erro ao verificar status de login:', error);
            }
        };

        checkLoginStatus();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../src/animations/login-animation.json')}
                style={{ height: 350, width: 350}}
                autoPlay loop
            />
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#5E8C75"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#5E8C75"
            />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text>Entrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        backgroundColor: "#d8ede0",
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '85%'
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#00e070",
        padding: 10,
        borderRadius: 10,
        width: '85%'
    } ,
    errorText: {
        color: '#ff0000',
        marginTop: 10
    }
});

