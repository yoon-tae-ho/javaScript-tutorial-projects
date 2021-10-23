const states = document.querySelectorAll(".main__state");

const headerForm = document.querySelector(".main__header-form");
const headerInput = document.querySelector(".main__header-input");

const itemContainer = document.querySelector(".main__item-list");

const deleteAllBtn = document.querySelector(".main__delete-all-btn")

// Local Storage
const ITEMS_LS = "groceryItems";

// Class Names
const HIDDEN_CN = "hidden";
const ITEM_LI_CN = "main__item";
const ITEM_NAME_CN = "main__item-name";
const ITEM_MODIFY_BTN_CN = "main__modify-btn";
const ITEM_MODIFY_ICON_CNS = ["fas", "fa-edit", "fa-xs"];
const ITEM_DELETE_BTN_CN = "main__delete-btn";
const ITEM_DELETE_ICON_CNS = ["fas", "fa-trash", "fa-xs"];

// Variables
const stateIndex = {
  empty: 0,
  delete: 1,
  deleteAll: 2,
  add: 3,
  change: 4
};
let itemObjs = [];
let timeoutID = "";

function loadItems() {
  const loadedItemObjs = localStorage.getItem(ITEMS_LS);
  const parsedItemObjs = JSON.parse(loadedItemObjs);

  parsedItemObjs.forEach(parsedItemObj => {
    paintItem(parsedItemObj);
  })
}

function saveItems() {
  const stringifiedItemObjs = JSON.stringify(itemObjs);
  localStorage.setItem(ITEMS_LS, stringifiedItemObjs);
}

function deleteAllItems() {
  // remove all item elements
  const allItems = itemContainer.querySelectorAll(`.${ITEM_LI_CN}`);
  allItems.forEach(item => {
    itemContainer.removeChild(item);
  })

  // remove all object of itemObjs
  itemObjs = [];

  paintState(stateIndex.deleteAll);
  saveItems();
}

function deleteItem(event) {
  const targetIcon = event.target;
  const targetBtn = targetIcon.parentNode;
  const targetItem = targetBtn.parentNode;

  itemContainer.removeChild(targetItem);

  const newitemObjs = itemObjs.filter(itemObj => {
    return `${itemObj.id}` !== `${targetItem.id}`;
  });
  itemObjs = newitemObjs;

  paintState(stateIndex.delete);
  saveItems();
}

function pauseAddSubmit() {
  headerForm.removeEventListener("submit", handleAddSubmit);
}

function resumeAddSubmit() {
  headerForm.addEventListener("submit", handleAddSubmit);
}

function handleModifySubmit(event, targetItem, index) {
  event.preventDefault();
  const newValue = headerInput.value;
  headerInput.value = "";

  // modify item element text
  const itemNameElement = targetItem.querySelector(`.${ITEM_NAME_CN}`);
  itemNameElement.innerText = newValue;

  // modify value of itemObjs
  itemObjs[index].value = newValue;

  paintState(stateIndex.change);
  // headerForm.removeEventListener("submit", handleModifySubmit);
  resumeAddSubmit();
  saveItems();
}

function modifyItem(event) {
  const targetIcon = event.target;
  const targetBtn = targetIcon.parentNode;
  const targetItem = targetBtn.parentNode;

  pauseAddSubmit();
  
  // focus on headerInput
  headerInput.focus();

  itemObjs.forEach((itemObj, index) => {
    if (`${itemObj.id}` === `${targetItem.id}`) {
      headerInput.value = itemObj.value;
      // *****
      headerForm.addEventListener("submit", (event) => {
        handleModifySubmit(event, targetItem, index);
      }, {
        once: true  
      });
    }
  })

  saveItems();
}

function paintItem(itemObj) {
  const list = document.createElement("li");
  list.classList.add(ITEM_LI_CN);
  list.id = itemObj.id;

  const itemName = document.createElement("h4");
  itemName.classList.add(ITEM_NAME_CN);
  itemName.innerText = itemObj.value;

  const modifyBtn = document.createElement("button");
  modifyBtn.classList.add(ITEM_MODIFY_BTN_CN);
  modifyBtn.addEventListener("click", modifyItem);
  
  const modifyIcon = document.createElement("i");
  ITEM_MODIFY_ICON_CNS.forEach(className => {
    modifyIcon.classList.add(className);
  });
  
  modifyBtn.appendChild(modifyIcon);
  
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add(ITEM_DELETE_BTN_CN);
  deleteBtn.addEventListener("click", deleteItem);

  const deleteIcon = document.createElement("i");
  ITEM_DELETE_ICON_CNS.forEach(className => {
    deleteIcon.classList.add(className);
  });

  deleteBtn.appendChild(deleteIcon);

  list.appendChild(itemName);
  list.appendChild(modifyBtn);
  list.appendChild(deleteBtn);

  itemContainer.appendChild(list);

  itemObjs.push(itemObj);

  saveItems();
}

function createNewItemObj(value) {
  const newId = new Date().getTime();
  const newItemObj = {
    value: value,
    id: newId
  };

  return newItemObj;
}

function paintState(index) {
  let currentState;
  states.forEach(state => {
    if (!state.classList.contains(HIDDEN_CN)) {
      currentState = state;
    }
  })

  if (currentState !== undefined) {
    // state already exist
    currentState.classList.add(HIDDEN_CN);
  }

  states[index].classList.remove(HIDDEN_CN);
  timeoutID = setTimeout(function() {
    states[index].classList.add(HIDDEN_CN);
  }, 1500);
}

function handleAddSubmit(event) {
  event.preventDefault();
  const inputValue = headerInput.value;
  headerInput.value = "";

  if (inputValue === "") {
    paintState(stateIndex.empty);
  } else {
    const newItemObj = createNewItemObj(inputValue);
    paintItem(newItemObj);
    paintState(stateIndex.add);
  }
}

function init() {
  loadItems();
  headerForm.addEventListener("submit", handleAddSubmit);
  deleteAllBtn.addEventListener("click", deleteAllItems);
}

init() ;