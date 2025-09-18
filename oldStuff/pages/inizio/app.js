const API_KEY = 'AIzaSyB1PsBdYlDZ2Hnqy-XF5IK0Nv4Cz5dybto';
const SEARCH_ENGINE_ID = '024557f479dbb4973';

function search() {
    const query = document.getElementById('hledanyText').value;
    if (!query) {
        alert('Zadejte prosím hledaný výraz.');
        return false;
    }

    console.log('Searching for:', query);
    
    const url = `https://www.googleapis.com/customsearch/v1?q=${query.split(' ').join('+')}&key=${API_KEY}&cx=${SEARCH_ENGINE_ID}`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('API Response:', data);
            if (!data.items) {
                throw new Error('No items found in response');
            }
            const results = data.items;
            displayResults(results);
            downloadJSON(results, query);
        })
        .catch(error => {
            console.error('Chyba při volání API:', error);
            const resultContainer = document.getElementById('results');
            resultContainer.innerHTML = `<div class="error">Chyba při vyhledávání: ${error.message}</div>`;
        });
    
    return false;
}

function displayResults(results) {
    const resultContainer = document.getElementById('results');
    resultContainer.innerHTML = ''; // vyčistit předchozí výsledky
    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');
        resultElement.innerHTML = `
            <h3><a href="${result.link}" target="_blank">${result.title}</a></h3>
            <p>${result.snippet}</p>
        `;
        resultContainer.appendChild(resultElement);
    });
}

function downloadJSON(data, query) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${query}.json`;
    link.click();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        search,
        displayResults
    };
}
