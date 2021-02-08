"use strict";
//v0.1.1.1
const carDealsCacheName = "carDealsCacheV2";
const carDealsCachePageName = "carDealsCachePagesV1";
const carDealsCacheImagesName = "carDealsCacheImagesV1";
const carDealsCache = [carDealsCachePageName, carDealsCacheName, carDealsCacheImagesName];
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

const latestPath =
  "/pluralsight/courses/progressive-web-apps/service/latest-deals.php";
const imagePath =
  "/pluralsight/courses/progressive-web-apps/service/car-image.php";
const carPath = "/pluralsight/courses/progressive-web-apps/service/car.php";

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

self.addEventListener("fetch", (event) => {
  // JUST FOR STUDY CASE
  // console.log("fetch", event)
  // event.respondWith(new Response("Hello MF"))

  const requestUrl = new URL(event.request.url);
  const requestPath = requestUrl.pathname;
  const filename = requestPath.substring(requestPath.lastIndexOf("/") + 1);
  if (requestPath == latestPath || filename == "sw.js") {
    return event.respondWith(fetch(event.request));
  } else if (requestPath === imagePath) {
    return event.respondWith(networkFirstStrategy(event.request))
  }
  return event.respondWith(cacheFirstStrategy(event.request));
  
});

const networkFirstStrategy = async (request) => {
  try {
    return await fetchRequestAndCache(request)
  } catch {
    return await caches.match(request);
  }
}


const cacheFirstStrategy = async (request) =>{
  const cacheResponse = await caches.match(request);
  return cacheResponse || fetchRequestAndCache(request);
}


const fetchRequestAndCache = async (request) => {
  const networkResponse = await fetch(request);
  const cloneResponse = networkResponse.clone();
  const cache = await caches.open(getCacheName(request));
  cache.put(request, networkResponse);
  return cloneResponse;
}

const getCacheName = (request) => {
  const requestUrl = new URL(request.url);
  const requestPath = requestUrl.pathname;
  if (requestPath == imagePath) {
    return carDealsCacheImagesName;
  } else if (requestPath == carPath) {
    return carDealsCachePageName;
  } else {
    return carDealsCacheName;
  }
}

self.addEventListener("message", e => {
  e.source.postMessage({clientId: e.source.id, message: "swmf"});
})