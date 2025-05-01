// src/screens/PartnersScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { Text, Card, Divider, Chip, Button, Searchbar, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { partners } from '../data/partners';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PartnersScreen = () => {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'cafe', 'clothes', 'pharmacy', 'perfume'
  const [showDiscountInfo, setShowDiscountInfo] = useState(false);

  // تصفية الشركاء حسب النوع والبحث
  const getFilteredPartners = () => {
    // الفلترة حسب نوع الشريك
    let baseList = partners;
    if (filterType !== 'all') {
      baseList = partners.filter(partner => {
        if (filterType === 'cafe') {
          return partner.type.includes('مقهى') || partner.type.includes('مطعم');
        } else if (filterType === 'clothes') {
          return partner.type.includes('ملابس') || partner.type.includes('أزياء');
        } else if (filterType === 'pharmacy') {
          return partner.type.includes('صيدلية');
        } else if (filterType === 'perfume') {
          return partner.type.includes('عطور');
        }
        return false;
      });
    }
    
    // تطبيق البحث إذا كان موجودًا
    if (searchQuery.trim()) {
      return baseList.filter(item => 
        item.name.includes(searchQuery) || 
        item.location.includes(searchQuery) ||
        item.description.includes(searchQuery)
      );
    }
    
    return baseList;
  };

  const filteredPartners = getFilteredPartners();

  const renderPartnerItem = (item) => {
    return (
      <Card style={styles.partnerCard} key={item.id}>
        <Card.Content>
          <View style={styles.partnerHeader}>
            {item.logo ? (
              <Image source={{ uri: item.logo }} style={styles.partnerLogo} />
            ) : (
              <View style={[styles.placeholderLogo, { backgroundColor: item.color || '#E0E0E0' }]}>
                <Text style={styles.placeholderText}>{item.name.charAt(0)}</Text>
              </View>
            )}
            <View style={styles.partnerInfo}>
              <Text style={[styles.partnerName, { color: isDarkMode ? '#fff' : '#000' }]}>{item.name}</Text>
              <View style={styles.locationContainer}>
                <Icon name="map-marker" size={16} color="#757575" style={styles.locationIcon} />
                <Text style={styles.partnerLocation}>{item.location}</Text>
              </View>
              
              <Chip 
                icon="ticket-percent" 
                style={styles.discountChip}
                mode="outlined"
              >
                خصم {item.discount}% للمشتركين
              </Chip>
            </View>
          </View>
          
          <Divider style={styles.divider} />
          
          <Text style={[styles.partnerDescription, { color: isDarkMode ? '#ddd' : '#555' }]}>
            {item.description}
          </Text>
          
          <View style={styles.specialtiesContainer}>
            <Text style={[styles.specialtiesTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
              التخصصات:
            </Text>
            <Text style={[styles.specialtiesText, { color: isDarkMode ? '#ddd' : '#555' }]}>
              {item.specialties}
            </Text>
          </View>
          
          <View style={styles.buttonsContainer}>
            <Button
              mode="contained"
              icon="phone"
              style={styles.contactButton}
              onPress={() => Linking.openURL(`tel:+97059${Math.floor(1000000 + Math.random() * 9000000)}`)}
            >
              اتصال
            </Button>
            <Button
              mode="outlined"
              icon="map-marker"
              style={styles.locationButton}
              onPress={() => Linking.openURL('https://maps.google.com/?q=' + item.location)}
            >
              الموقع
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="البحث عن شريك..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      
      <View style={styles.filterContainer}>
        <SegmentedButtons
          value={filterType}
          onValueChange={setFilterType}
          buttons={[
            { value: 'all', label: 'الكل' },
            { value: 'cafe', label: 'مطاعم ومقاهي' },
            { value: 'clothes', label: 'ملابس وأزياء' },
            { value: 'pharmacy', label: 'صيدليات' },
            { value: 'perfume', label: 'عطور' },
          ]}
          style={styles.segmentedButtons}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.discountInfoContainer}
        onPress={() => setShowDiscountInfo(!showDiscountInfo)}
      >
        <Icon name="information" size={20} color="#2196F3" style={styles.infoIcon} />
        <Text style={styles.discountInfoText}>
          معلومات عن خصومات الشركاء للمشتركين
        </Text>
        <Icon 
          name={showDiscountInfo ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#757575" 
        />
      </TouchableOpacity>
      
      {showDiscountInfo && (
        <Card style={styles.discountInfoCard}>
          <Card.Content>
            <Text style={styles.discountInfoTitle}>برنامج خصومات شركائنا</Text>
            <Text style={styles.discountInfoDescription}>
              يمكن للمشتركين في خدمتنا الاستفادة من خصومات حصرية لدى شبكة شركائنا من المطاعم والكافيهات والمتاجر الفلسطينية.
              للحصول على الخصم، ما عليك سوى إظهار بطاقة عضويتك أو رمز QR من التطبيق عند الدفع.
            </Text>
            <Button
              mode="contained"
              icon="card-account-details"
              style={styles.subscribeButton}
              onPress={() => Alert.alert('الاشتراك', 'سيتم تفعيل هذه الميزة قريباً!')}
            >
              اشترك الآن
            </Button>
          </Card.Content>
        </Card>
      )}
      
      <ScrollView
        contentContainerStyle={styles.partnersListContainer}
        showsVerticalScrollIndicator={true}
      >
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
          {filterType === 'cafe' ? 'المطاعم والمقاهي' : 
           filterType === 'clothes' ? 'متاجر الملابس والأزياء' : 
           filterType === 'pharmacy' ? 'الصيدليات' : 
           filterType === 'perfume' ? 'متاجر العطور' : 'شركاؤنا'}
        </Text>
        
        {filteredPartners.length > 0 ? (
          filteredPartners.map(partner => renderPartnerItem(partner))
        ) : (
          <View style={styles.noResultsContainer}>
            <Icon name="magnify-close" size={60} color="#BDBDBD" />
            <Text style={[styles.noResultsText, { color: isDarkMode ? '#fff' : '#000' }]}>
              لا توجد نتائج مطابقة للبحث
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchBar: {
    borderRadius: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  discountInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  discountInfoText: {
    flex: 1,
    fontSize: 14,
    color: '#2196F3',
  },
  discountInfoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  discountInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2196F3',
  },
  discountInfoDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  subscribeButton: {
    borderRadius: 8,
    backgroundColor: '#2196F3',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginHorizontal: 16,
  },
  partnersListContainer: {
    paddingVertical: 8,
    paddingBottom: 24,
  },
  partnerCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  partnerHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  partnerLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  placeholderLogo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  locationIcon: {
    marginRight: 4,
  },
  partnerLocation: {
    fontSize: 14,
    color: '#757575',
  },
  discountChip: {
    marginTop: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: '#4CAF50',
  },
  divider: {
    marginVertical: 12,
  },
  partnerDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  specialtiesContainer: {
    marginTop: 8,
  },
  specialtiesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  specialtiesText: {
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  contactButton: {
    flex: 1,
    marginRight: 8,
    borderRadius: 8,
  },
  locationButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 8,
  },
  noResultsContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  }
});

export default PartnersScreen;