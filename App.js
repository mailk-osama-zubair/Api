import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

const App = () => {
  
  const FetchApi = async () => {
    const Api = await fetch('https://api.thecatapi.com/v1/images/search?limit=10'); 
    const Passed = await Api.json();

    console.log(Passed);
    setApiData(Passed);
  }

  useEffect(() => {
    FetchApi();
  }, []); // 

  const [apiData, setApiData] = useState([]);

  return (
    <View style={styles.container}>
      <View>
        <Text>
          API
        </Text>
      </View>
      <FlatList 
        data={apiData}
        keyExtractor={(item, index) => index.toString()} // Assuming index is unique, otherwise use some unique ID from data
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
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  imageContainer: {
    height: 200,
    width: '60%',
    // borderWidth: 1,
    marginBottom: 10,
    alignSelf:'center',
    marginTop:'10%',
    borderRadius:20,

  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius:20,

  }
});
