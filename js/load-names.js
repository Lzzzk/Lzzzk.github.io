fetch('assets/shared/names.txt')
    .then(res => res.text())
    .then(text => {
        const names = text.trim().split('\n');
        const ul = document.querySelector('.name-list');
        names.forEach(name => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="#">${name}<sup>&#8201;TM</sup></a>`;
            ul.appendChild(li);
        });
    });