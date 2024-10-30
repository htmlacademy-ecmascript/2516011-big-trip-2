const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getRandomElement, updateItem };
