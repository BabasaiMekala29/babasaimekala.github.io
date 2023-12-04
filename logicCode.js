let charCode = { 'a': '2', 'b': '2', 'c': '2', 'd': '3', 'e': '3', 'f': '3', 'g': '4', 'h': '4', 'i': '4', 'j': '5', 'k': '5', 'l': '5', 'm': '6', 'n': '6', 'o': '6', 'p': '7', 'q': '7', 'r': '7', 's': '7', 't': '8', 'u': '8', 'v': '8', 'w': '9', 'x': '9', 'y': '9', 'z': '9', ' ': '0' };

let superheroObj = { "227824602637422": "captain america", "47660626": "iron man", "4855": "hulk", "8467": "thor", "78737626": "superman", "228626": "batman", "966337096626": "wonder woman", "2782626": "aquaman" };

let superheroNames = { "Captain America": "Steve Rogers", "Iron man": "Tony Stark", "Hulk": "Bruce Banner", "Thor": "Thor Odinson", "Batman": "Bruce Wayne", "Superman": "Kal-El", "Wonder Woman": "Diana Prince", "Aquaman": "Arthur Curry" }

let superheroNamesSwitched = { "Steve Rogers": "Captain America", "Tony Stark": "Iron man", "Bruce Banner": "Hulk", "Thor Odinson": "Thor", "Bruce Wayne": "Batman", "Kal-El": "Superman", "Diana Prince": "Wonder Woman", "Arthur Curry": "Aquaman" }

let heroCodeArr = [...Object.keys(superheroObj)];
heroCodeArr.sort();

function getSuperheroCode(name) {
    let code = "";
    for (i = 0; i < name.length; i++) {
        code += charCode[name[i]];
    }
    return code;
}

function addSuperHero(name, originalName) {
    let modifiedName = name.toLowerCase();
    let code = getSuperheroCode(modifiedName);
    superheroObj[code] = modifiedName;
    superheroNames[name] = originalName;
    superheroNamesSwitched[originalName] = name;
    heroCodeArr.push(code);
    heroCodeArr.sort();
}

