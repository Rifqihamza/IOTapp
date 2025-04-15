import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Greeting from '@/components/greetings';
import Ionicons from '@expo/vector-icons/Ionicons';


type RoutePath = '/MenuPages' | '/AccountPages' | '/ConnectionPages';

interface ItemRoute {
  name: string;
  route: RoutePath;
  icon: string;
  colorIcon: string;
}

const HomePages = () => {
  const router = useRouter();

  const itemRoute: ItemRoute[] = [
    { name: 'Menu', route: '/MenuPages', icon: 'menu', colorIcon: '#fff' },
    { name: 'Account', route: '/AccountPages', icon: 'person', colorIcon: '#fff' },
    { name: 'Connection', route: '/ConnectionPages', icon: 'wifi', colorIcon: '#fff' },
  ];


  return (
    <SafeAreaView style={styles.container}>
      {/* Greeting Section */}
      <View style={styles.greetingStyle}>
        <Image
          source={require('@/assets/images/circuitPattern.png')}
          style={styles.bgPattern}
        />
        <View style={styles.greetingTextWrapper}>
          <Text style={styles.greetingTitle}>Hello Dears,</Text>
          <Greeting />
        </View>
        <Image
          source={require('@/assets/images/wavePerson.png')}
          style={styles.waveImage}
        />
      </View>

      {/* Greeting Text */}
      <View style={{ padding: 20, alignItems: 'center', gap: 4 }}>
        <Text style={{ color: '#333', fontSize: 22, fontWeight: 'bold', }}>
          Welcome To IOT App
        </Text>
        <Text style={{ color: '#666', fontSize: 18, }}>
          Pilih tombol dibawah untuk melanjutkan
        </Text>
      </View>

      {/* Routes Button */}
      <View style={styles.buttonsWrapper}>
        {itemRoute.map((item, index) => {
          const isFullWidth = index >= 2;

          return (
            <TouchableHighlight
              key={index}
              style={StyleSheet.compose(
                styles.routeBtn,
                isFullWidth ? styles.fullWidthCenter : styles.halfWidth
              )}
              onPress={() => router.push(item.route)}
              underlayColor="#3daed1"
              activeOpacity={0.6}
            >
              <View style={styles.btnContent}>
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={30}
                  color={item.colorIcon}
                />
                <Text style={styles.btnText}>{item.name}</Text>
              </View>
            </TouchableHighlight>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default HomePages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  greetingStyle: {
    backgroundColor: '#4dc6e8',
    paddingVertical: 30,
    paddingHorizontal: 20,
    height: '30%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 5,
    elevation: 10,

    position: 'relative',
  },
  greetingTextWrapper: {
    position: 'absolute',
    top: 30,
    left: 20,
    right: 20,

  },
  greetingText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  greetingTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  bgPattern: {
    height: Platform.OS === 'web' ? '100%' : 500,
    width: Platform.OS === 'web' ? '100%' : 500,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0.4,
  },
  waveImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    right: 0,
    top: 20,
  },

  buttonsWrapper: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  routeBtn: {
    backgroundColor: '#4dc6e8',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // spacing between icon and text
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  halfWidth: {
    width: '48%',
  },
  fullWidthCenter: {
    width: '100%',
    marginTop: 10,
    alignSelf: 'center',
  },
});
