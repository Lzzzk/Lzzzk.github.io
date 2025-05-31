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

        // 获取当前页面的文件名作为人物名称（如 "Alice Zhang.html" => "Alice Zhang"）
            const fileName = window.location.pathname.split('/').pop().replace('.html', '').trim();
            const dataLine = lines.slice(1).find(line => {
                    const cols = line.split(',');
                    return cols[nameIndex]?.replace(/^"|"$/g, '').trim() === fileName;
            });
            if (!dataLine) return;

            const cols = dataLine.split(',');
            const name = cols[nameIndex]?.trim();
            const course = cols[courseIndex]?.trim();
            const project = cols[projectIndex]?.trim();
            const intro = cols[introIndex]?.replace(/"/g, '').trim();
            const email = cols[emailIndex]?.trim();
            const ins = cols[insIndex]?.trim();

// 插入信息到页面模板
            document.querySelector('.artist-name').textContent = name;
            document.querySelector('.project-title').textContent = project;
            document.querySelector('.intro').textContent = intro;
            document.querySelector('.contact').innerHTML = `${course}<br />${email}<br />${ins}`;

    });
