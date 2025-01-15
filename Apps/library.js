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
    const clearButton = document.createElement("button");
    clearButton.innerText = "Clear";
    searchDiv.parentNode.insertBefore(clearButton, searchDiv.nextSibling);

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
            // Check if the name matches the search input
            const nameMatch = card.name.toLowerCase().includes(testdict2.name.toLowerCase());
    
            // Check if there is at least one matching flag
            const flagMatch = testdict2.flag.some(flag => card.flag.includes(flag));
    
            // Return true only if both conditions are met
            return nameMatch && flagMatch;
        });
    
        // Update the display with the filtered results
        if (filteredUsers.length > 0) {
            test3.innerText = filteredUsers.map(user => user.name).join(', ');
        } else {
            test3.innerText = "No results found"; // Show message if no results
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
