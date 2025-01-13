const testdicts = [
    {
        name : "Test1",
        link: "https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/",
        flag : ["javascript", "html"]
    },
    {
        name : "Test2",
        link: "https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/",
        flag : ["python", "html"]
    },
    {
        name : "Test3",
        link: "https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/",
        flag : ["django", "react"]
    }
]
const div = document.getElementById("items")
const searchDiv = document.getElementById("myInput")

searchDiv.addEventListener("onsearch", updateValue)

function updateValue(e) {
    div.innerHTML = `<p>${e.target.value}</p>`
}


let filteredUsers = testdicts.filter((card) => {
    return card.name === "Test1";
});

console.log(filteredUsers)


div.innerHTML += "<h1>test</h1>" + filteredUsers[0].flag

