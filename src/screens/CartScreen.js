// src/screens/CartScreen.js
import React from 'react';
import { View, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { Text, Card, Button, Divider, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      Alert.alert('السلة فارغة', 'الرجاء إضافة منتجات إلى السلة قبل الطلب');
      return;
    }

    Alert.alert(
      'تأكيد الطلب',
      'هل أنت متأكد من أنك تريد إكمال عملية الشراء؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'تأكيد',
          onPress: async () => {
            try {
              // إنشاء طلب جديد
              const totalAmount = getTotal();
              const newOrder = {
                id: 'ORD' + Date.now(),
                date: new Date().toISOString(),
                status: 'processing',
                total: totalAmount,
                items: [...cart]
              };

              // جلب الطلبات الحالية من التخزين
              const existingOrdersJSON = await AsyncStorage.getItem('orders');
              let orders = [];
              
              if (existingOrdersJSON) {
                orders = JSON.parse(existingOrdersJSON);
              }

              // إضافة الطلب الجديد إلى المصفوفة
              orders.unshift(newOrder); // إضافة في المقدمة

              // حفظ الطلبات المحدثة في التخزين
              await AsyncStorage.setItem('orders', JSON.stringify(orders));

              // مسح السلة
              clearCart();
              
              Alert.alert('تم الطلب بنجاح', 'سيتم توصيل طلبك قريباً!');
              navigation.navigate('طلباتي');
            } catch (error) {
              console.error('Error saving order:', error);
              Alert.alert('خطأ', 'حدث خطأ أثناء حفظ الطلب. الرجاء المحاولة مرة أخرى.');
            }
          },
        },
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <Card style={styles.cartItem}>
      <View style={styles.cartItemContent}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={[styles.itemName, { color: isDarkMode ? '#fff' : '#000' }]}>{item.name}</Text>
          
          {/* عرض معلومات السعر مع وبدون خصم */}
          {item.hasDiscount ? (
            <View style={styles.priceRow}>
              <Text style={styles.originalItemPrice}>{item.originalPrice} ₪</Text>
              <Text style={styles.discountedItemPrice}>{item.price} ₪</Text>
              <Text style={styles.discountTag}>خصم {item.discount}%</Text>
            </View>
          ) : (
            <Text style={styles.itemPrice}>{item.price} ₪</Text>
          )}
          
          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              size={20}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            />
            <Text style={[styles.quantityText, { color: isDarkMode ? '#fff' : '#000' }]}>{item.quantity}</Text>
            <IconButton
              icon="plus"
              size={20}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            />
          </View>
        </View>
        <View style={styles.itemActions}>
          <Text style={styles.itemTotal}>{(item.price * item.quantity).toFixed(2)} ₪</Text>
          <IconButton
            icon="delete"
            size={24}
            color="#F44336"
            onPress={() => removeFromCart(item.id)}
          />
        </View>
      </View>
    </Card>
  );

  if (cart.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
        <Icon name="cart-off" size={80} color="#BDBDBD" />
        <Text style={[styles.emptyText, { color: isDarkMode ? '#fff' : '#000' }]}>السلة فارغة</Text>
        <Button
          mode="contained"
          icon="shopping"
          onPress={() => navigation.navigate('المنتجات')}
          style={styles.shopButton}
        >
          تسوق الآن
        </Button>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.cartList}
      />
      
      <Card style={styles.summaryCard}>
        <Card.Content>
          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: isDarkMode ? '#fff' : '#000' }]}>الإجمالي:</Text>
            <Text style={styles.totalValue}>
              {getTotal().toFixed(2)} ₪
            </Text>
          </View>
          
          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              icon="cart-remove"
              onPress={() => clearCart()}
              style={styles.clearButton}
            >
              إفراغ السلة
            </Button>
            <Button
              mode="contained"
              icon="check"
              onPress={handleCheckout}
              style={styles.checkoutButton}
            >
              إتمام الشراء
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
  },
  shopButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  cartList: {
    padding: 16,
    paddingBottom: 200, // Extra space for summary card
  },
  cartItem: {
    marginBottom: 12,
    borderRadius: 8,
  },
  cartItemContent: {
    flexDirection: 'row',
    padding: 12,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 14,
    color: '#4CAF50',
  },
  originalItemPrice: {
    fontSize: 12,
    color: '#757575',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  discountedItemPrice: {
    fontSize: 14,
    color: '#FF5722',
    fontWeight: 'bold',
    marginRight: 6,
  },
  discountTag: {
    fontSize: 12,
    color: '#FF5722',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  itemActions: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  summaryCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  clearButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 8,
  },
  checkoutButton: {
    flex: 2,
    borderRadius: 8,
  },
});

export default CartScreen;