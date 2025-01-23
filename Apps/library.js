document.addEventListener("DOMContentLoaded", () => {
    const testdicts = [
        {
            name: "MUDr caitlyn",
            link: "https://github.com/nikiasek/MUDrCaitlyn",
            flag: ["Python"]
        },
        {
            name: "Arcaseca",
            link: "https://github.com/nikiasek/Arcaseca",
            flag: ["Python", "Django", "Javascript", "Html", "Css"]
        },
        {
            name: "Calculator",
            link: "https://github.com/nikiasek/calculator",
            flag: ["Python"]
        },
        {
            name: "School - Web Development",
            link: "https://github.com/nikiasek/school-wevDevelopment",
            flag: ["Html", "Css", "Javascript"]
        },
        {
            name: "Cupid's Journal",
            link: "https://github.com/nikiasek/school-uvod-html",
            flag: ["React", "Javascript", "Css", "Html"]
        },
        {
            name: "School - Python",
            link: "https://github.com/nikiasek/python-school",
            flag: ["Python"]
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
            if(testdict2.name === "") {
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
        if(filteredUsers.length === 0) {
            itemCard.innerHTML = 
            `
            <div class="flex-item">
                <h1>No results!</h1>
            </div>
            `
        }
        else if (filteredUsers.length > 0) {
            itemCard.innerHTML = ""
            filteredUsers.forEach(element => {
                itemCard.innerHTML += 
            `<div class="flex-item">
                <h1>${element.name}</h1>
                <a href="${element.link}"> project link!</a>
            </div>`
            });
        } else {
            itemCard.innerHTML = ""
            testdicts.forEach(element => { 
                itemCard.innerHTML += 
            `<div class="flex-item">
                <h1>${element.name}</h1>
                <a href="${element.link}"> project link!</a>
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
    const checkboxesElements = document.getElementsByClassName("check");
    for (let checkbox of checkboxesElements) {
        checkbox.addEventListener("change", checkboxes);
    }
});
