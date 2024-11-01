import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IconButton } from 'react-native-paper';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import Header from '../components/Header';
import axios from 'axios';

type Movement = {
    id: number;
    produto: { nome: string; imagem: string }; // Adicionando a imagem ao tipo
    quantidade: number;
    status: string;
    origem: { nome: string };
    destino: { nome: string };
    dataCriacao: string;
    historico: Array<{ id: number; descricao: string; data: string; file: string }>;
};

type ProductsListProps = {
    navigation: NavigationProp<any>;
};

const MovimentList: React.FC<ProductsListProps> = ({ navigation }) => {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar movimentações
    const fetchMovements = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/movements`);
            setMovements(response.data); // Ajuste para usar a resposta diretamente
        } catch (error) {
            console.error('Erro ao buscar as movimentações:', error);
        } finally {
            setLoading(false);
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
            <Text>Produto: {item.produto.nome} - {item.quantidade} unidades</Text>
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
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
            <View style={styles.container}>
                <Header />
                <FlatList
                    style={{ marginBottom: 80 }}
                    data={movements}
                    keyExtractor={(item) => item.id.toString()}
                    initialScrollIndex={0}
                    renderItem={renderItem}
                    contentContainerStyle={styles.flatListContent}
                    ListEmptyComponent={<Text>Não há movimentações disponíveis.</Text>} // Mensagem quando a lista estiver vazia
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('CreateMoviment')}
                    >
                        <Text style={styles.addButtonText}>Adicionar Nova Movimentação</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 18 }}>Sair</Text>
                        <IconButton icon="logout" iconColor="white" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    flatListContent: {
        padding: 16,
        paddingBottom: 80, // Espaço para os botões na parte inferior
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
    buttonContainer: {
        padding: 16,
        position: 'absolute', // Fixa a posição na parte inferior
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f0f0f0', // Cor de fundo para os botões
    },
    addButton: {
        backgroundColor: '#00e070',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: 'black',
        width: '100%',
        padding: 10,
        paddingLeft: 35,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});

export default MovimentList;
