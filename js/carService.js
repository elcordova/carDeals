import {API_URL_LATEST} from "./constats.js";
import {appendCards} from "./template.js";
export const fetCars = async () =>{
  const resp = await(await fetch(API_URL_LATEST)).json();
  appendCards(resp);
}