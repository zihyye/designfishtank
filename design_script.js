document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sub-category-nav a');
    const sections = document.querySelectorAll('.subpage-content section');

    // URL의 해시(#)를 확인하여 해당 섹션을 초기에 표시하는 함수
    const showSectionFromHash = () => {
        const hash = window.location.hash; // 예: #link-sites 또는 #tools
        
        // 해시 값이 있는지 확인
        if (hash) {
            let sectionFound = false;
            sections.forEach(section => {
                if (section.id === hash.substring(1)) {
                    section.style.display = 'block';
                    sectionFound = true;
                } else {
                    section.style.display = 'none';
                }
            });
            // 만약 일치하는 ID가 없으면 첫 번째 섹션을 보여줌
            if (!sectionFound && sections.length > 0) {
                sections[0].style.display = 'block';
            }
        } else {
            // 해시가 없으면(그냥 design.html로 오면) 기본으로 첫 번째 섹션 표시
            sections.forEach((section, index) => {
                section.style.display = (index === 0) ? 'block' : 'none';
            });
        }
    };
    
    // 네비게이션 링크 클릭 시 섹션 전환
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetHash = link.getAttribute('href'); // 예: #tools
            
            sections.forEach(section => {
                if (section.id === targetHash.substring(1)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // 1. 페이지가 처음 로드될 때 URL의 #에 맞는 섹션을 보여줌
    showSectionFromHash();
    
    // 2. (이미 페이지에 들어온 후) #링크가 변경될 때마다 섹션을 다시 보여줌
    window.addEventListener('hashchange', showSectionFromHash);
});