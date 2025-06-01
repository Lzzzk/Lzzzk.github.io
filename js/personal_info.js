fetch('../assets/shared/person.csv')
    .then(res => res.text())
    .then(csvText => {
            const parsed = Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true
            });

            const data = parsed.data;

            const artistName = document.querySelector('.artist-name')?.textContent.trim();
            if (!artistName) return;

            const person = data.find(p => p['Name']?.trim() === artistName);
            if (!person) return;

            const cleanText = str => str?.trim().replace(/^"(.*)"$/, '$1') || '';

            document.querySelector('.project-title').textContent = cleanText(person['Project Name']);
            document.querySelector('.intro').textContent = cleanText(person['Introduction']);

            document.querySelector('.contact').innerHTML = `
      ${person['Course Name'] || ''}<br />
      ${person['Email'] || ''}<br />
      ${person['Ins'] || ''}
    `;
    });
