import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../components/Header';


interface Product {
  id: number;
  product_name: string;
  branch_name: string;
  quantity: number;
  image_url: string;
  description: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Função para buscar os produtos da API
  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(process.env.EXPO_PUBLIC_API_URL + `/products`, {
        params: { query: searchQuery },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
        <Header />
      <View style={styles.conteinerProducts}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nome ou filial"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.product_name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.product_name}</Text>
              <Text style={styles.productBranch}>Filial: {item.branch_name}</Text>
              <Text style={styles.productQuantity}>Quantidade disponível: {item.quantity}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
      </View>
    </View>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  conteinerProducts: {
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#000000',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderColor: '#000',
    borderWidth: 0.5,

  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignSelf: 'center',
  },    
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productBranch: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  productQuantity: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  productDescription: {
    fontSize: 14,
    marginTop: 4,
  },
});
