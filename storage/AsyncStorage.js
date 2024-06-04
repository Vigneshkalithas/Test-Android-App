import AsyncStorage from "@react-native-async-storage/async-storage";

export const StoreValueToAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`${key} successfully set in AsyncStorage`);
  } catch (error) {
    console.error(`${key} setting string in AsyncStorage`, error);
  }
};

export const getValueFromAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Stored value:", value);
      //   setStoredString(value);
      // return value;
      const result = await JSON.parse(value);
      return result;
    } else {
      console.log(`No value found for this ${key} in AsyncStorage.`);
    }
  } catch (error) {
    console.error(`Error getting ${key} from AsyncStorage:`, error);
  }
};

export const DeleterValueFromAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`This ${key} deleted successfully`);
  } catch (error) {
    console.error("Error deleting value:", error);
  }
};
