// src/components/ProductCard.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../context/ThemeContext';

const ProductCard = ({ product, onPress }) => {
  const { isDarkMode } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Card style={styles.card}>
        <Card.Cover source={{ uri: product.image }} style={styles.productImage} />
        
        {product.hasDiscount && (
          <Badge 
            style={styles.discountBadge}
            size={24}
          >
            {product.discount}%
          </Badge>
        )}
        
        <Card.Content style={styles.cardContent}>
          <Title style={styles.productTitle} numberOfLines={1}>{product.name}</Title>
          
          <View style={styles.priceContainer}>
            {product.hasDiscount ? (
              <>
                <Paragraph style={styles.originalPrice}>
                  {product.originalPrice.toFixed(2)} ₪
                </Paragraph>
                <Paragraph style={styles.discountedPrice}>
                  {product.price.toFixed(2)} ₪
                </Paragraph>
              </>
            ) : (
              <Paragraph style={styles.price}>
                {product.price.toFixed(2)} ₪
              </Paragraph>
            )}
          </View>
          
          <View style={styles.detailsContainer}>
            <View style={styles.brandContainer}>
              <Paragraph style={styles.brandName} numberOfLines={1}>
                {product.brandName}
              </Paragraph>
            </View>
            
            {product.isHealthy && (
              <Icon name="heart-pulse" size={18} color="#4CAF50" style={styles.healthyIcon} />
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImage: {
    height: 140,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  originalPrice: {
    fontSize: 14,
    color: '#757575',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandContainer: {
    flex: 1,
  },
  brandName: {
    fontSize: 12,
    color: '#757575',
  },
  healthyIcon: {
    marginLeft: 4,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF5722',
    color: '#ffffff',
    fontWeight: 'bold',
    zIndex: 1,
  },
});

export default ProductCard;