// ViewSanctions.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchSanctions } from './database';

const ViewSanctions = ({ workerId }) => {
  const [sanctions, setSanctions] = useState([]);

  useEffect(() => {
    const loadSanctions = async () => {
      try {
        const sanctionsData = await fetchSanctions(workerId);
        setSanctions(sanctionsData);
      } catch (error) {
        console.error(error);
      }
    };
    loadSanctions();
  }, [workerId]);

  return (
    <View>
      <Text>Assigned Sanctions:</Text>
      {sanctions.length > 0 ? (
        <FlatList
          data={sanctions}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{`${item.reason}: $${item.amount}`}</Text>
          )}
        />
      ) : (
        <Text>No sanctions assigned.</Text>
      )}
    </View>
  );
};

export default ViewSanctions;