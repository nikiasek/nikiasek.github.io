document.addEventListener("DOMContentLoaded", () => {
    const testdicts = [
        {
            name: "test1",
            link: "https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/",
            flag: ["Javascript", "html"]
        },
        {
            name: "test2",
            link: "https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/",
            flag: ["Python", "html"]
        },
        {
            name: "test3",
            link: "https://www.geeksforgeeks.org/how-to-create-dictionary-and-add-key-value-pairs-dynamically/",
            flag: ["Django", "React"]
        }
    ];
    
    let testdict2 = {
        name: "",
        flag: []
    };
    const searchDiv = document.getElementById("myInput");
    const test1 = document.getElementById("value1");
    const test2 = document.getElementById("value2");
    const test3 = document.getElementById("value3");
    const clearButton = document.getElementById("clearButton")
    const itemCard = document.getElementById("items")

    window.onload = () => {
        clearFilters()
        getUpdatedValues()
    }

    const checkboxes = () => {
        const checkbox = document.getElementsByClassName("check");
        testdict2.flag = []; // Reset the flags array
        for (let i = 0; i < checkbox.length; i++) {
            let checkboxValue = checkbox[i].value;
            if (checkbox[i].checked) {
                testdict2.flag.push(checkboxValue);
            }
        }
        test1.innerText = testdict2.flag.join(', '); // Join the array for better readability
        getUpdatedValues(); // Call to update the filtered values
    }

    const getUpdatedValues = () => {
        let filteredUsers = testdicts.filter((card) => {
            if(testdict2.name === "" && testdict2.flag.length === 0) {
                return "empty"
            }
             else if(testdict2.name === "") {
                // Check if there is at least one matching flag
                return testdict2.flag.some(flag => card.flag.includes(flag));
                
            }
            else if(testdict2.flag.length === 0) {
                // Check if the name matches the search input
                return card.name.toLowerCase().includes(testdict2.name.toLowerCase());
            }
            else {
                // Check if the name matches the search input
                const nameMatch = card.name.toLowerCase().includes(testdict2.name.toLowerCase());
                
                // Check if there is at least one matching flag
                const flagMatch = testdict2.flag.some(flag => card.flag.includes(flag));
                
                // Return true only if both conditions are met
                return nameMatch && flagMatch;
            }
        });

        console.log(filteredUsers)
    
        // Update the display with the filtered results
        if (filteredUsers.length > 0) {
            itemCard.innerHTML = ""
            filteredUsers.forEach(element => {
                itemCard.innerHTML += 
            `<div>
                <h1>${element.name}</h1>
            </div>`
            });
        } else {
            itemCard.innerHTML = ""
            testdicts.forEach(element => { 
                itemCard.innerHTML += 
            `<div>
                <h1>${element.name}</h1>
            </div>`
            });
        }
    }

    const updateValue = (e) => {
        const inputValue = e.target.value.toLowerCase();
        testdict2.name = inputValue;
        test2.innerText = testdict2.name; // Display the current search input
        getUpdatedValues(); // Update the filtered values based on the input
    }

    const clearFilters = () => {
        searchDiv.value = ""; // Clear the search input
        testdict2.name = ""; // Reset the name in the filter
        test1.innerText = ""; // Clear selected flags
        test2.innerText = ""; // Clear displayed search input
        test3.innerText = ""; // Clear displayed results
        const checkbox = document.getElementsByClassName("check");
        for (let i = 0; i < checkbox.length; i++) {
            checkbox[i].checked = false; // Uncheck all checkboxes
        }
    }

    // Event listeners
    searchDiv.addEventListener("input", updateValue);
    clearButton.addEventListener("click", clearFilters);
    const checkboxesElements = document.getElementsByClassName("check");
    for (let checkbox of checkboxesElements) {
        checkbox.addEventListener("change", checkboxes);
    }
});
