// src/screens/SearchScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Searchbar, Card, Title, Paragraph, ActivityIndicator, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { products } from '../data/products';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'حليب', 'جبن', 'زبادي', 'خضروات'
  ]);

  // تنفيذ البحث عند تحميل الصفحة إذا كان هناك استعلام بحث
  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  }, [searchQuery]); // تم إضافة searchQuery إلى مصفوفة التبعيات

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const filteredResults = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setSearchResults(filteredResults);
      setLoading(false);
      
      // Add to recent searches if not already there
      if (query.trim() && !recentSearches.includes(query.trim())) {
        setRecentSearches(prev => [query.trim(), ...prev].slice(0, 5));
      }
    }, 500);
  };

  const handleSearch = () => {
    performSearch(searchQuery);
  };

  const handleRecentSearchPress = (query) => {
    setSearchQuery(query);
    performSearch(query);
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      style={styles.resultItem}
    >
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {item.image ? (
            <Card.Cover source={{ uri: item.image }} style={styles.productImage} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
          <View style={styles.productInfo}>
            <Title style={[styles.productTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              {item.name}
            </Title>
            <Paragraph numberOfLines={2} style={styles.productDescription}>
              {item.description}
            </Paragraph>
            <Paragraph style={styles.productPrice}>
              {item.price} شيكل
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderRecentSearch = ({ item }) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      onPress={() => handleRecentSearchPress(item)}
    >
      <Icon name="history" size={18} color="#757575" style={styles.recentSearchIcon} />
      <Text style={styles.recentSearchText}>{item}</Text>
    </TouchableOpacity>
  );

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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={{ marginTop: 16, color: isDarkMode ? '#fff' : '#000' }}>
            جاري البحث...
          </Text>
        </View>
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.resultsList}
        />
      ) : searchQuery.trim() ? (
        <View style={styles.noResultsContainer}>
          <Icon name="magnify-close" size={80} color="#BDBDBD" />
          <Text style={[styles.noResultsText, { color: isDarkMode ? '#fff' : '#000' }]}>
            لا توجد نتائج لـ "{searchQuery}"
          </Text>
          <Text style={styles.noResultsSuggestion}>
            حاول استخدام كلمات بحث مختلفة أو أكثر عمومية
          </Text>
        </View>
      ) : (
        <View style={styles.recentSearchesContainer}>
          <Text style={[styles.recentSearchesTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            عمليات البحث الأخيرة
          </Text>
          <FlatList
            data={recentSearches}
            renderItem={renderRecentSearch}
            keyExtractor={item => item}
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
  },
  searchBar: {
    borderRadius: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsList: {
    padding: 16,
  },
  resultItem: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  placeholderImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
  },
  productDescription: {
    fontSize: 12,
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  noResultsText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSuggestion: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  recentSearchesContainer: {
    flex: 1,
    padding: 16,
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  recentSearchIcon: {
    marginRight: 12,
  },
  recentSearchText: {
    fontSize: 16,
  },
});

export default SearchScreen;