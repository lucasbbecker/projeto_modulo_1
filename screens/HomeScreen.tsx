import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../components/Header'; // Importa o componente Header
import { StatusBar } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions , NavigationProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type LogoutProps = {
    navigation: NavigationProp<any>
}

export default function HomeScreen( {navigation}: LogoutProps) {
    
    const handleLogout = async () => {
        await AsyncStorage.removeItem('userName');
        await AsyncStorage.removeItem('userProfile');
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
            <View style={styles.container}>
                <Header />

                {/* Conteúdo da Home */}
                <View style={styles.content}>
                <Card.Title
                    title="Estoque"
                    subtitle="Clique para visualizar todos os produtos em estoque"
                    subtitleNumberOfLines={2}
                    left={(props) => <Avatar.Icon {...props} icon="warehouse" size={50} style={{ backgroundColor: 'black' }}/>}
                    right={(props) => <IconButton {...props} icon="arrow-right-bold-circle" size={55} onPress={() => {}} />}
                    style={styles.cardStyle}
                />
                <Card.Title
                    title="Usuários"
                    subtitle="Clique para visualizar todos os usuários cadastrados"
                    subtitleNumberOfLines={2}
                    left={(props) => <Avatar.Icon {...props} icon="account-circle" size={50} style={{ backgroundColor: 'black' }}/>}
                    right={(props) => <IconButton {...props} icon="arrow-right-bold-circle" size={55} onPress={() => navigation.navigate('UserList')} />}
                    style={styles.cardStyle}
                />
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Sair</Text>
                    <IconButton icon="logout" iconColor="white" size={30} />
                </TouchableOpacity>
                
                
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardStyle: {
        width: '90%',
        marginVertical: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
    },
    logoutButton: {
        backgroundColor: 'black',
        width: '90%',
        marginVertical: 10,
        padding: 10,
        paddingLeft: 25,
        borderRadius: 10,
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});
