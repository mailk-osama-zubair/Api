import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

const App = () => {
  
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);

  const FetchApi = async () => {
    try {
      const Api = await fetch('https://api.thecatapi.com/v1/images/search?limit=20'); 
      const Passed = await Api.json();
  
      console.log(Passed);
      setApiData(Passed);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchApi();
  }, []); 
  return (
    <View style={styles.container}>
      {loading ? 
        <ActivityIndicator size="large" color="red" style={styles.loader} />
       : 
      
        <FlatList 
          data={apiData}
          renderItem={({ item }) => {
            return (
              <View style={styles.imageContainer}>
                <Image 
                  style={styles.image}
                  source={{ uri: item.url }}
                />
              
              </View>
            );
          }}
        />
        }
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginBottom: 20,
  },
  imageContainer: {
    height: 200,
    width: 200,
    marginBottom: 10,
    borderRadius:20,

  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius:20,
marginTop:20,
  }
});
