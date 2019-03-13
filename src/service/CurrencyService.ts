import Config from 'react-native-config';

export async function fetchCurrency() {
  try {
    const response = await fetch(`${Config.API_URL}?access_key=${Config.API_KEY}`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}