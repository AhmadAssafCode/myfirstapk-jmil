// src/screens/ProductsScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Chip, Menu, Button, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { products, categories } from '../data/products';
import { manufacturers as brands } from '../data/partners';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [sortBy, setSortBy] = useState('popular'); // 'price-asc', 'price-desc', 'popular'

  // Set the selected category from navigation params when component mounts or updates
  useEffect(() => {
    if (route.params && route.params.categoryId) {
      setSelectedCategory(route.params.categoryId);
    }
  }, [route.params]);

  // Filter products based on selected filters and search query
  const filteredProducts = products.filter(product => {
    // For debugging
    console.log(`Filtering: Product ${product.id}, CategoryId ${product.categoryId}, Selected: ${selectedCategory}`);
    
    const matchesCategory = !selectedCategory || Number(product.categoryId) === Number(selectedCategory);
    const matchesBrand = !selectedBrand || product.brandId === selectedBrand;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesBrand && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    // Default: by popularity
    return b.popularity - a.popularity;
  });

  const handleSearch = () => {
    // Implemented within filter logic above
  };

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
    setSearchQuery('');
    setSortBy('popular');
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.image }} style={styles.productImage} />
        <Card.Content>
          <Title style={styles.productTitle}>{item.name}</Title>
          <Paragraph numberOfLines={2} style={styles.productDescription}>
            {item.description}
          </Paragraph>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>{item.price.toFixed(2)} ₪</Text>
            <View style={styles.productBadges}>
              {item.isHealthy && (
                <Icon name="heart-pulse" size={20} color="#4CAF50" style={styles.healthyIcon} />
              )}
              <Text style={styles.productBrand}>{item.brandName}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  // Get the active filters count for the badge
  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory) count++;
    if (selectedBrand) count++;
    if (sortBy !== 'popular') count++;
    return count;
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="ابحث عن منتج..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          style={styles.searchBar}
        />
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map(category => (
            <Chip
              key={category.id}
              selected={selectedCategory === category.id}
              onPress={() => setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )}
              style={styles.filterChip}
              textStyle={{ color: selectedCategory === category.id ? '#fff' : isDarkMode ? '#fff' : '#000' }}
            >
              {category.name}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <View style={styles.brandsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {brands.map(brand => (
            <Chip
              key={brand.id}
              selected={selectedBrand === brand.id}
              onPress={() => setSelectedBrand(
                selectedBrand === brand.id ? null : brand.id
              )}
              style={styles.filterChip}
              textStyle={{ color: selectedBrand === brand.id ? '#fff' : isDarkMode ? '#fff' : '#000' }}
            >
              {brand.name}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <View style={styles.sortContainer}>
        <View style={styles.sortButtonContainer}>
          <Button
            onPress={() => setSortMenuVisible(true)}
            icon="sort"
            mode="outlined"
            style={styles.sortButton}
          >
            {sortBy === 'popular' ? 'الأكثر شعبية' : 
             sortBy === 'price-asc' ? 'السعر: الأقل أولاً' : 'السعر: الأعلى أولاً'}
          </Button>
          <Menu
            visible={sortMenuVisible}
            onDismiss={() => setSortMenuVisible(false)}
            anchor={<View />}
            style={styles.sortMenu}
          >
            <Menu.Item
              onPress={() => {
                setSortBy('popular');
                setSortMenuVisible(false);
              }}
              title="الأكثر شعبية"
            />
            <Menu.Item
              onPress={() => {
                setSortBy('price-asc');
                setSortMenuVisible(false);
              }}
              title="السعر: الأقل أولاً"
            />
            <Menu.Item
              onPress={() => {
                setSortBy('price-desc');
                setSortMenuVisible(false);
              }}
              title="السعر: الأعلى أولاً"
            />
          </Menu>
        </View>
        
        {getActiveFiltersCount() > 0 && (
          <Button 
            onPress={resetFilters} 
            mode="text"
            icon="filter-remove"
          >
            مسح الفلاتر ({getActiveFiltersCount()})
          </Button>
        )}
      </View>

      {filteredProducts.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Icon name="magnify-close" size={80} color="#BDBDBD" />
          <Text style={[styles.noResultsText, { color: isDarkMode ? '#fff' : '#000' }]}>
            لا توجد منتجات مطابقة
          </Text>
          <Text style={styles.noResultsHint}>
            حاول تغيير معايير البحث أو الفلترة
          </Text>
          <Button 
            mode="contained" 
            onPress={resetFilters}
            style={styles.resetButton}
            icon="refresh"
          >
            عرض جميع المنتجات
          </Button>
        </View>
      ) : (
        <View style={styles.resultsContainer}>
          <Text style={[styles.resultsCount, { color: isDarkMode ? '#ddd' : '#757575' }]}>
            {filteredProducts.length} منتج
          </Text>
          <FlatList
            data={sortedProducts}
            renderItem={renderProductItem}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.productsList}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBar: {
    borderRadius: 8,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  brandsContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sortButtonContainer: {
    flex: 1,
    marginRight: 8,
  },
  sortButton: {
    borderRadius: 4,
  },
  sortMenu: {
    marginTop: 40,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsCount: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
  },
  productsList: {
    padding: 8,
    paddingBottom: 24,
  },
  productItem: {
    flex: 1,
    padding: 8,
  },
  card: {
    borderRadius: 8,
  },
  productImage: {
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'contain', // Added resizeMode to fix image fitting
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    marginTop: 0,
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  productBadges: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  healthyIcon: {
    marginLeft: 4,
  },
  productBrand: {
    fontSize: 10,
    color: '#757575',
    marginLeft: 4,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsHint: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 24,
    textAlign: 'center',
  },
  resetButton: {
    borderRadius: 8,
  }
});

export default ProductsScreen;