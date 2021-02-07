const carsInstance = localforage.createInstance({
  name: 'cars'
});

let lastIndex = -1

export const addCars = async (newCars) => {
  await carsInstance.setItems(newCars);
};

export const getCars = async () => {
  const keys = (await carsInstance.keys()).reverse();
  if (lastIndex >= keys.length) return;
  const result = await carsInstance.getItems(keys.splice(lastIndex + 1, 3));
  lastIndex += 3;
  return Object.values(result).reverse();
}

export const getLastId = async () => {
  const keys = (await carsInstance.keys()).reverse();
  return keys[lastIndex];
}