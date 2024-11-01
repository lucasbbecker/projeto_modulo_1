import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
import Header from '../components/Header';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, NavigationProp } from '@react-navigation/native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

interface Movement {
    id: string;
    produto: {
        nome: string;
        imagem: string;
    };
    quantidade: number;
    status: string;
    origem: {
        nome: string;
        latitude: number;
        longitude: number;
    };
    destino: {
        nome: string;
        latitude: number;
        longitude: number;
    };
    dataCriacao: string;
    historico: {
        id: string;
        descricao: string;
        data: string;
        file: string;
    }[];
}

type LogoutProps = {
    navigation: NavigationProp<any>
}

export default function MovementListDriver({ navigation }: LogoutProps) {
    const [movements, setMovements] = useState<Movement[]>([]);

    useEffect(() => {
        fetchMovements();
    }, []);

    const fetchMovements = async () => {
        try {
            const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/movements`);
            setMovements(response.data);
        } catch (error) {
            console.error('Error fetching movements:', error);
        }
    };

    const handleImageUpload = async (id: string, endpoint: string) => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permissão para acessar a câmera é necessária!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!result.canceled) {
            const uri = result.assets[0].uri;

            // Criação do FormData
            const formData = new FormData();
            formData.append('file', {
                uri,
                type: 'image/jpeg',  // Ajuste o tipo conforme o tipo de imagem
                name: 'image.jpg'     // Nome do arquivo a ser enviado
            });

            // Adiciona o nome do motorista
            const motorista = await AsyncStorage.getItem('userName') || '';
            formData.append('motorista', motorista);

            console.log('Form Data:', formData);

            try {
                // Envio da requisição
                await axios.put(`http://10.0.0.101:3000/movements/${id}/${endpoint}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                    },
                });
                fetchMovements(); // Atualiza a lista após envio bem-sucedido
            } catch (error) {
                console.error('Erro ao enviar a imagem:', error);
            }
        }
    };
    
    const getProgressPercentage = (status: string) => {
        if (status === 'created') return 33;
        if (status === 'em transito') return 66;
        if (status === 'Coleta finalizada') return 100;
        return 0;
    };

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

    const renderMovement = ({ item }: { item: Movement }) => {
        let cardStyle = styles.card;
        let buttonText = '';
        let buttonAction = () => {};
        const progress = getProgressPercentage(item.status);

        if (item.status === 'created') {
            cardStyle = { ...styles.card, backgroundColor: 'white' };
            buttonText = 'Iniciar Entrega';
            buttonAction = () => handleImageUpload(item.id, 'start');
        } else if (item.status === 'em transito') {
            cardStyle = { ...styles.card, backgroundColor: 'white' };
            buttonText = 'Finalizar Entrega';
            buttonAction = () => handleImageUpload(item.id, 'end');
        } else if (item.status === 'Coleta finalizada') {
            cardStyle = { ...styles.card, backgroundColor: 'white' };
        }

        return (
            <View style={cardStyle}>
                <Image source={{ uri: item.produto.imagem }} style={styles.productImage} />
                <Text><Text style={{ fontWeight: 'bold' }}>Produto:</Text> {item.produto.nome}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Quantidade:</Text> {item.quantidade} unidades</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Data de Criação:</Text> {new Date(item.dataCriacao).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Origem:</Text> {item.origem.nome}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Destino:</Text> {item.destino.nome}</Text>
                
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
                
                <Text><Text style={{ fontWeight: 'bold' }}>Status:</Text> {item.status}</Text>
                
                {buttonText ? (
                    <TouchableOpacity onPress={buttonAction} style={styles.actionButton}>
                        <Text style={styles.buttonText}>{buttonText}</Text>
                        <IconButton icon="camera" iconColor="white" size={20} />
                    </TouchableOpacity>
                ) : null}

                {(item.status === 'created' || item.status === 'em transito') && (
                    <TouchableOpacity onPress={() => navigation.navigate('Mapa', { origem: item.origem, destino: item.destino })} style={styles.actionButton}>
                        <Text style={styles.buttonText}>Mapa</Text>
                        <IconButton icon="map-marker-path" iconColor="white" size={20} />
                    </TouchableOpacity>
                )}
            </View>
        );
        
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
            <View style={styles.container}>
                <Header />
                <View style={styles.content}>
                    <Text style={styles.welcomeText}>Movimentações</Text>
                    <FlatList
                        data={movements}
                        renderItem={renderMovement}
                        keyExtractor={(item) => item.id}
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
        paddingHorizontal: 20,
    },
    card: {
        width: '100%',
        marginVertical: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 10,
        borderColor: '#black',
        borderWidth: 1,
        elevation: 5,
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
        alignSelf: 'center',
    },
    actionButton: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        paddingHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 10,
        backgroundColor: 'black',
        borderRadius: 5,
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
    progressContainer: {
        height: 10,
        width: '100%',
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginVertical: 10,
    },
    progressBar: {
        height: 10,
        backgroundColor: '#76c7c0',
        borderRadius: 5,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
