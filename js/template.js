const generateCarCard = (car) => {
  const template = document.querySelector("#car-card").innerHTML;
  return template.replace(/\${(.*?)}/g, (_, g)=> car[g])
}

export const appendCards = (cars) =>{
  document.getElementById("first-load").innerHTML = "";
  if(!cars) return;
  const cardHTML = cars.map(generateCarCard).join("");
  document.querySelector(".mdl-grid").innerHTML += cardHTML
}