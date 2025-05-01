// src/screens/QRScanScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// إصدار بديل مؤقت بدون استخدام الكاميرا وماسح الباركود
// استخدم هذا حتى تتمكن من تثبيت وحدة expo-barcode-scanner بشكل صحيح

const QRScanScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      Alert.alert('خطأ', 'الرجاء إدخال قيمة');
      return;
    }

    // محاكاة مسح الرمز وإرسال المستخدم إلى شاشة تفاصيل المنتج
    if (inputValue.startsWith('product:')) {
      const productId = inputValue.split(':')[1];
      navigation.navigate('ProductDetail', { 
        product: { id: productId } // في التطبيق الحقيقي، يتم جلب بيانات المنتج بواسطة المعرف
      });
    } else {
      Alert.alert(
        'تم إدخال الرمز',
        `هل تريد فتح هذا الرابط؟\n${inputValue}`,
        [
          {
            text: 'إلغاء',
            style: 'cancel',
          },
          {
            text: 'فتح',
            onPress: () => {
              // في نسخة حقيقية ستستخدم Linking.openURL
              Alert.alert('تم', 'سيتم فتح الرابط في متصفح الويب');
            },
          },
        ]
      );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <View style={styles.contentContainer}>
        <Icon name="qrcode-scan" size={80} color={isDarkMode ? '#fff' : '#000'} style={styles.icon} />
        
        <Text style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
          مسح رمز QR
        </Text>
        
        <Text style={[styles.description, { color: isDarkMode ? '#ddd' : '#555' }]}>
          هذه نسخة مؤقتة. الرجاء إدخال قيمة الرمز يدويًا للاختبار.
          (استخدم "product:1" لمحاكاة مسح رمز لمنتج)
        </Text>
        
        <TextInput
          label="قيمة الرمز"
          value={inputValue}
          onChangeText={setInputValue}
          style={styles.input}
          mode="outlined"
        />
        
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          icon="check"
        >
          إرسال
        </Button>
        
        <Text style={[styles.noteText, { color: isDarkMode ? '#aaa' : '#777' }]}>
          ملاحظة: لاستخدام ماسح الباركود الحقيقي، ستحتاج إلى تثبيت وحدة expo-barcode-scanner بشكل صحيح.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  button: {
    width: '100%',
    paddingVertical: 8,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default QRScanScreen;