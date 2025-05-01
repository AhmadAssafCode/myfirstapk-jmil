// src/screens/ProductDetailScreen.js
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { Text, Card, Button, Divider, Chip, List } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { manufacturers } from '../data/partners';

const windowWidth = Dimensions.get('window').width;

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const { addToCart } = useCart();
  const { isDarkMode } = useTheme();
  const [quantity, setQuantity] = useState(1);

  // العثور على معلومات الشركة المصنعة
  const manufacturer = manufacturers.find(m => m.id === product.brandId);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigation.navigate('السلة');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.productName, { color: isDarkMode ? '#fff' : '#000' }]}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price.toFixed(2)} ₪</Text>
        </View>
        
        <View style={styles.badgeContainer}>
          {product.isHealthy && (
            <Chip icon="heart-pulse" style={styles.healthyChip}>صحي</Chip>
          )}
          <Chip icon="tag" style={styles.categoryChip}>{product.categoryName}</Chip>
          <Chip 
            icon="factory" 
            style={styles.brandChip}
            onPress={() => navigation.navigate('Partners', { filterType: 'manufacturers' })}
          >
            {product.brandName}
          </Chip>
        </View>
        
        <Divider style={styles.divider} />
        
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>الوصف</Text>
        <Text style={[styles.description, { color: isDarkMode ? '#ddd' : '#333' }]}>
          {product.description}
        </Text>
        
        <Divider style={styles.divider} />
        
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>المعلومات الغذائية</Text>
        <Card style={styles.nutritionCard}>
          <Card.Content>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>السعرات الحرارية:</Text>
              <Text style={styles.nutritionValue}>{product.nutrition?.calories || 0} سعرة</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>البروتين:</Text>
              <Text style={styles.nutritionValue}>{product.nutrition?.protein || 0} جرام</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>الكربوهيدرات:</Text>
              <Text style={styles.nutritionValue}>{product.nutrition?.carbs || 0} جرام</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={styles.nutritionLabel}>الدهون:</Text>
              <Text style={styles.nutritionValue}>{product.nutrition?.fat || 0} جرام</Text>
            </View>
          </Card.Content>
        </Card>
        
        {product.recipes && product.recipes.length > 0 && (
          <>
            <Divider style={styles.divider} />
            <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>وصفات مقترحة</Text>
            <Card style={styles.recipesCard}>
              <Card.Content>
                <List.Section>
                  {product.recipes.map((recipe, index) => (
                    <List.Item
                      key={index}
                      title={recipe.title}
                      description={recipe.description}
                      left={props => <List.Icon {...props} icon="food" />}
                      titleStyle={{ fontWeight: 'bold' }}
                    />
                  ))}
                </List.Section>
              </Card.Content>
            </Card>
          </>
        )}
        
        <Divider style={styles.divider} />
        
        {/* معلومات المنتج والمصنّع */}
        <View style={styles.manufacturerContainer}>
          <View style={styles.manufacturerInfo}>
            <Icon name="information-outline" size={20} color="#2196F3" style={styles.infoIcon} />
            <Text style={styles.manufacturerText}>
              من إنتاج <Text style={styles.manufacturerName}>{product.brandName}</Text> - {manufacturer?.location}
            </Text>
          </View>
          
          <View style={styles.originContainer}>
            <Icon name="map-marker" size={20} color="#4CAF50" />
            <Text style={styles.originText}>منتج فلسطيني</Text>
          </View>
        </View>
        
        {/* حجز المنتج */}
        <View style={styles.quantityContainer}>
          <Text style={[styles.quantityLabel, { color: isDarkMode ? '#fff' : '#000' }]}>
            الكمية:
          </Text>
          <View style={styles.quantityControls}>
            <Button
              mode="contained"
              onPress={decrementQuantity}
              style={styles.quantityButton}
              labelStyle={styles.quantityButtonLabel}
            >
              -
            </Button>
            <Text style={[styles.quantityValue, { color: isDarkMode ? '#fff' : '#000' }]}>{quantity}</Text>
            <Button
              mode="contained"
              onPress={incrementQuantity}
              style={styles.quantityButton}
              labelStyle={styles.quantityButtonLabel}
            >
              +
            </Button>
          </View>
        </View>
        
        {/* عرض السعر الإجمالي */}
        <View style={styles.totalPriceContainer}>
          <Text style={[styles.totalPriceLabel, { color: isDarkMode ? '#fff' : '#000' }]}>
            الإجمالي:
          </Text>
          <Text style={styles.totalPriceValue}>
            {(product.price * quantity).toFixed(2)} ₪
          </Text>
        </View>
        
        <Button
          mode="contained"
          icon="cart-plus"
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          إضافة إلى السلة
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImage: {
    width: windowWidth,
    height: windowWidth * 0.75,
    resizeMode: 'contain', // Changed from 'cover' to 'contain'
  },
  contentContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  healthyChip: {
    backgroundColor: '#E8F5E9',
    marginRight: 8,
    marginBottom: 8,
  },
  categoryChip: {
    backgroundColor: '#E3F2FD',
    marginRight: 8,
    marginBottom: 8,
  },
  brandChip: {
    backgroundColor: '#FFF3E0',
    marginRight: 8,
    marginBottom: 8,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  nutritionCard: {
    marginTop: 8,
  },
  nutritionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  nutritionLabel: {
    fontSize: 16,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipesCard: {
    marginTop: 8,
  },
  manufacturerContainer: {
    marginBottom: 16,
  },
  manufacturerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  manufacturerText: {
    fontSize: 14,
    color: '#2196F3',
  },
  manufacturerName: {
    fontWeight: 'bold',
  },
  originContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quantityLabel: {
    fontSize: 18,
    marginRight: 16,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonLabel: {
    fontSize: 20,
    marginHorizontal: 0,
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 16,
  },
  totalPriceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPriceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  addToCartButton: {
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 24,
  },
});

export default ProductDetailScreen;