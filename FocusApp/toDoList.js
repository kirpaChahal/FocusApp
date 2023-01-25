const ITEMS_CONTAINER = document.getElementById("items");
const ITEM_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

//const clkSound = new Audio('clickSound.mp3');

let items = getItems();

function getItems(){
    const val = localStorage.getItem("todo-test") || "[]";

    return JSON.parse(val);
}

function setItems(items){
    const itemsJson = JSON.stringify(items);

    localStorage.setItem("todo-test", itemsJson);
}

function addItem(){
    items.unshift({ //adds item to top of list
        description: "",
        completed: false
    });

    setItems(items);
    refreshList();
}

function updateItem(item, key, value){
    item[key] = value;
    setItems(items);
    refreshList();

}

function refreshList(){
    //todo sort items

    items.sort((a,b) =>{
        if(a.completed){
            return 1;
        }
        if(b.completed){
            return -1;
        }
        return a.description < b.description ? -1 : 1; //sorts list alphabetically
    });

    ITEMS_CONTAINER.innerHTML = "";

    for(const item of items){
        const itemElement = ITEM_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        descriptionInput.addEventListener("change", () =>{
            updateItem(item, "description", descriptionInput.value);  
        });

        completedInput.addEventListener("change", () =>{
            updateItem(item, "completed", completedInput.checked);  
        });

        ITEMS_CONTAINER.append(itemElement);
    }
}

ADD_BUTTON.addEventListener("click", () =>{
    addItem();
    clkSound.play();
});

refreshList();