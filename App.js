import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { I18nManager } from 'react-native';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CartScreen from './src/screens/CartScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import PartnersScreen from './src/screens/PartnersScreen';
import QRScanScreen from './src/screens/QRScanScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import AboutUsScreen from './src/screens/AboutUsScreen';
import SearchScreen from './src/screens/SearchScreen';
import SuggestProductScreen from './src/screens/SuggestProductScreen';

// Import context
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { ThemeProvider } from './src/context/ThemeContext';

// Force RTL layout for Arabic
I18nManager.forceRTL(true);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'الرئيسية') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'المنتجات') {
            iconName = focused ? 'shopping' : 'shopping-outline';
          } else if (route.name === 'السلة') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'طلباتي') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
          } else if (route.name === 'الإعدادات') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4CAF50',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="الرئيسية" component={HomeScreen} />
      <Tab.Screen name="المنتجات" component={ProductsScreen} />
      <Tab.Screen name="السلة" component={CartScreen} />
      <Tab.Screen name="طلباتي" component={OrdersScreen} />
      <Tab.Screen name="الإعدادات" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Load theme preference from storage
    const loadTheme = async () => {
      try {
        const themeMode = await AsyncStorage.getItem('themeMode');
        if (themeMode !== null) {
          setIsDarkMode(themeMode === 'dark');
        }
      } catch (e) {
        console.log('Failed to load theme preferences');
      }
    };
    
    loadTheme();
  }, []);
  
  const toggleTheme = () => {
    const newThemeMode = !isDarkMode;
    setIsDarkMode(newThemeMode);
    AsyncStorage.setItem('themeMode', newThemeMode ? 'dark' : 'light');
  };
  
  const theme = isDarkMode ? DarkTheme : DefaultTheme;
  const paperTheme = isDarkMode ? PaperDarkTheme : PaperDefaultTheme;
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={{ isDarkMode, toggleTheme }}>
        <AuthProvider>
          <CartProvider>
            <PaperProvider theme={paperTheme}>
              <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
              <NavigationContainer theme={theme}>
                <Stack.Navigator initialRouteName="MainTabs" screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="MainTabs" component={MainTabs} />
                  <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: true, title: 'تفاصيل المنتج' }} />
                  <Stack.Screen name="QRScan" component={QRScanScreen} options={{ headerShown: true, title: 'مسح QR' }} />
                  <Stack.Screen name="Partners" component={PartnersScreen} options={{ headerShown: true, title: 'الشركاء' }} />
                  <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: true, title: 'من نحن' }} />
                  <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true, title: 'البحث' }} />
                  <Stack.Screen name="SuggestProduct" component={SuggestProductScreen} options={{ headerShown: true, title: 'اقتراح منتج' }} />
                </Stack.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
