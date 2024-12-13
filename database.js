// database.js
import * as SQLite from 'expo-sqlite';

// Open the database
const db = SQLite.openDatabase('worker.db');

// Function to initialize the database
export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      // Create tasks table
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, description TEXT, worker_id INTEGER);',
        [],
        () => {
          // Create sanctions table after tasks table is created
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS sanctions (id INTEGER PRIMARY KEY NOT NULL, reason TEXT, amount REAL, worker_id INTEGER);',
            [],
            () => resolve(),
            (_, err) => reject(err)
          );
        },
        (_, err) => reject(err) // Handle error for tasks table creation
      );
    });
  });
};

// Function to fetch tasks for a specific worker
export const fetchTasks = (workerId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM tasks WHERE worker_id = ?;',
        [workerId],
        (_, { rows }) => resolve(rows._array),
        (_, err) => reject(err)
      );
    });
  });
};

// Function to fetch sanctions for a specific worker
export const fetchSanctions = (workerId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM sanctions WHERE worker_id = ?;',
        [workerId],
        (_, { rows }) => resolve(rows._array),
        (_, err) => reject(err)
      );
    });
  });
};