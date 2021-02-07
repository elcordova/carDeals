import {API_URL_LATEST} from "./constats.js";
import {appendCards} from "./template.js";
import {addCars, getCars, getLastId} from "./clientStorage.js"
export const loadCars = async () =>{
  document.getElementById("connection-status").innerHTML = await fetchPromise();
  const cars = await getCars();
  appendCards(cars);
}

const fetchPromise = () => {
  const getOnlineDataPromise = new Promise(async (resolve) =>{
    try {
      await loadCarsRequest();
    } catch (err) {
      resolve("No connection, showing online results");
    }
    resolve("This connection is OK, showing the bake");
  });

  const hangingsPromise = new Promise((resolve) => {
    setTimeout(
      resolve,
      3000, 
      "The connection is Hanging, showing offline results"
    );
  });
  return Promise.race([hangingsPromise, getOnlineDataPromise]);
}

export const loadCarsRequest = async() => {
  const requestURL = `${API_URL_LATEST}?carId=${await getLastId()}`
  const resp = await (await fetch(requestURL)).json();
  await addCars(resp.cars);
}