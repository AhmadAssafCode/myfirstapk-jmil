// src/screens/OrdersScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph, Chip, ActivityIndicator } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import 'moment/locale/ar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Set Arabic locale for dates
moment.locale('ar');

const OrdersScreen = () => {
  const { isDarkMode } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load orders from storage or API
    const loadOrders = async () => {
      try {
        const storedOrders = await AsyncStorage.getItem('orders');
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        } else {
          // For demo purposes, create some sample orders
          const sampleOrders = [
            {
              id: '1001',
              date: new Date(2023, 3, 15).toISOString(),
              status: 'delivered',
              total: 156.75,
              items: [
                { id: 1, name: 'حليب كامل الدسم', price: 12.50, quantity: 2 },
                { id: 2, name: 'جبن شيدر', price: 23.75, quantity: 1 },
                { id: 5, name: 'زبادي بالفراولة', price: 18.00, quantity: 3 },
              ]
            },
            {
              id: '1002',
              date: new Date(2023, 3, 10).toISOString(),
              status: 'delivered',
              total: 210.25,
              items: [
                { id: 3, name: 'لحم بقري مفروم', price: 45.75, quantity: 2 },
                { id: 7, name: 'خبز عربي', price: 5.50, quantity: 3 },
                { id: 9, name: 'زيت زيتون', price: 38.25, quantity: 1 },
              ]
            },
            {
              id: '1003',
              date: new Date(2023, 2, 28).toISOString(),
              status: 'processing',
              total: 325.00,
              items: [
                { id: 11, name: 'عصير برتقال طبيعي', price: 15.00, quantity: 2 },
                { id: 14, name: 'دجاج كامل', price: 55.00, quantity: 3 },
                { id: 18, name: 'بسكويت شوكولاتة', price: 12.50, quantity: 1 },
              ]
            }
          ];
          
          await AsyncStorage.setItem('orders', JSON.stringify(sampleOrders));
          setOrders(sampleOrders);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadOrders();
  }, []);

  // Calculate total loyalty points based on order totals (1000 shekels = 100 points)
  const calculateTotalPoints = () => {
    const totalAmount = orders.reduce((sum, order) => sum + order.total, 0);
    return Math.floor(totalAmount / 1000 * 100);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return '#FFC107';
      case 'shipped':
        return '#2196F3';
      case 'delivered':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'قيد المعالجة';
      case 'shipped':
        return 'تم الشحن';
      case 'delivered':
        return 'تم التوصيل';
      case 'cancelled':
        return 'ملغي';
      default:
        return 'غير معروف';
    }
  };

  const renderOrderItem = ({ item }) => (
    <Card style={styles.orderCard}>
      <Card.Content>
        <View style={styles.orderHeader}>
          <View>
            <Title style={[styles.orderId, { color: isDarkMode ? '#fff' : '#000' }]}>
              طلب #{item.id}
            </Title>
            <Paragraph style={styles.orderDate}>
              {moment(item.date).format('DD MMMM YYYY')}
            </Paragraph>
          </View>
          <Chip 
            mode="outlined" 
            style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
            textStyle={{ color: getStatusColor(item.status) }}
          >
            {getStatusText(item.status)}
          </Chip>
        </View>
        
        <View style={styles.orderItems}>
          {item.items.map((product) => (
            <View key={product.id} style={styles.orderItem}>
              <Text style={[styles.itemName, { color: isDarkMode ? '#ddd' : '#333' }]}>
                {product.name} (×{product.quantity})
              </Text>
              <Text style={styles.itemPrice}>
                {(product.price * product.quantity).toFixed(2)} شيكل
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.orderFooter}>
          <Text style={[styles.totalLabel, { color: isDarkMode ? '#fff' : '#000' }]}>الإجمالي:</Text>
          <Text style={styles.totalValue}>{item.total.toFixed(2)} شيكل</Text>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 16, color: isDarkMode ? '#fff' : '#000' }}>جاري تحميل الطلبات...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
        <Icon name="package-variant" size={80} color="#BDBDBD" />
        <Text style={[styles.emptyText, { color: isDarkMode ? '#fff' : '#000' }]}>
          لا توجد طلبات سابقة
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.ordersList}
        ListFooterComponent={() => (
          <View style={styles.pointsContainer}>
            <Text style={[styles.pointsTitle, { color: isDarkMode ? '#fff' : '#000' }]}>نقاط الولاء</Text>
            <View style={[styles.pointsCard, { backgroundColor: isDarkMode ? '#1E1E1E' : '#fff' }]}>
              <View style={styles.pointsContent}>
                <Icon name="star-circle" size={40} color="#FFC107" />
                <View style={styles.pointsTextContainer}>
                  <Text style={styles.pointsValue}>{calculateTotalPoints()}</Text>
                  <Text style={[styles.pointsLabel, { color: isDarkMode ? '#ddd' : '#757575' }]}>نقطة</Text>
                </View>
              </View>
              <Text style={[styles.pointsInfo, { color: isDarkMode ? '#bbb' : '#757575' }]}>
                كل 1000 شيكل = 100 نقطة
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  ordersList: {
    padding: 16,
    paddingBottom: 24,
  },
  orderCard: {
    marginBottom: 16,
    borderRadius: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 18,
  },
  orderDate: {
    fontSize: 14,
    color: '#757575',
  },
  statusChip: {
    height: 32,
  },
  orderItems: {
    marginVertical: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  itemName: {
    flex: 1,
  },
  itemPrice: {
    fontWeight: 'bold',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  // Points section styles
  pointsContainer: {
    padding: 16,
    marginTop: 8,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  pointsCard: {
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  pointsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsTextContainer: {
    marginLeft: 16,
  },
  pointsValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFC107',
  },
  pointsLabel: {
    fontSize: 14,
  },
  pointsInfo: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default OrdersScreen;