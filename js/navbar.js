// 加载导航栏并填充人物名单
fetch('navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-placeholder').innerHTML = html;

        // ✅ 关闭个人页逻辑
        requestAnimationFrame(() => {
            const navLinks = document.querySelectorAll('.navbar a');
            const floatingBox = document.getElementById('personal-page-placeholder');

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (link.classList.contains('no-close')) return;

                    if (floatingBox) {
                        floatingBox.style.display = 'none';
                        floatingBox.innerHTML = '';
                    }
                });
            });
        });

        // ✅ PROJECTS 下拉 toggle
        requestAnimationFrame(() => {
            const dropdown = document.querySelector('.dropdown');
            const toggle = document.querySelector('.dropdown-toggle');
            const infoPage = document.getElementById('info-page');

            if (dropdown && toggle) {
                toggle.addEventListener('click', (e) => {
                    e.preventDefault();

                    // ✅ 隐藏 info 页面
                    if (infoPage) {
                        infoPage.style.display = 'none';
                    }

                    // ✅ 切换 PROJECTS 下拉栏
                    dropdown.classList.toggle('show');
                });
            }
        });

        // ✅ 加载人物名单并设置点击加载个人页 iframe
        fetch('assets/shared/person_info.csv')
            .then(res => res.text())
            .then(csvText => {
                const parsed = Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true
                });

                const nameList = document.querySelector('.name-list');
                const floatingBox = document.getElementById('personal-page-placeholder');

                parsed.data.forEach(row => {
                    const rawName = row['Name'];
                    const pageExists = row['Available']?.trim() === '1';
                    if (!rawName) return;

                    const cleanName = rawName.trim();
                    const a = document.createElement('a');
                    a.innerHTML = `${cleanName}<sup>&#8201;TM</sup>`;

                    if (pageExists) {
                        const url = `personal_pages/${encodeURIComponent(cleanName)}.html`;
                        a.href = url;
                        a.classList.add('active-name'); // ✅ 加 hover 效果
                    } else {
                        a.style.pointerEvents = 'none'; // ❌ 不可点击
                    }

                    const li = document.createElement('li');
                    li.appendChild(a);
                    nameList.appendChild(li);
                });


                nameList.addEventListener('click', (e) => {
                    const a = e.target.closest('a');
                    if (!a) return;
                    e.preventDefault();
                    const url = a.getAttribute('href');

                    if (floatingBox) {
                        floatingBox.innerHTML = `
                            <button class="close-button" aria-label="Close">
                                <img src="assets/shared/close_button.png" alt="Close" />
                            </button>
                            <div class="mask2">
                                <div class="scrollable2">
                                    <iframe src="${url}" class="personal-iframe"></iframe>
                                </div>
                            </div>
                        `;
                        floatingBox.style.display = 'block';

                        requestAnimationFrame(() => {
                            const closeButton = document.querySelector('.close-button');
                            if (closeButton) {
                                closeButton.addEventListener('click', () => {
                                    floatingBox.style.display = 'none';
                                    floatingBox.innerHTML = '';
                                });
                            }
                        });
                    }

                    // ✅ 同时关闭 info 页面
                    const infoPage = document.getElementById('info-page');
                    if (infoPage) {
                        infoPage.style.display = 'none';
                    }
                });
            });

        // ✅ INFO 页面显示/关闭逻辑
        requestAnimationFrame(() => {
            const infoToggle = document.getElementById('info-toggle');
            const infoPage = document.getElementById('info-page');
            const personalPage = document.getElementById('personal-page-placeholder');

            if (infoToggle && infoPage) {
                infoToggle.addEventListener('click', (e) => {
                    e.preventDefault();

                    // 关闭个人页面
                    if (personalPage) {
                        personalPage.innerHTML = '';
                        personalPage.style.display = 'none';
                    }
// 收起 PROJECTS 下拉栏
                    document.querySelector('.dropdown')?.classList.remove('show');

                    // 显示 info
                    infoPage.style.display = 'block';
                });

                const closeButton = infoPage.querySelector('.close-button');
                if (closeButton) {
                    closeButton.addEventListener('click', () => {
                        infoPage.style.display = 'none';
                    });
                }
            }
        });
    });


