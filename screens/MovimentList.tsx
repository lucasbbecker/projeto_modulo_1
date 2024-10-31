import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton, List } from 'react-native-paper';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import Header from '../components/Header';
import { contains } from 'validator';

type Movement = {
    id: number;
    origem: { nome: string };
    destino: { nome: string };
    produto: { nome: string };
    status: string;
};

type ProductsListProps = {
    navigation: NavigationProp<any>;
};

type LogoutProps = {
    navigation: NavigationProp<any>
}


const MovimentList: React.FC<ProductsListProps> = ({ navigation }: LogoutProps) => {
    const [movements, setMovements] = useState<Movement[]>([]);

    // Função para buscar movimentações
    const fetchMovements = async () => {
        try {
            const response = await fetch(process.env.EXPO_PUBLIC_API_URL + `/movements`);
            const data = await response.json();
            setMovements(data);
        } catch (error) {
            console.error('Erro ao buscar as movimentações:', error);
        }
    };

    // Buscar as movimentações quando a tela carregar
    useEffect(() => {
        fetchMovements();
    }, []);

    // Função para renderizar cada item da lista de movimentações
    const renderItem = ({ item }: { item: Movement }) => (
        <View style={styles.card}>
            <Text>Origem: {item.origem.nome}</Text>
            <Text>Destino: {item.destino.nome}</Text>
            <Text>Produto: {item.produto.nome}</Text>
            <Text>Status: {item.status}</Text>
        </View>
    );

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
        <View style={styles.container}>
            <Header />
            <View style={styles.list}>
                <FlatList
                    data={movements}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('')}
                >
                    <Text style={styles.addButtonText}>Adicionar Nova Movimentação</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Sair</Text>
                    <IconButton icon="logout" iconColor="white" size={30} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
    },
    addButton: {
        backgroundColor: '#00e070',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        height: 25,
    },
    logoutButton: {
        backgroundColor: 'black',
        width: '100%',
        marginVertical: 10,
        padding: 10,
        paddingLeft: 25,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});

export default MovimentList;
