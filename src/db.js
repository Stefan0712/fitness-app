import { openDB } from 'idb';

export const initDB = async () => {
  return openDB('EasyFitDB', 3, {
    upgrade(db, oldVersion) {
      const stores = [
        'exercises',
        'workouts',
        'cachedExercises',
        'cachedWorkouts',
        'goals',
        'logs',
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
export const getAllItems = async (storeName) => {
  const db = await initDB();
  return db.getAll(storeName);
};

// Delete one item
export const deleteItem = async (storeName, _id) => {
  const db = await initDB();
  return db.delete(storeName, _id);
};
