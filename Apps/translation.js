document.addEventListener("DOMContentLoaded", () => {
    let translations = {};

    const loadTranslations = async (lang) => {
        fetch(`../Languages/${lang}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                translations = data;
                updateTextContent();
            })
            .catch(error => {
                console.error("Error loading translations:", error);
            });
    };

    const updateTextContent = () => {
        document.querySelector(".contacts").innerText = translations.header.contacts;
        document.querySelector(".contacts2").innerText = translations.header.contacts;
        document.querySelector(".library").innerText = translations.header.library;
        document.querySelector(".library2").innerText = translations.header.library;
        document.querySelector(".intro").innerText = translations.main.intro;
        document.querySelector(".description").innerText = translations.main.description;
        document.querySelector(".description2").innerText = translations.main.description2;
        document.querySelector(".vision").innerText = translations.main.vision;
        document.querySelector(".vision2").innerText = translations.main.vision;
        document.querySelector(".focus").innerHTML = `${translations.main.focus} <span class="gradient-text">${translations.main.focus2}</span>`
        document.querySelector(".programmer").innerText = translations.main.programmer
        document.querySelector(".programmer2").innerText = translations.main.programmer2
        document.querySelector(".projects").innerText = translations.main.projects;
        document.querySelector(".project_description").innerText = translations.main.project_description
    
    
    };  

    // Load default language
    loadTranslations("cz");
});
