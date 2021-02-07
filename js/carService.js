import {API_URL_LATEST} from "./constats.js";
import {appendCards} from "./template.js";
import {addCars, getCars, getLastId} from "./clientStorage.js"
export const loadCars = async () =>{
  await loadCarsRequest();
  const cars = await getCars();
  appendCards(cars);
}

export const loadCarsRequest = async() => {
  const requestURL = `${API_URL_LATEST}?carId=${await getLastId()}`
  const resp = await (await fetch(requestURL)).json();
  await addCars(resp.cars);
}