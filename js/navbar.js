// navbar.js
// 1. 加载导航栏 HTML
fetch('navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('navbar-placeholder').innerHTML = html;

        // 2. 读取人名列表
        fetch('assets/shared/names.txt')
            .then(res => res.text())
            .then(text => {
                const lines = text.trim().split('\n');
                const nameList = document.querySelector('.name-list');

                lines.forEach(name => {
                    const cleanName = name.trim();
                    const url = `personal_pages/${encodeURIComponent(cleanName)}.html`;

                    const a = document.createElement('a');
                    a.href = url;
                    a.innerHTML = `${cleanName}<sup>&#8201;TM</sup>`;  // ✅ 强制加上 TM 上标

                    const li = document.createElement('li');
                    li.appendChild(a);
                    nameList.appendChild(li);
                });

                // ✅ 3. 委托监听点击事件（必须放这里）
                const floatingBox = document.getElementById('personal-page-placeholder');

                nameList.addEventListener('click', (e) => {
                    const a = e.target.closest('a');
                    if (!a) return;

                    e.preventDefault();
                    const url = a.getAttribute('href');

                    if (floatingBox) {
                        floatingBox.innerHTML = `
              <div class="mask2">
                <div class="scrollable2">
                  <iframe src="${url}" class="personal-iframe"></iframe>
                </div>
              </div>
            `;
                        floatingBox.style.display = 'block';
                    }
                });
            });
    });
