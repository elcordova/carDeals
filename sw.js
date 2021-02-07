"use strict";
//v0.1.1
const carDealsCacheName = "carDealsCacheV2";
const carDealsCachePageName = "carDealsCachePagesV1";
const carDealsCache = [carDealsCachePageName, carDealsCacheName];
const carDealsCacheFiles = [
  "https://cdn.jsdelivr.net/npm/pwacompat@2.0.17/pwacompat.min.js",
  "https://cdn.jsdelivr.net/gh/bstavroulakis/progressive-web-apps/resources/localforage.js",
  "js/app.js",
  "js/carPageService.js",
  "js/carService.js",
  "js/clientStorage.js",
  "js/constants.js",
  "js/swRegister.js",
  "js/template.js",
  "/",
  "index.html",
  "style.css",
];

self.addEventListener("install", (event) => {
  console.log("install event:", event);
  self.skipWaiting();
  const precache = async () => {
    const cache = await caches.open(carDealsCacheName);
    return cache.addAll(carDealsCacheFiles);
  }
  event.waitUntil(precache());
});

self.addEventListener("activate", (event) => {
  console.log("activate event:", event);
  self.clients.claim();
  const cleanCache = async () => {
    const keys = await caches.keys();
    keys.forEach(key => {
      if (carDealsCache.includes(key)) {
        return;
      }
      caches.delete(key);
    })
  }
  event.waitUntil(cleanCache());
});