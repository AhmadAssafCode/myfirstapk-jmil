// src/screens/SettingsScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  List, 
  Switch, 
  Divider, 
  Button, 
  Dialog, 
  Portal,
  TextInput,
  Text
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  
  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [languageDialogVisible, setLanguageDialogVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('ar');
  
  // Load settings from storage on mount
  useEffect(() => {
    loadSettings();
  }, []);
  
  const loadSettings = async () => {
    try {
      const notifications = await AsyncStorage.getItem('notificationsEnabled');
      if (notifications !== null) {
        setNotificationsEnabled(notifications === 'true');
      }
      
      const location = await AsyncStorage.getItem('locationEnabled');
      if (location !== null) {
        setLocationEnabled(location === 'true');
      }
      
      const language = await AsyncStorage.getItem('language');
      if (language !== null) {
        setSelectedLanguage(language);
      }
    } catch (e) {
      console.log('Failed to load settings:', e);
    }
  };
  
  const saveSettings = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, String(value));
    } catch (e) {
      console.log('Failed to save settings:', e);
    }
  };
  
  const handleNotificationsToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    saveSettings('notificationsEnabled', newValue);
  };
  
  const handleLocationToggle = () => {
    const newValue = !locationEnabled;
    setLocationEnabled(newValue);
    saveSettings('locationEnabled', newValue);
  };
  
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    saveSettings('language', language);
    setLanguageDialogVisible(false);
    
    // In a real app, you would reload the app with the new language
    Alert.alert(
      'تم تغيير اللغة',
      'سيتم تطبيق التغييرات عند إعادة تشغيل التطبيق',
      [{ text: 'حسناً' }]
    );
  };
  
  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من أنك تريد تسجيل الخروج؟',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'تسجيل الخروج',
          onPress: async () => {
            await logout();
            clearCart();
            // In a real app, you might navigate to a login screen here
          },
        },
      ]
    );
  };
  
  const handleClearData = () => {
    Alert.alert(
      'مسح البيانات',
      'هل أنت متأكد من أنك تريد مسح جميع البيانات المخزنة؟ لا يمكن التراجع عن هذه العملية.',
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'مسح البيانات',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              clearCart();
              Alert.alert('تم مسح البيانات', 'تم مسح جميع البيانات بنجاح.');
              loadSettings(); // Reload default settings
            } catch (e) {
              Alert.alert('خطأ', 'حدث خطأ أثناء مسح البيانات.');
            }
          },
        },
      ]
    );
  };
  
  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <List.Section>
        <List.Subheader style={{ color: isDarkMode ? '#fff' : '#000' }}>المظهر</List.Subheader>
        <List.Item
          title="الوضع المظلم"
          description="تبديل بين الوضع المظلم والفاتح"
          titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          descriptionStyle={{ color: isDarkMode ? '#ddd' : '#555' }}
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
          right={props => (
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              color="#4CAF50"
            />
          )}
        />
        
        <List.Item
          title="اللغة"
          description={selectedLanguage === 'ar' ? 'العربية' : 'English'}
          titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          descriptionStyle={{ color: isDarkMode ? '#ddd' : '#555' }}
          left={props => <List.Icon {...props} icon="translate" />}
          onPress={() => setLanguageDialogVisible(true)}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>
      
      <Divider />
      
      <List.Section>
        <List.Subheader style={{ color: isDarkMode ? '#fff' : '#000' }}>الإشعارات</List.Subheader>
        <List.Item
          title="إشعارات الطلبات"
          description="تلقي إشعارات عن حالة الطلبات"
          titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          descriptionStyle={{ color: isDarkMode ? '#ddd' : '#555' }}
          left={props => <List.Icon {...props} icon="bell" />}
          right={props => (
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              color="#4CAF50"
            />
          )}
        />
        
        <List.Item
          title="خدمات الموقع"
          description="السماح بالوصول إلى الموقع للعثور على المتاجر القريبة"
          titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          descriptionStyle={{ color: isDarkMode ? '#ddd' : '#555' }}
          left={props => <List.Icon {...props} icon="map-marker" />}
          right={props => (
            <Switch
              value={locationEnabled}
              onValueChange={handleLocationToggle}
              color="#4CAF50"
            />
          )}
        />
      </List.Section>
      
      <Divider />
      
      {/* Add Subscription Section */}
      <List.Section>
        <List.Subheader style={{ color: isDarkMode ? '#fff' : '#000' }}>الاشتراك</List.Subheader>
        <List.Item
          title="حالة الاشتراك"
          description="نشط"
          titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          descriptionStyle={{ color: '#4CAF50', fontWeight: 'bold' }}
          left={props => <List.Icon {...props} icon="check-circle" color="#4CAF50" />}
        />
        <List.Item
          title="تاريخ انتهاء الاشتراك"
          description="23/07/2026"
          titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          descriptionStyle={{ color: isDarkMode ? '#ddd' : '#555' }}
          left={props => <List.Icon {...props} icon="calendar" />}
        />
      </List.Section>
      
      <Divider />
      
      <List.Section>
        <List.Subheader style={{ color: isDarkMode ? '#fff' : '#000' }}>عنا</List.Subheader>
        <List.Item
          title="من نحن"
          description="تعرف على فريقنا وقصتنا"
          titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          descriptionStyle={{ color: isDarkMode ? '#ddd' : '#555' }}
          left={props => <List.Icon {...props} icon="information" />}
          onPress={() => navigation.navigate('AboutUs')}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        
        <List.Item
          title="الشركاء"
          description="تعرف على شركائنا"
          titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          descriptionStyle={{ color: isDarkMode ? '#ddd' : '#555' }}
          left={props => <List.Icon {...props} icon="handshake" />}
          onPress={() => navigation.navigate('Partners')}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        
        <List.Item
          title="سياسة الخصوصية"
          titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          left={props => <List.Icon {...props} icon="shield-account" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
        
        <List.Item
          title="شروط الاستخدام"
          titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          left={props => <List.Icon {...props} icon="file-document" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />
      </List.Section>
      
      <Divider />
      
      <List.Section>
        <List.Subheader style={{ color: isDarkMode ? '#fff' : '#000' }}>الحساب</List.Subheader>
        {user ? (
          <>
            <List.Item
              title="معلومات الحساب"
              description={user.email || 'المستخدم الحالي'}
              titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
              descriptionStyle={{ color: isDarkMode ? '#ddd' : '#555' }}
              left={props => <List.Icon {...props} icon="account" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
            />
            
            <List.Item
              title="تسجيل الخروج"
              titleStyle={{ color: '#F44336' }}
              left={props => <List.Icon {...props} icon="logout" color="#F44336" />}
              onPress={handleLogout}
            />
          </>
        ) : (
          <List.Item
            title="تسجيل الدخول/إنشاء حساب"
            titleStyle={{ color: isDarkMode ? '#fff' : '#000' }}
            left={props => <List.Icon {...props} icon="login" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            // In a real app, navigate to login screen
          />
        )}
      </List.Section>
      
      <Divider />
      
      <View style={styles.dangerZone}>
        <Text style={[styles.dangerZoneTitle, { color: '#F44336' }]}>منطقة الخطر</Text>
        <Button
          mode="outlined"
          color="#F44336"
          icon="delete"
          style={styles.dangerButton}
          onPress={handleClearData}
        >
          مسح جميع البيانات
        </Button>
      </View>
      
      <Text style={styles.versionText}>الإصدار 1.0.0</Text>
      
      <Portal>
        <Dialog
          visible={languageDialogVisible}
          onDismiss={() => setLanguageDialogVisible(false)}
        >
          <Dialog.Title>اختر اللغة</Dialog.Title>
          <Dialog.Content>
            <List.Item
              title="العربية"
              onPress={() => handleLanguageSelect('ar')}
              right={() => selectedLanguage === 'ar' && <Icon name="check" size={24} color="#4CAF50" />}
            />
            <List.Item
              title="English"
              onPress={() => handleLanguageSelect('en')}
              right={() => selectedLanguage === 'en' && <Icon name="check" size={24} color="#4CAF50" />}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setLanguageDialogVisible(false)}>إلغاء</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dangerZone: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F44336',
    borderRadius: 8,
    marginTop: 24,
  },
  dangerZoneTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  dangerButton: {
    borderColor: '#F44336',
  },
  versionText: {
    textAlign: 'center',
    color: '#9E9E9E',
    marginVertical: 24,
  },
});

export default SettingsScreen;