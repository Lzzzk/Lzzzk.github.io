fetch('../assets/shared/person_info.csv')
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
            document.querySelector('.project-intro').textContent = cleanText(person['Introduction']);
        document.querySelector('.bio').textContent = cleanText(person['Bio']);
        document.querySelector('.course').textContent = cleanText(person['Course Name']);


        const courseElement = document.querySelector('.course');
        const courseText = cleanText(person['Course Name']);

        if (courseText === 'MA Digital Media') {
            courseElement.style.color = '#122D8C'; // 深蓝
        } else if (courseText === 'MA Photography Practice') {
            courseElement.style.color = '#DE5217'; // 橘红
        }



        const rawIns = person['Ins']?.trim();
        const usernameOnly = rawIns?.replace(/^@/, ''); // 去掉开头的 @，防止重复

        document.querySelector('.contact').innerHTML = `
  ${person['Email'] || ''}<br />
  ${rawIns ? `<a href="https://instagram.com/${usernameOnly}" target="_blank" rel="noopener noreferrer" style="text-decoration: underline;
  color: inherit;">${rawIns}</a>` : ''}
`;

    });
