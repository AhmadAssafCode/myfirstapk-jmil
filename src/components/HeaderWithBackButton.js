// src/components/HeaderWithBackButton.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HeaderWithBackButton = ({ title, rightAction }) => {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  return (
    <Appbar.Header
      style={[
        styles.header,
        { backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff' }
      ]}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="arrow-right"
          size={24}
          color={isDarkMode ? '#ffffff' : '#000000'}
        />
      </TouchableOpacity>
      
      <Appbar.Content
        title={title}
        titleStyle={[
          styles.title,
          { color: isDarkMode ? '#ffffff' : '#000000' }
        ]}
      />
      
      {rightAction}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { height: 1, width: 0 },
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HeaderWithBackButton;