function findSuperhero(heroCode) {
    let left = 0;
    let right = heroCodeArr.length - 1, mid;
    while (left <= right) {
        mid = Math.floor((left + right) / 2);
        if (heroCodeArr[mid] == heroCode) {
            return mid;
        }
        else if (heroCodeArr[mid] < heroCode) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return -1;
}


let mainContainerEle = document.getElementById("mainContainer");
let heroDetailsEle = document.getElementsByClassName("hero-details");

function changeHeroNameOnMouseEnter(event) {
    let targetEle = event.target;
    targetEle.innerHTML = superheroNames[targetEle.innerHTML];
}

function changeHeroNameOnMouseLeave(event) {
    let targetEle = event.target;
    targetEle.innerHTML = superheroNamesSwitched[targetEle.innerHTML];
}

let addIconEle = document.getElementById("addIcon");
let addModalEle = document.getElementById("addModal");
let closeModelEle = document.getElementsByClassName("close-ele")[0];

let heroNameEle = document.getElementById("heroName");
let alterEgoEle = document.getElementById("alterEgo");
let descriptionEle = document.getElementById("description");
let addHeroButnEle = document.getElementById("addHeroButn");
function closeModel() {
    heroNameEle.value = "";
    alterEgoEle.value = "";
    descriptionEle.value = "";
    addModalEle.style.display = "none";
}
function displayModal() {
    addModalEle.style.display = "block";
}

addIconEle.addEventListener("click", displayModal);
closeModelEle.addEventListener("click", closeModel);

let alertEle = document.getElementById("alertEle");
let alertMesgEle = document.getElementById("alertMesg");
let alertCloseModelEle = document.getElementsByClassName("close-ele")[1];
function addHero() {
    if (heroNameEle.value == "" && alterEgoEle.value == "") {
        alertEle.style.display = "block";
        alertMesgEle.innerHTML = "Superhero name and Alter ego fields cannot be empty!!";
        return;
    }
    if (heroNameEle.value == "") {
        alertEle.style.display = "block";
        alertMesgEle.innerHTML = "Superhero name field cannot be empty!!";
        return;
    }
    if (alterEgoEle.value == "") {
        alertEle.style.display = "block";
        alertMesgEle.innerHTML = "Alter ego field cannot be empty!!";
        return;
    }
    
    let heroCodeVal = getSuperheroCode(heroNameEle.value.toLowerCase());
    if (findSuperhero(heroCodeVal) === -1) {
        addSuperHero(heroNameEle.value, alterEgoEle.value);
        let heroCardDivEle = document.createElement("li");
        heroCardDivEle.classList.add("hero-card");
        heroCardDivEle.setAttribute("id", heroNameEle.value.toLowerCase());
        heroCardDivEle.setAttribute("style", "display: flex;");
        mainContainerEle.insertBefore(heroCardDivEle, addIconEle);

        let heroImgDivEle = document.createElement("div");
        heroImgDivEle.classList.add("img-container");

        let heroImgEle = document.createElement("img");
        heroImgEle.classList.add("hero-img");
        heroImgEle.setAttribute("src", "projectImages/heroicon.jpg");
        heroImgEle.setAttribute("alt", heroNameEle.value);
        heroImgDivEle.appendChild(heroImgEle);

        let heroDetailsDivEle = document.createElement("div");
        heroDetailsDivEle.classList.add("hero-details");

        let heroNameH3Ele = document.createElement("h3");
        heroNameH3Ele.textContent = heroNameEle.value;
        heroDetailsDivEle.appendChild(heroNameH3Ele);

        let heroDescriptionH6ele = document.createElement("h6");
        heroDescriptionH6ele.textContent = descriptionEle.value;
        heroDetailsDivEle.appendChild(heroDescriptionH6ele);

        heroCardDivEle.appendChild(heroImgDivEle);
        heroCardDivEle.appendChild(heroDetailsDivEle);
        hoverHeroNames();
        closeModel();
    }
    else {
        alertEle.style.display = "block";
        alertMesgEle.innerHTML = `${heroNameEle.value} already exists, try adding new Superhero`;
        heroNameEle.value = "";
        alterEgoEle.value = "";
        descriptionEle.value = "";
    }
}

alertCloseModelEle.addEventListener("click", () => alertEle.style.display = "none");
addHeroButnEle.addEventListener("click", addHero);

let dialPadModalEle = document.getElementById("dialPadModal");
let searchIconEle = document.getElementById("searchIcon");
let heroNotFoundMesg = document.getElementById("errorMesg");

function searchFunction(heroCodeStr){
    let unmatchedCount = 0;
    heroNotFoundMesg.style.display = "none";
    for (let item in superheroObj) {
        let unMatchedHero = document.getElementById(superheroObj[item]);
        if (item.indexOf(heroCodeStr) > -1) {
            unMatchedHero.style.display = "flex";
        }
        else{
            unmatchedCount+=1;
            unMatchedHero.style.display = "none";
        }
    }
    let objectLen = Object.keys(superheroObj).length;
    if(unmatchedCount==objectLen){
        heroNotFoundMesg.style.display = "block";
    }
}

function showResultAfterEnter() {
    let heroCodeStr = heroNumResultEle.textContent;
    searchFunction(heroCodeStr);
    heroNumResultEle.textContent = "";
    dialPadModalEle.style.display = "none";
}

function makeHeroCode(event) {
    heroNumResultEle.textContent += event.target.id;
    let heroNumCode = heroNumResultEle.textContent;
    searchFunction(heroNumCode);
}

function clearLastChar() {
    if (heroNumResultEle.textContent != "") heroNumResultEle.textContent = heroNumResultEle.textContent.slice(0, -1);
    searchFunction(heroNumResultEle.textContent);
}

function showDialpadModal() {
    heroNumResultEle.textContent = "";
    dialPadModalEle.style.display = "block";
    heroNotFoundMesg.style.display = "none";
    for (let item in superheroObj) {
        
        let unMatchedHero = document.getElementById(superheroObj[item]);
        if(unMatchedHero.style.display=="none") unMatchedHero.style.display = "flex";
        
    }
    enterEle.addEventListener("click", showResultAfterEnter);
    for (i = 0; i < gridElements.length; i++) {
        if (i <= 10 && i!=9) {
            gridElements[i].addEventListener("click", makeHeroCode);
        }
    }
    clearEle.addEventListener("click", clearLastChar);
}

let clearEle = document.getElementById("clear");
let heroNumResultEle = document.getElementById("heroNumResult");
let gridElements = document.getElementsByClassName("grid-element");
let enterEle = document.getElementById("enter");

searchIconEle.addEventListener("click", showDialpadModal);
let dialpadCloseModelEle = document.getElementsByClassName("close-ele")[2];
dialpadCloseModelEle.addEventListener("click", () => dialPadModalEle.style.display = "none");
function hoverHeroNames() {
    for (i = 0; i < heroDetailsEle.length; i++) {
        let heroDetailsChildEle = heroDetailsEle[i].firstElementChild;
        heroDetailsChildEle.addEventListener("mouseenter", changeHeroNameOnMouseEnter);
        heroDetailsChildEle.addEventListener("mouseleave", changeHeroNameOnMouseLeave)
    }
}

hoverHeroNames();
