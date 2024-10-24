import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import { Avatar, IconButton} from 'react-native-paper';

interface User {
    id: string;
    name: string;
    profile: string;
    isActive: boolean;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const navigation = useNavigation();    

    useEffect(() => {
        axios.get(process.env.EXPO_PUBLIC_API_URL + '/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const toggleUserStatus = (userId: string, currentStatus: boolean) => {
        axios.patch(process.env.EXPO_PUBLIC_API_URL + `/users/${userId}/toggle-status`)
            .then(response => {
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.id === userId ? { ...user, isActive: !currentStatus } : user,
                        
                    )
                );
            })
            .catch(error => {
                console.error('Error toggling user status:', error);
            });
    };

    const renderItem = ({ item }: { item: User }) => (
        <View style={[styles.card, item.isActive ? styles.activeCard : styles.inactiveCard]}>
            <View style={styles.row}>
            {item.profile === 'Motorista' ? (
                <Avatar.Icon size={50} icon="car" color='black' style={{ backgroundColor: 'white' }}/>
            ) : (
                <Avatar.Icon size={50} icon="office-building" color='black' style={{ backgroundColor: 'white' }}/>
            )}
            <Switch
                value={item.isActive}
                trackColor={{ false: 'red', true: 'green' }}
                onValueChange={() => toggleUserStatus(item.id, item.isActive)}
            />
            </View>
            <Text style={styles.fontCard}>{item.name}</Text>
            <Text style={styles.fontCard}>Status: {item.isActive ? 'Ativo' : 'Inativo'}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <IconButton
                icon="arrow-left"
                size={30}
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            />

            <Header />

            <TouchableOpacity 
                style={styles.addUserButton}
                onPress={() => navigation.navigate('CreateUser')}
            >
                <Text style={styles.addUserButtonText}>Adicionar Usuário</Text>
            </TouchableOpacity>

            <FlatList
                
                data={users}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: '43%',
        padding: 16,
        margin: 8,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#000',
    },
    activeCard: {
        borderColor: 'green',
    },
    inactiveCard: {
        borderColor: 'red',
    },
    backButton: {
        margin: 10,
        alignSelf: 'flex-start',
    },
    addUserButton: {
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'flex-end',
    },
    addUserButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    fontCard: {
        marginTop: 5,
        fontSize: 15,
        color: '#FFF',
        fontWeight: 'bold',
    },
});
