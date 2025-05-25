import { openDB } from 'idb';

export const initDB = async () => {
  return openDB('EasyFitDB', 4, {
    upgrade(db, oldVersion) {
      const stores = [
        'exercises',
        'workouts',
        'cachedExercises',
        'cachedWorkouts',
        'goals',
        'logs',
        'userData',
        'tags',
        'cachedTags',
        'equipment',
        'cachedEquipment',
        'targetMuscles',
        'cachedTargetMuscles',
      ];

      for (const storeName of stores) {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: '_id' });
        }
      }
    },
  });
};

// Reset only one store
export const clearStore = async (storeName) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.objectStore(storeName).clear();
  await tx.done;
};


// Save one item
export const saveItem = async (storeName, item) => {
  const db = await initDB();
  await db.put(storeName, item);
};

// Get one item by id
export const getItemById = async (storeName, _id) => {
  const db = await initDB();
  return db.get(storeName, _id);
};

// Get all items
export const getAllItems = async (storeName, filterOptions = {}) => {
  const db = await initDB();
  const allItems = await db.getAll(storeName);

  return allItems.filter(item => {
    let matches = true;

    // Filter by date (same year, month, day)
    if (filterOptions.date) {
      const targetDate = new Date(filterOptions.date);
      const itemDate = new Date(item.timestamp);

      matches &&= (
        itemDate.getFullYear() === targetDate.getFullYear() &&
        itemDate.getMonth() === targetDate.getMonth() &&
        itemDate.getDate() === targetDate.getDate()
      );
    }

    // Filter by type (exact match)
    if (filterOptions.type) {
      matches &&= item.type === filterOptions.type;
    }
    if (filterOptions._id) {
      matches &&= item._id === filterOptions._id;
    }

    return matches;
  });
};



// Delete one item
export const deleteItem = async (storeName, _id) => {
  const db = await initDB();
  return db.delete(storeName, _id);
};


// Utilities for userData

export const saveUserData = async (userData) => {
  await saveItem('userData', { ...userData, _id: 'local-user' });
};

export const getUserData = async () => {
  return await getItemById('userData', 'local-user');
};

export const clearUserData = async () => {
  return await deleteItem('userData', 'local-user');
};
