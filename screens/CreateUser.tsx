import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import Header from "../components/Header"
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import validator from 'validator'
import axios from 'axios'
import { NavigationProp } from "@react-navigation/native";

type CreationProps = {
    navigation: NavigationProp<any>
}

export default function CreateUsers({ navigation }: CreationProps) {

    const [profile, setProfile] = useState('motorista')
    const [name, setName] = useState('')
    const [document, setDocument] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errorMessage, setErrorMessage] = useState('')

    function submitUser() {

        setErrorMessage('')

        if (!name || !document || !address || !email || !password || !confirmPassword) {
            setErrorMessage('Ops, faltou preencher algum campo!')
            return
        }

        if (!validator.isEmail(email)) {
            setErrorMessage('O formato de e-mail é inválido!')
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('As senhas inseridas são diferentes!')
            return
        }

        axios.post(process.env.EXPO_PUBLIC_API_URL + '/register', {
            profile: profile,
            name: name,
            document: document,
            full_address: address,
            email: email,
            password: password
        })
            .then((response) => {
                console.log('Usuário cadastrado com sucesso:', response.data)
                Alert.alert('Cadastro criado com sucesso!')
                navigation.navigate('UserList')
            })
            .catch(() => {
                console.log('Erro ao cadastrar usuário')
            })
    }

    function switchProfileBranch() {
        setProfile('filial')
    }

    function switchProfileDriver() {
        setProfile('motorista')
    }

    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header />
            <View style={styles.containerProfile}>
                <View style={styles.switchProfiles}>
                    <TouchableOpacity style={[styles.icons, profile === 'filial' ? styles.selected : null]} onPress={switchProfileBranch}>
                        <MaterialCommunityIcons
                            name='office-building'
                            size={50}
                            color='black'
                        />
                    </TouchableOpacity>
                    <Text style={styles.textSwitch}>Filial</Text>
                </View>
                <View style={styles.switchProfiles}>
                    <TouchableOpacity style={[styles.icons, profile === 'motorista' ? styles.selected : null]} onPress={switchProfileDriver}>
                        <MaterialCommunityIcons
                            name='car'
                            size={50}
                            color='black'
                        />
                    </TouchableOpacity>
                    <Text style={styles.textSwitch}>Motorista</Text>
                </View>
            </View>




            <View style={styles.formContainer}>

                <Text style={styles.textTitle}>Dados Pessoais</Text>

                <Text style={styles.textInput}>Nome Completo</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.textInput}>{profile === 'motorista' ? 'CPF' : 'CNPJ'}</Text>
                <TextInput
                    style={styles.input}
                    value={document}
                    onChangeText={setDocument}
                    keyboardType='numeric'
                />
                <Text style={styles.textInput}>Endereço Completo</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                />
                <Text style={styles.textTitle}>Dados de login</Text>
                <Text style={styles.textInput}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <Text style={styles.textInput}>Senha</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Text style={styles.textInput}>Confirme a senha</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.buttonSubmit} onPress={submitUser}>
                    <Text style={styles.textButton}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeStyle: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    container: {
        flex: 1,
    },
    icons: {
        width: 70,
        height: 70,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        borderColor: '#a8a8a8',
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selected: {
        borderColor: 'black'
    },
    containerProfile: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 30,
        width: '100%',
        justifyContent: 'space-around'
    },
    input: {
        width: '100%',
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        paddingLeft: 5,
    },
    textInput: {
        alignSelf: 'flex-start'
    },
    textTitle: {
        fontSize: 20,
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
    },
    textSwitch: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: 5
    },
    formContainer: {
        width: '85%',
        alignItems: 'center',
        margin: 30
    },
    buttonSubmit: {
        backgroundColor: '#000000',
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 25
    },
    scroll: {
        alignItems: 'center',
        paddingBottom: 30,
    },
    errorText: {
        color: '#ff0000'
    },
    switchProfiles: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
});
