const loremForm = document.querySelector(".header__lorem-form");
const loremInput = document.querySelector(".header__lorem-input");
const paragraphContainer = document.querySelector(".paragraph-container");

const paragraphs = [
  "Nulla excepteur adipisicing sint enim anim proident voluptate et laborum exercitation. Occaecat voluptate officia id ea non laboris dolore fugiat sunt duis. Fugiat reprehenderit ullamco nulla in velit do anim quis et sit magna quis excepteur.",
  "Veniam ad mollit non aute minim sit incididunt voluptate elit elit et in ullamco consectetur. Tempor reprehenderit id ullamco dolore anim laborum Lorem occaecat. Amet aliquip sunt veniam anim non. Exercitation irure exercitation veniam dolore laborum exercitation reprehenderit nulla sit aute nostrud et sint proident. Mollit consequat eiusmod dolore aliqua fugiat id. Consequat ut ad est nulla magna est.",
  "Dolor dolor anim Lorem veniam labore laboris ad proident elit. Velit non qui consequat excepteur. Fugiat ut ut eu occaecat. Quis elit anim occaecat cupidatat culpa ea occaecat Lorem deserunt anim irure excepteur ipsum amet. Laborum deserunt ut anim voluptate consectetur laborum ullamco aute. Dolor qui laborum deserunt qui aute.",
  "Amet elit veniam consequat elit est adipisicing eu exercitation officia elit cillum commodo voluptate duis. Esse sunt consequat do proident ad ea. Sit reprehenderit reprehenderit sit magna qui duis duis fugiat consequat ullamco magna. Velit nostrud dolor sunt elit. Eiusmod anim culpa pariatur id veniam do aute qui consectetur magna. Pariatur non tempor consectetur est nisi cillum. Commodo nostrud et eu nisi.",
  "Culpa et enim ad adipisicing labore deserunt nostrud aute et voluptate. Deserunt mollit anim occaecat et amet consequat commodo. Sunt ullamco ex ea aute occaecat eu et mollit minim sit. Tempor pariatur consectetur minim eu incididunt reprehenderit. Est enim quis proident sunt nostrud do sit deserunt. Amet ut voluptate ullamco fugiat elit laboris Lorem proident nisi.",
  "Velit id mollit ea quis id exercitation qui sunt adipisicing magna aliquip velit. Consequat mollit fugiat cupidatat quis velit laboris est nulla. Cupidatat laborum aliquip mollit tempor tempor in sunt aliquip sint minim minim veniam. Non tempor in eu aliqua adipisicing aliquip Lorem aute.",
  "Reprehenderit veniam dolore id duis elit quis sit officia tempor enim eu quis ea. Enim pariatur enim pariatur velit consectetur mollit laborum magna consectetur magna ut eiusmod veniam commodo. Est exercitation proident cupidatat elit laboris aute. Quis ea proident ad consectetur laborum adipisicing magna.",
  "Esse elit tempor deserunt ad magna. Aliqua proident deserunt incididunt et. Laboris et labore cillum ut nulla veniam aliquip ex aliqua. Voluptate irure duis officia aliqua nulla nostrud eiusmod id ad tempor.",
  "Sunt magna irure laboris pariatur dolore do. Ex eiusmod sunt sunt Lorem fugiat nisi dolor adipisicing occaecat laborum. Cupidatat ut anim dolor laborum. Laboris minim eu nulla velit fugiat laboris commodo dolor eiusmod duis. Lorem elit eu eiusmod anim exercitation. Minim eu culpa Lorem irure occaecat.",
  "Nisi ea esse eu consequat est exercitation do ex est. Ex reprehenderit in nisi consequat qui sunt ut mollit nulla nisi irure. Mollit irure anim sunt occaecat labore nisi id duis. Nostrud adipisicing nulla laborum excepteur. Ex veniam laboris aliquip quis id nulla cupidatat ipsum ex amet non occaecat sunt."
];

const PRGLIST_CN = "paragraph-list";

function getRandom() {
  return Math.floor(Math.random() * paragraphs.length);
}

function putParagraphs(numOfPrg) {
  const paragraphList = document.createElement("ul");
  paragraphList.classList.add(PRGLIST_CN);
  
  for (let i = 0; i < numOfPrg; ++i) {
    const paragraphElement = document.createElement("li");
    const paragraphContent = document.createElement("p");
    const randomIndex = getRandom();
    
    paragraphContent.innerText = paragraphs[randomIndex];
    paragraphElement.appendChild(paragraphContent);
    paragraphList.appendChild(paragraphElement);
  }
  
  paragraphContainer.appendChild(paragraphList);
}

function handleLoremSubmit(event) {
  event.preventDefault();
  const numOfPrg = loremInput.value === "" ? 5 : loremInput.value;
  loremInput.value = "";
  
  const oldList = paragraphContainer.querySelector(`.${PRGLIST_CN}`);
  if (oldList !== null) {
    paragraphContainer.removeChild(oldList);
  }
  putParagraphs(numOfPrg);
}

function init() {
  loremForm.addEventListener("submit", handleLoremSubmit);
}

init();