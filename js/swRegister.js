export default async () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  const swRegistrations = await navigator.serviceWorker.register("sw.js", {scope: ""});
  console.log(swRegistrations);
  let serviceWorker;
  if (swRegistrations.installing) {
    console.log("resolved on installing: ", swRegistrations);
    serviceWorker = swRegistrations.installing;
  } else if (swRegistrations.waiting) {
    console.log("resolved on waiting: ", swRegistrations);
    serviceWorker = swRegistrations.waiting;
  } else if (swRegistrations.active) {
    console.log("resolved on waiting: ", swRegistrations);
    serviceWorker = swRegistrations.active;
  }

  serviceWorker.addEventListener("statechange", ({target}) => console.log(target.state));

  swRegistrations.addEventListener("updatefound", ()=>{
    swRegistrations.installing.addEventListener("statechange", (e) => {
      console.log("new sw installing", e.target.state);
    });
    console.log("new sw found", swRegistrations)
  })

  //event throw when the service worker controlling this page on self.skipWaiting
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    console.log("Controller changed");
  });




  navigator.serviceWorker.addEventListener("message", e => {
    const clientId = e.data.clientId;
    const message = e.data.message;
    console.log("From client: ", clientId, message);
  });

  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage("hello mf");
  }


  setInterval(() => {
    swRegistrations.update();
  }, 1000 * 5);

}
