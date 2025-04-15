import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Greeting from '@/components/greetings';
type ComponentType = 'button' | 'slider' | 'gauge';

interface ComponentItem {
  id: string;
  type: ComponentType;
  label: string;
}

const STORAGE_KEY = 'DYNAMIC_COMPONENTS';

const HomePages = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadComponentsFromStorage();
  }, []);

  const saveComponentsToStorage = async (data: ComponentItem[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Gagal menyimpan data:', error);
    }
  };

  const loadComponentsFromStorage = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setComponents(JSON.parse(data));
      }
    } catch (error) {
      console.error('Gagal memuat data:', error);
    }
  };

  const handleAddComponent = (type: ComponentType) => {
    const newItem: ComponentItem = {
      id: Date.now().toString(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${components.length + 1}`,
    };
    const updatedComponents = [...components, newItem];
    setComponents(updatedComponents);
    saveComponentsToStorage(updatedComponents);
    setModalVisible(false);
  };

  const handleRemove = (id: string) => {
    const updatedComponents = components.filter(item => item.id !== id);
    setComponents(updatedComponents);
    saveComponentsToStorage(updatedComponents);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Greeting Section */}
      <View style={styles.greetingStyle}>
        <Image source={require("@/assets/images/circuitPattern.png")} style={{
          height: Platform.OS === 'web' ? "100%" : 500, width: Platform.OS === 'web' ? "100%" : 500, position: "absolute", top: 0, left: 0, zIndex: -1, opacity: 0.4
        }} />
        <View style={{ justifyContent: "center" }}>
          <Text style={{ color: "#fff", fontSize: 26, fontWeight: "bold" }}>Hello Dears,</Text>
          <Greeting />
        </View>
        <Image source={require('@/assets/images/wavePerson.png')} style={{ width: 250, height: 250, position: 'absolute', right: 0, top: 20, }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {components.length === 0 ? (
          <Text style={styles.emptyText}>There is nothing here?!</Text>
        ) : (
          components.map((item) => (
            <View key={item.id} style={styles.componentBox}>
              {item.type === 'button' && (
                <TouchableHighlight
                  style={styles.button}
                  underlayColor="#2f7fbf"
                  onPress={() => console.log(`${item.label} clicked`)}
                >
                  <View style={styles.buttonContent}>
                    <MaterialCommunityIcons name="lamp-outline" size={40} color="white" />
                    <Text style={styles.buttonText}>{item.label}</Text>
                  </View>
                </TouchableHighlight>
              )}

              {item.type === 'slider' && (
                <View style={styles.sliderBox}>
                  <Text style={{ marginBottom: 5 }}>{item.label}</Text>
                  <Slider
                    style={{ width: 150 }}
                    minimumValue={0}
                    maximumValue={100}
                    minimumTrackTintColor="#3c98be"
                    maximumTrackTintColor="#ddd"
                  />
                </View>
              )}

              {item.type === 'gauge' && (
                <View style={{ backgroundColor: "#3c98be", padding: 10, width: "100%", borderRadius: 10 }}>
                  <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>{item.label}</Text>

                  <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                    {/* Lingkaran Gauge */}
                    <View style={{
                      width: 150,
                      height: 80,
                      borderTopLeftRadius: 120,
                      borderTopRightRadius: 120,
                      backgroundColor: '#fff',
                      overflow: 'hidden',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      position: 'relative',

                    }}>
                      {/* Fill berdasarkan persentase */}
                      <View style={{
                        position: 'absolute',
                        bottom: -10,
                        height: 75,
                        width: '80%',
                        backgroundColor: '#3c98be',
                        transform: [{ scaleY: 1 }],
                        borderTopLeftRadius: 60,
                        borderTopRightRadius: 60,
                        transformOrigin: 'bottom',
                      }} />
                      {/* untuk bagian  */}
                      <View style={{ backgroundColor: "#4dc6e8", width: "100%", height: "100%", zIndex: -1, position: "fixed", left: "50%", top: 0, borderBottomLeftRadius: 50 }}>
                      </View>
                      <Text style={{ position: "absolute", fontSize: 20, fontWeight: "500", color: "#fff" }}>50%</Text>
                    </View>

                    {/* Nilai persentase di tengah */}
                  </View>
                </View>

              )}

              <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.deleteBtn}>
                <MaterialCommunityIcons name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>


      {/* Tombol Plus */}
      <View style={styles.floatingButton} >
        <TouchableHighlight
          underlayColor="#2f7fbf"
          onPress={() => setModalVisible(true)}
          style={styles.plusButton}
        >
          <MaterialCommunityIcons name="plus" size={30} color="white" />
        </TouchableHighlight>
      </View>

      {/* Modal Pilihan Tambah */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Tambah Komponen</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleAddComponent('button')}
            >
              <Text style={styles.modalButtonText}>Tambah Button</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleAddComponent('slider')}
            >
              <Text style={styles.modalButtonText}>Tambah Slider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleAddComponent('gauge')}
            >
              <Text style={styles.modalButtonText}>Tambah Gauge</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 20, color: '#888' }}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView >
  );
};

export default HomePages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  greetingStyle: {
    backgroundColor: "#4dc6e8",
    paddingVertical: 30,
    paddingHorizontal: 20,
    height: "30%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',

    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,

    elevation: 10,
  },
  scrollContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  componentBox: {
    width: '45%',
    marginBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 40,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4dc6e8',
    padding: 20,
    borderRadius: 15,
    width: '100%',
  },
  buttonContent: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginTop: 10,
  },
  sliderBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: "100%",
    height: Dimensions.get('window').height * 0.10,
  },
  deleteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 50,

  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  plusButton: {
    backgroundColor: '#4dc6e8',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,

    position: "absolute",
    bottom: 80,
    right: 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#4dc6e8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
