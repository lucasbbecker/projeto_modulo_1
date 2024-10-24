import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Header from '../components/Header'; // Importa o componente Header
import { StatusBar } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';

export default function HomeScreen() {
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
                    right={(props) => <IconButton {...props} icon="arrow-right-bold-circle" size={55} onPress={() => {}} />}
                    style={styles.cardStyle}
                />
                    
                    
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
    }
});
