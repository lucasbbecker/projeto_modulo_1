import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import axios, { AxiosError } from 'axios';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';

interface Branch {
    id: string;
    name: string;
}

interface Product {
    product_id: number;
    product_name: string;
    quantity: number;
    branch_name: string;
    branch_id: string;
}

const CreateMoviment = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [originBranch, setOriginBranch] = useState('');
    const [destinationBranch, setDestinationBranch] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [quantity, setQuantity] = useState('');
    const [observations, setObservations] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState(0);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const branchesResponse = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/branches/options`);
                const productsResponse = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/products/options`);

                setBranches(branchesResponse.data);
                setAllProducts(productsResponse.data); // Carrega todos os produtos inicialmente
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        if (originBranch) {
            const productsForBranch = allProducts.filter(product => product.branch_id === originBranch);
            setFilteredProducts(productsForBranch);
        } else {
            setFilteredProducts([]);
        }
        setSelectedProduct(0);
    }, [originBranch, allProducts]);

    const handleProductChange = (product_id: number) => {
        setSelectedProduct(product_id);
        
        // Encontrar o produto correspondente na lista de produtos
        const selectedProductDetails = allProducts.find(product => 
            product.product_id === product_id && product.branch_id === originBranch
        );

        if (selectedProductDetails) {
            setAvailableQuantity(selectedProductDetails.quantity);
            console.log('Quantidade disponível:', selectedProductDetails.quantity);
        } else {
            console.error('Produto não encontrado para a filial de origem.');
            setAvailableQuantity(0);
        }
    };

    const handleSubmit = async () => {
        if (originBranch === destinationBranch) {
            Alert.alert('Erro', 'As filiais de origem e destino devem ser diferentes.');
            return;
        }

        const parsedQuantity = parseInt(quantity);
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
            Alert.alert('Erro', 'Por favor, insira uma quantidade válida.');
            return;
        }

        if (parsedQuantity > availableQuantity) {
            Alert.alert('Erro', 'A quantidade desejada não pode ser maior do que a quantidade disponível.');
            return;
        }

        try {
            await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/movements`, {
                originBranchId: originBranch,
                destinationBranchId: destinationBranch,
                productId: selectedProduct,
                quantity: parsedQuantity,  // Usar a quantidade convertida
            });
            Alert.alert('Sucesso', 'Movimentação cadastrada com sucesso!');
        } catch (error) {
            const axiosError = error as AxiosError; // Tipagem do erro

            if (axiosError.response && axiosError.response.status === 400) {
                const errorMessage = (axiosError.response?.data as { message: string })?.message || 'Erro desconhecido';
                Alert.alert('Erro', errorMessage);
            } else {
                console.error('Error creating movement:', error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
            <View>
                <Header />
                <View style={styles.container}>
                    <Text style={styles.title}>Criar Movimentação</Text>
                    <Text>Filial de Origem</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={originBranch} style={styles.picker} onValueChange={(itemValue) => setOriginBranch(itemValue)} >
                            {branches.map((branch) => (
                                <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
                            ))}
                        </Picker>
                    </View>
                    <Text>Filial de Destino</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={destinationBranch} style={styles.picker} onValueChange={(itemValue) => setDestinationBranch(itemValue)}>
                            {branches.map((branch) => (
                                <Picker.Item key={`dest-${branch.id}`} label={branch.name} value={branch.id} />
                            ))}
                        </Picker>
                    </View>
                    <Text>Produto</Text>
                    <View style={styles.pickerContainer}>
                        <Picker selectedValue={selectedProduct} onValueChange={handleProductChange} style={styles.picker}>
                            {filteredProducts.map((product) => (
                                <Picker.Item key={product.product_id} label={`${product.product_name} - Quantidade: ${product.quantity}`} value={product.product_id} />
                            ))}
                        </Picker>
                    </View> 
                    <Text>Quantidade</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={quantity}
                        onChangeText={(text) => setQuantity(text)}
                        style={styles.input}
                    />

                    <Text>Observações</Text>
                    <TextInput
                        multiline
                        value={observations}
                        onChangeText={(text) => setObservations(text)}
                        style={styles.input}
                    />

                    <Button title="Cadastrar" onPress={handleSubmit} />
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
        padding: 16,
        gap: 10,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'center',
    },
    input: {
        width: '100%',
        height: 60,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 18,
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        overflow: 'hidden',
    },
    picker: {
        height: 60,
        width: '100%',
    },
});

export default CreateMoviment;
