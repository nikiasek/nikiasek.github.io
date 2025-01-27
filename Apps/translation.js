document.addEventListener("DOMContentLoaded", () => {
    let translations = {};
    const dropdown = document.querySelector('.custom-dropdown');
    const selected = dropdown.querySelector('.selected');
    const options = dropdown.querySelector('.options');
    let cookieValue

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
        const updateElement = (selector, textContent) => {
            const element = document.querySelector(selector);
            if (element) {
                element.innerText = textContent;
            }
        };
    
        updateElement(".contacts", translations.header.contacts);
        updateElement(".contacts2", translations.header.contacts);
        updateElement(".library", translations.header.library);
        updateElement(".library2", translations.header.library);
        updateElement(".home", translations.header.home);
        updateElement(".home2", translations.header.home);
        updateElement(".intro", translations.main.intro);
        updateElement(".description", translations.main.description);
        if (document.querySelector(".description2")) {
            document.querySelector(".description2").innerHTML = `<span class="gradient-text">${translations.main.description2}</span>`;
        }
        updateElement(".vision", translations.main.vision);
        updateElement(".vision2", translations.main.vision);
        if (document.querySelector(".focus")) {
            document.querySelector(".focus").innerHTML = `${translations.main.focus} <span class="gradient-text">${translations.main.focus2}</span>`;
        }
        updateElement(".programmer", translations.main.programmer);
        updateElement(".programmer2", translations.main.programmer2);
        updateElement(".projects", translations.main.projects);
        updateElement(".project_description", translations.main.project_description);
        updateElement(".tools", translations.main.tools);
        updateElement(".tools_description", translations.main.tools_description);
        updateElement(".programming_lang", translations.main.programming_lang);
        updateElement(".frameworks", translations.main.frameworks);
        updateElement(".libraries", translations.main.libraries);
        updateElement(".get_in_touch", translations.footer.get_in_touch);
        updateElement(".connect", translations.footer.connect);
        updateElement(".portfolio", translations.footer.portfolio);
        updateElement(".lang_selected", translations.lang);
        updateElement(".search", translations.library.search);
        updateElement(".search_description", translations.library.search_description)
    };
    

    const updateLang = (e) => {
        loadTranslations()
    }

    selected.addEventListener('click', () => {
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
    });

    options.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            selected.innerHTML = `<span class="gradient-text">${option.textContent}</span><img src="assets/arrowhead.png" alt="">`;
            options.style.display = 'none';
            document.cookie =`lang=${option.getAttribute("data-value")}; SameSite=None; Secure  `
            console.log(option.getAttribute('data-value'))
            loadTranslations(option.getAttribute('data-value'))
        });
    });
    
    if(!document.cookie.split("; ").find((row) => row.startsWith("lang"))) {
        document.cookie =`lang=en; SameSite=None; Secure`
        loadTranslations(cookieValue)
    }
    else {
        cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("lang="))
        ?.split("=")[1];
        loadTranslations(cookieValue); 
    }
    
});
