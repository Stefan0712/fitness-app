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
    if (filterOptions.goalId) {
      matches &&= item.goalId === filterOptions.goalId;
    }

    return matches;
  });
};
// Save multiple items at once
export const saveMultipleItems = async (storeName, items) => {
  if (!Array.isArray(items)) return;

  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);

  for (const item of items) {
    store.put(item); // or store.add(item) to prevent overwrites
  }

  await tx.done;
};



// Delete one item
export const deleteItem = async (storeName, _id) => {
  const db = await initDB();
  return db.delete(storeName, _id);
};

export const deleteItemsByGoalId = async (storeName, goalId) => {
  const db = await initDB();
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  const allItems = await store.getAll();
  const itemsToDelete = allItems.filter(item => item.goalId === goalId);
  for (const item of itemsToDelete) {
    await store.delete(item._id);
  }

  await tx.done;
};

// Delete all logs of a goal for a certain day

export const deleteGoalLogs = async (goalId, targetDate) => {
  const db = await initDB();
  const tx = db.transaction('logs', 'readwrite');
  const store = tx.objectStore('logs');
  const allItems = await store.getAll();

  const targetDateObj = new Date(targetDate); // Converts the provided date to a date object (passed date is yyyy-mm-dd)

  // Filter only logs from the provided date
  const itemsToDelete = allItems.filter(item => {
    const itemDate = new Date(item.timestamp);

    const isSameDay =
      itemDate.getFullYear() === targetDateObj.getFullYear() &&
      itemDate.getMonth() === targetDateObj.getMonth() &&
      itemDate.getDate() === targetDateObj.getDate();

    return item.goalId === goalId && isSameDay;
  });

  for(const item of itemsToDelete) {
    await store.delete(item._id);
  };
  await tx.done;
}

// Delete all logs of a goal

export const deleteAllGoalLogs = async (goalId) => {
  const db = await initDB();
  const tx = db.transaction('logs', 'readwrite');
  const store = tx.objectStore('logs');
  const allItems = await store.getAll();

  const itemsToDelete = allItems.filter(item => item.goalId === goalId);

  for (const item of itemsToDelete) {
    await store.delete(item._id);
  }

  await tx.done;
};



// Utilities for userData

export const saveUserData = async (userData) => {
  await saveItem('userData', userData);
};

export const getUserData = async () => {
  const localUserData = JSON.parse(localStorage.getItem('user'));

  if(localUserData){
    const userData =  await getItemById('userData', localUserData._id);
    return userData;
  }else {
    console.log("No local user data");
    return null;
  }
  
};

export const clearUserData = async () => {
  const localUserData = JSON.parse(localStorage.getItem('user'));
  if(localUserData){
    return await deleteItem('userData', localUserData._id);
  }else {
    console.log("No local user data");
    return null;
  }
};
