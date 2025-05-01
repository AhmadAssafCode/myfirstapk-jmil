// src/screens/AboutUsScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Avatar, Divider } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';


const AboutUsScreen = () => {
  const { isDarkMode } = useTheme();
  
  const teamMembers = [
    {
      id: 1,
      name: 'عيسى عيد',
      role: 'المؤسس والرئيس التنفيذي',
      image: require('../assets/team/eessa.jpeg'), // مسار الصورة من Assets
      bio: 'بكالوريوس محاسبة ',
      phone: '+972598759358',
      facebook: 'https://www.facebook.com/profile.php?id=100014438313705',
      instagram: 'https://www.instagram.com/issa_eid18/'
    },
    {
      id: 2,
      name: 'شادي ناصر',
      role: 'مدير التسويق',
      image: require('../assets/team/shadi.jpeg'), // مسار الصورة من Assets
      bio: 'بكالوريوس محاسبة',
      phone: '+972595071151',
      facebook: 'https://www.facebook.com/profile.php?id=100088678675917',
      instagram: 'https://www.instagram.com/shadii._.224/'
    },
    {
      id: 3,
      name: 'محمد جميل',
      role: 'رئيس قسم تكنولوجيا المعلومات',
      image: require('../assets/team/mohammed.jpg'), // مسار الصورة من Assets
      bio: 'مهندس برمجيات محترف مع خبرة في تطوير تطبيقات الهاتف المحمول والويب.',
      phone: '+972592782902',
      facebook: 'https://www.facebook.com/mhmdbdalrhmnaljmyl/',
      instagram: 'https://www.instagram.com/mohammed.79mlg/'
    },
  ];
  
  const openWebsite = () => {
    Linking.openURL('https://canamart.ps');
  };
  
  const contactUs = () => {
    Linking.openURL('mailto:info@canamart.ps');
  };
  
  const openSocialMedia = (url) => {
    Linking.openURL(url);
  };
  
  const callPhone = (phone) => {
    Linking.openURL(`tel:${phone}`);
  };
  
  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.header}>
          <Image
            source={require('../assets/73f3ea19-a757-43a5-b175-f1fa80b53a79-removebg-preview.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.companyName, { color: isDarkMode ? '#fff' : '#000' }]}>
            كانا مارت
          </Text>
          <Text style={[styles.tagline, { color: isDarkMode ? '#ddd' : '#555' }]}>
            تسوق أسهل، توفير أكثر
          </Text>
        </View>
        
        <Card style={styles.missionCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>رؤيتنا</Title>
            <Paragraph style={styles.missionText}>
              رؤيتنا أن نصبح الخيار الأول للتسوق الذكي والعصري في فلسطين من خلال تقديم تجربة موحدة تجمع بين التوفير، الراحة، ودعم المنتج المحلي.
            </Paragraph>
            
            <Title style={[styles.cardTitle, {marginTop: 16}]}>مهمتنا</Title>
            <Paragraph style={styles.missionText}>
              Cana Mart هو متجر شامل وتطبيقي رقمي يقدم تجربة تسوق سهلة وفعالة بأسعار منافسة، من خلال نظام خصومات ذكي، توصيل سريع، ودعم حقيقي للمنتجات الفلسطينية، مستهدفًا العائلات والأفراد الباحثين عن التوفير والجودة في آنٍ واحد.
            </Paragraph>
          </Card.Content>
        </Card>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            فريقنا
          </Text>
          {teamMembers.map(member => (
            <Card key={member.id} style={styles.teamCard}>
              <Card.Content>
                <View style={styles.teamMemberHeader}>
                  <Avatar.Image
                    source={member.image}
                    size={80}
                  />
                  <View style={styles.teamMemberInfo}>
                    <Title style={styles.memberName}>{member.name}</Title>
                    <Paragraph style={styles.memberRole}>{member.role}</Paragraph>
                  </View>
                </View>
                <Paragraph style={styles.memberBio}>
                  {member.bio}
                </Paragraph>
                
                <View style={styles.memberSocialContainer}>
                  <TouchableOpacity 
                    style={styles.socialButton}
                    onPress={() => callPhone(member.phone)}
                  >
                    <Icon name="phone" size={20} color="#4CAF50" />
                    <Text style={styles.socialButtonText}>{member.phone}</Text>
                  </TouchableOpacity>
                  
                  <View style={styles.memberSocialIcons}>
                    <TouchableOpacity 
                      style={styles.iconButton}
                      onPress={() => openSocialMedia(member.facebook)}
                    >
                      <Icon name="facebook" size={24} color="#4267B2" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.iconButton}
                      onPress={() => openSocialMedia(member.instagram)}
                    >
                      <Icon name="instagram" size={24} color="#E1306C" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
            تواصل معنا
          </Text>
          <Card style={styles.contactCard}>
            <Card.Content>
              <View style={styles.contactItem}>
                <Icon name="email" size={24} color="#4CAF50" style={styles.contactIcon} />
                <Text style={styles.contactText}>info@canamart.ps</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon name="phone" size={24} color="#4CAF50" style={styles.contactIcon} />
                <Text style={styles.contactText}>+970 59 9123456</Text>
              </View>
              <View style={styles.contactItem}>
                <Icon name="map-marker" size={24} color="#4CAF50" style={styles.contactIcon} />
                <Text style={styles.contactText}>بيت لحم، فلسطين</Text>
              </View>
              
              <View style={styles.socialIcons}>
                <TouchableOpacity onPress={() => openSocialMedia('https://www.facebook.com/canamart')}>
                  <Icon name="facebook" size={32} color="#4267B2" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openSocialMedia('https://www.instagram.com/canamart')}>
                  <Icon name="instagram" size={32} color="#E1306C" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openSocialMedia('https://twitter.com/canamart')}>
                  <Icon name="twitter" size={32} color="#1DA1F2" style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openSocialMedia('https://www.youtube.com/channel/canamart')}>
                  <Icon name="youtube" size={32} color="#FF0000" style={styles.socialIcon} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.contactButtons}>
                <Button
                  mode="contained"
                  onPress={openWebsite}
                  style={styles.contactButton}
                  icon="web"
                >
                  زيارة موقعنا
                </Button>
                <Button
                  mode="outlined"
                  onPress={contactUs}
                  style={styles.contactButton}
                  icon="email-outline"
                >
                  راسلنا
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
        
        {/* مساحة إضافية في النهاية للتأكد من إمكانية التمرير إلى نهاية المحتوى */}
        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30, // تأكد من وجود مساحة كافية في الأسفل
  },
  header: {
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
  },
  missionCard: {
    margin: 16,
    borderRadius: 8,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  missionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 8,
  },
  section: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  teamCard: {
    marginBottom: 16,
    borderRadius: 8,
  },
  teamMemberHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  teamMemberInfo: {
    marginLeft: 16,
    justifyContent: 'center',
    flex: 1,
  },
  memberName: {
    fontSize: 18,
  },
  memberRole: {
    color: '#4CAF50',
  },
  memberBio: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  memberSocialContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  socialButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4CAF50',
  },
  memberSocialIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginRight: 16,
    padding: 4,
  },
  divider: {
    marginVertical: 16,
  },
  contactCard: {
    borderRadius: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIcon: {
    marginRight: 16,
  },
  contactText: {
    fontSize: 16,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  socialIcon: {
    padding: 8,
  },
  contactButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  contactButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  bottomSpace: {
    height: 40, // مساحة إضافية في النهاية
  },
});

export default AboutUsScreen;