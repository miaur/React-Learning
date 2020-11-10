export function getFavoriresList() {
  let favoritesList: Array<string> = [];
  const favorites = localStorage.getItem("favorites");
  if (favorites) {
    favoritesList = JSON.parse(favorites);
  }
  return favoritesList;
}
