import {fetCars} from './carService.js';
import {loadCarPage} from "./carPageService.js";
window.pageEvents = {
  loadCarPage,
}

fetCars();