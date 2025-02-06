document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header.html", "header");
    loadComponent("footer.html", "footer");
});

function loadComponent(url, placeholderId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text(); // Return the text promise
        })
        .then(data => {
            console.log(data); // Now you'll log the actual content
            const element = document.getElementById(placeholderId);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error(`Element with ID "${placeholderId}" not found.`);
            }
        })
        .catch(error => console.error(`Error loading ${url}:`, error));
}
