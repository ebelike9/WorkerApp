// App.js
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { init } from './database';
import ViewTasks from './ViewTasks';
import ViewSanctions from './ViewSanctions';

export default function App() {
  const workerId = 1; // Replace with dynamic worker ID as needed

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await init();
        // Optionally, insert initial data here
      } catch (error) {
        console.error(error);
      }
    };
    initializeDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <ViewTasks workerId={workerId} />
      <ViewSanctions workerId={workerId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});