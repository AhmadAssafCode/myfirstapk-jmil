// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { featuredProducts, categories } from '../data/products';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = () => {
        navigation.navigate('Search', { query: searchQuery });
        setSearchQuery('');
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
            <View style={styles.searchBarContainer}>
                <Searchbar
                    placeholder="ابحث عن منتج..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    onSubmitEditing={handleSearch}
                    style={styles.searchBar}
                />
            </View>

            {/* Featured Products Carousel */}
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>منتجات مميزة</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
                {featuredProducts.map((product) => (
                    <TouchableOpacity
                        key={product.id}
                        onPress={() => navigation.navigate('ProductDetail', { product })}
                    >
                        <Card style={styles.featuredCard}>
                            <View style={styles.imageContainer}>
                                <Image 
                                    source={{ uri: product.image }} 
                                    style={styles.featuredImage} 
                                    resizeMode="cover"
                                />
                            </View>
                            <Card.Content>
                                <Title style={styles.productTitle}>{product.name}</Title>
                                <Paragraph style={styles.productPrice}>{product.price} شيكل</Paragraph>
                            </Card.Content>
                        </Card>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Categories */}
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>التصنيفات</Text>
            <View style={styles.categoriesContainer}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.categoryItem}
                        onPress={() => {
                            // Navigate to the Arabic named route for products
                            navigation.navigate('المنتجات', { categoryId: category.id });
                            console.log('Navigating to المنتجات with categoryId:', category.id);
                        }}
                    >
                        <View style={styles.categoryIconContainer}>
                            <Image 
                                source={{ uri: category.icon }} 
                                style={styles.categoryIcon} 
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={[styles.categoryName, { color: isDarkMode ? '#fff' : '#000' }]}>{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Quick Links */}
            <View style={styles.quickLinksContainer}>
                <Button
                    mode="contained"
                    icon="barcode-scan"
                    style={styles.quickLinkButton}
                    onPress={() => navigation.navigate('QRScan')}
                >
                    مسح QR
                </Button>
                <Button
                    mode="contained"
                    icon="store"
                    style={styles.quickLinkButton}
                    onPress={() => navigation.navigate('Partners')}
                >
                    الشركاء
                </Button>
                <Button
                    mode="contained"
                    icon="lightbulb-outline"
                    style={styles.quickLinkButton}
                    onPress={() => navigation.navigate('SuggestProduct')}
                >
                    اقترح منتج
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBarContainer: {
        padding: 16,
    },
    searchBar: {
        borderRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    carousel: {
        paddingLeft: 16,
        paddingRight: 8,
        marginBottom: 16,
    },
    featuredCard: {
        width: 180,
        marginRight: 12,
        borderRadius: 12,
        elevation: 3,
        overflow: 'hidden',
        marginBottom: 4,
    },
    imageContainer: {
        width: '100%',
        height: 150,
        overflow: 'hidden',
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    productTitle: {
        fontSize: 16,
        marginTop: 4,
        textAlign: 'right',
    },
    productPrice: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: 'bold',
        textAlign: 'right',
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    categoryItem: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 20,
    },
    categoryIconContainer: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: '#e0f2f1',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    categoryIcon: {
        width: 76,
        height: 76,
        borderRadius: 38,
    },
    categoryName: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
    quickLinksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        marginBottom: 24,
    },
    quickLinkButton: {
        flex: 1,
        marginHorizontal: 4,
        elevation: 2,
    },
});

export default HomeScreen;