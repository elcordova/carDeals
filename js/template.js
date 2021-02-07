const generateCarCard = ({value}) => {
  const template = document.querySelector("#car-card").innerHTML;
  return template.replace(/\${(.*?)}/g, (_, g)=> value[g])
}

export const appendCards = ({cars}) =>{
  if(!cars) return;
  const cardHTML = cars.map(generateCarCard).join("");
  document.querySelector(".mdl-grid").innerHTML += cardHTML
}