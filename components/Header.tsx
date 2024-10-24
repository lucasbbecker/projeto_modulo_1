import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function Header() {
    const [userName, setUserName] = useState('');
    const [userProfile, setUserProfile] = useState('');

    useEffect(() => {
        // Função para carregar os dados do AsyncStorage
        const loadUserData = async () => {
            try {
                const name = await AsyncStorage.getItem('userName');
                const profile = await AsyncStorage.getItem('userProfile');
                if (name !== null && profile !== null) {
                    setUserName(name);
                    setUserProfile(profile);
                }
            } catch (error) {
                console.log('Erro ao carregar dados do AsyncStorage:', error);
            }
        };

        loadUserData();
    }, []);

    return (
        <View style={styles.header}>
            <FontAwesome style={styles.profileIcon} name="user-circle" size={60} color="rgb(253, 250, 250)" />
            <View style={styles.profileInfo}>
                <Text style={styles.headerText}>{userName}</Text>
                <Text style={styles.profileText}>Perfil: {userProfile}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#00e070',
        padding: 20,
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    profileText: {
        fontSize: 14,
        color: '#fff',
    },
    profileIcon: {		
        borderRadius: 25,		
        justifyContent: 'flex-start',	
        alignItems: 'flex-start',	
    },
    profileInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    }
});