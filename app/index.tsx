import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import Greeting from '@/components/greetings';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


type RoutePath = '/WidgetPages' | '/AccountPages' | '/ConnectionPages' | '/DeviceListPages';

interface ItemRoute {
  name: string;
  route: RoutePath;
  icon: string;
  colorIcon: string;
}

const HomePages = () => {
  const router = useRouter();

  const itemRoute: ItemRoute[] = [
    { name: 'Device', route: '/DeviceListPages', icon: 'widgets', colorIcon: '#fff' },
    { name: 'Account', route: '/AccountPages', icon: 'person', colorIcon: '#fff' },
    { name: 'Connection', route: '/ConnectionPages', icon: 'wifi', colorIcon: '#fff' },
  ];

  // Authentication Check
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token);
    };
    checkToken();
  }, []);

  if (isAuthenticated === null) return null; // loading

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }



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
      <View style={styles.heroWrapper}>
        <Text style={{ color: '#333', fontSize: 22, fontWeight: 'bold', }}>
          Welcome To IOT App
        </Text>
        <Text style={{ color: '#666', fontSize: 18, }}>
          Select the option below to continue
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
              underlayColor="#312E81"
              activeOpacity={1}
            >
              <View style={styles.btnContent}>
                <MaterialIcons
                  name={item.icon as keyof typeof MaterialIcons.glyphMap} size={30} color={item.colorIcon} />
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
    backgroundColor: '#fff',
  },
  greetingStyle: {
    backgroundColor: '#3730A3',
    paddingVertical: 30,
    paddingHorizontal: 20,
    height: '30%',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',

    shadowColor: '#aeaeae',
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 5 },
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
  heroWrapper: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 4
  },
  bgPattern: {
    height: Platform.OS === 'web' ? '100%' : 500,
    width: Platform.OS === 'web' ? '100%' : 500,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0.9,
  },
  waveImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    right: 0,
    top: 20,
  },
  buttonsWrapper: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  routeBtn: {
    backgroundColor: '#3730A3',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4, // spacing between icon and text
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
    alignSelf: 'center',
  },
});
