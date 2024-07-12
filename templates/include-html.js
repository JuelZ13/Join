async function includeHTML() {
    let includeElements = document.querySelectorAll('[include-html]');
    for (var element of includeElements) {
        file = element.getAttribute("include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    openSummary();
}

