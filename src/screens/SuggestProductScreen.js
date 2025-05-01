// src/screens/SuggestProductScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { 
  TextInput, 
  Button, 
  Headline, 
  Text, 
  Switch, 
  RadioButton, 
  Divider,
  Chip
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { categories } from '../data/products';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SuggestProductScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  
  // Form state
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isHealthy, setIsHealthy] = useState(false);
  const [productType, setProductType] = useState('food'); // 'food', 'drink', 'other'
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  // Form validation
  const [nameError, setNameError] = useState('');
  const [brandError, setBrandError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    
    if (!productName.trim()) {
      setNameError('يرجى إدخال اسم المنتج');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!brand.trim()) {
      setBrandError('يرجى إدخال اسم الشركة المصنعة');
      isValid = false;
    } else {
      setBrandError('');
    }
    
    if (!description.trim()) {
      setDescriptionError('يرجى إدخال وصف للمنتج');
      isValid = false;
    } else {
      setDescriptionError('');
    }
    
    return isValid;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      // In a real app, you would send this data to your backend
      // For demo purposes, we'll just show a success message
      Alert.alert(
        'تم إرسال الاقتراح',
        'شكراً لك! تم استلام اقتراحك وسيتم مراجعته قريباً.',
        [
          {
            text: 'حسناً',
            onPress: () => navigation.goBack(),
          }
        ]
      );
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
        <View style={styles.content}>
          <Headline style={[styles.title, { color: isDarkMode ? '#fff' : '#000' }]}>
            اقتراح منتج جديد
          </Headline>
          <Text style={[styles.subtitle, { color: isDarkMode ? '#ddd' : '#555' }]}>
            شاركنا باقتراحاتك لإضافة منتجات جديدة إلى التطبيق
          </Text>
          
          <Divider style={styles.divider} />
          
          <TextInput
            label="اسم المنتج *"
            value={productName}
            onChangeText={setProductName}
            style={styles.input}
            error={!!nameError}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
          
          <TextInput
            label="الشركة المصنعة *"
            value={brand}
            onChangeText={setBrand}
            style={styles.input}
            error={!!brandError}
          />
          {brandError ? <Text style={styles.errorText}>{brandError}</Text> : null}
          
          <TextInput
            label="وصف المنتج *"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={styles.textArea}
            error={!!descriptionError}
          />
          {descriptionError ? <Text style={styles.errorText}>{descriptionError}</Text> : null}
          
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            التصنيف
          </Text>
          <View style={styles.categoriesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map(cat => (
                <Chip
                  key={cat.id}
                  selected={category === cat.id}
                  onPress={() => setCategory(cat.id)}
                  style={styles.categoryChip}
                  mode="outlined"
                >
                  {cat.name}
                </Chip>
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: isDarkMode ? '#fff' : '#000' }]}>
              هل المنتج صحي؟
            </Text>
            <Switch
              value={isHealthy}
              onValueChange={setIsHealthy}
              color="#4CAF50"
            />
          </View>
          
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            نوع المنتج
          </Text>
          <RadioButton.Group onValueChange={value => setProductType(value)} value={productType}>
            <View style={styles.radioContainer}>
              <View style={styles.radioItem}>
                <RadioButton value="food" color="#4CAF50" />
                <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>طعام</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="drink" color="#4CAF50" />
                <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>مشروب</Text>
              </View>
              <View style={styles.radioItem}>
                <RadioButton value="other" color="#4CAF50" />
                <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>أخرى</Text>
              </View>
            </View>
          </RadioButton.Group>
          
          <TextInput
            label="معلومات إضافية (اختياري)"
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            multiline
            numberOfLines={3}
            style={styles.textArea}
          />
          
          <View style={styles.buttonsContainer}>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.button}
            >
              إلغاء
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.button}
            >
              إرسال الاقتراح
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  divider: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  textArea: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  errorText: {
    color: '#F44336',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoryChip: {
    marginRight: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  switchLabel: {
    fontSize: 16,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 8,
  },
});

export default SuggestProductScreen;