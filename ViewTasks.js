// ViewTasks.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchTasks } from './database';

const ViewTasks = ({ workerId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasksData = await fetchTasks(workerId);
        setTasks(tasksData);
      } catch (error) {
        console.error(error);
      }
    };
    loadTasks();
  }, [workerId]);

  return (
    <View>
      <Text>Assigned Tasks:</Text>
      {tasks.length > 0 ? (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Text>{item.description}</Text>}
        />
      ) : (
        <Text>No tasks assigned.</Text>
      )}
    </View>
  );
};

export default ViewTasks;