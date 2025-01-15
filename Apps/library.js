const testdicts = [
    {
        name : "test1",
        link: "https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/",
        flag : ["javascript", "html"]
    },
    {
        name : "test2",
        link: "https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/",
        flag : ["python", "html"]
    },
    {
        name : "tesst3",
        link: "https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/",
        flag : ["django", "react"]
    }
];

let testdict2 = [
    {
        name: "",
        flag: []
    }
]

const searchDiv = document.getElementById("myInput");
let listFilter = [];
let searchFilter = "";
const test1 = document.getElementById("value1");
const test2 = document.getElementById("value2");
const test3 = document.getElementById("value3");

const checkboxes = () => {
    const checkbox = document.getElementsByClassName("check");
    for(let i = 0; i < checkbox.length; i++) {
        let checkboxValue = checkbox[i].value
        console.log("val: " + checkboxValue)
        if(checkbox[i].checked) {
            if(listFilter.indexOf(checkboxValue) === -1) {
                listFilter.push(checkboxValue)
                console.log("jo: " + checkboxValue)
            }
        }
        else {
            const index = listFilter.indexOf(checkboxValue);
            if(index !== -1) {
                listFilter.splice(index, 1)
                console.log("ne: " + checkboxValue)
            }
        }
    }
    test1.innerText = listFilter
}

const getUpdatedValues = () => {
    let filteredUsers = testdicts.filter((card) => {
        return card.name.toLowerCase().includes(inputValue);
    });
}

const updateValue = (e) => {
    const inputValue = e.target.value.toLowerCase();
    searchFilter = inputValue;
    test2.innerText = searchFilter;
    test3.innerText = filteredUsers.map(user => user.name).join(', ');
}

searchDiv.addEventListener("input", updateValue)


