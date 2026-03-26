// GET ITEMS
export async function getItems(userId) {
  const items = [];

  const itemsRef = collection(db, "users", userId, "items");
  const querySnapshot = await getDocs(itemsRef);

  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return items;
}

// ADD ITEM
export async function addItem(userId, item) {
  const itemsRef = collection(db, "users", userId, "items");

  const docRef = await addDoc(itemsRef, item);

  return docRef.id;
}