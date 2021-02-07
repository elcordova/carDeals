export default async () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  const swRegistrations = await navigator.serviceWorker.register("sw.js");
  console.log(swRegistrations);
}