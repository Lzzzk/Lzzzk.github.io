fetch('../assets/shared/person.csv')
    .then(res => res.text())
    .then(csvText => {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');

        const nameIndex = headers.indexOf('Name');
        const courseIndex = headers.indexOf('Course Name');
        const projectIndex = headers.indexOf('Project Name');
        const introIndex = headers.indexOf('Introduction');
        const emailIndex = headers.indexOf('Email');
        const insIndex = headers.indexOf('Ins');

        // ✅ 获取页面上已有的名字
        const artistName = document.querySelector('.artist-name')?.textContent.trim();

        if (!artistName) return;



        // ✅ 查找 CSV 中与 artistName 匹配的行
        const dataLine = lines.slice(1).find(line => {
            const cols = line.split(',');
            return cols[nameIndex]?.replace(/^"|"$/g, '').trim() === artistName;
        });


        if (!dataLine) return;

        const cols = dataLine.split(',');
        const course = cols[courseIndex]?.trim();
        const project = cols[projectIndex]?.trim();
        const intro = cols[introIndex]?.replace(/"/g, '').trim();
        const email = cols[emailIndex]?.trim();
        const ins = cols[insIndex]?.trim();

        // ✅ 填充其余字段
        document.querySelector('.project-title').textContent = project;
        document.querySelector('.intro').textContent = intro;
        document.querySelector('.contact').innerHTML = `${course}<br />${email}<br />${ins}`;
    });
