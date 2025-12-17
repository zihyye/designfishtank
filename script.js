document.addEventListener('DOMContentLoaded', () => {
    // 1. 모든 카테고리 링크 요소 선택
    const categoryLinks = document.querySelectorAll('.category-block a');
    
    // 2. 모든 콘텐츠 섹션 요소 선택
    const contentSections = document.querySelectorAll('.category-content');
    
    // 3. 각 카테고리 링크에 클릭 이벤트 리스너 추가
    categoryLinks.forEach(link => {
        // 링크의 기본 동작(페이지 이동) 방지
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            
            // 클릭된 링크의 텍스트를 기반으로 콘텐츠 ID 결정 (간소화된 방식)
            // 예: "디자인 사이트 링크 모음" -> "content-design" 섹션을 열기 위함
            
            // 부모 .category-block을 찾아 ID를 content-ID 형태로 변환
            const parentBlock = link.closest('.category-block');
            if (!parentBlock) return; 

            // 부모의 클래스 (category-design, category-info, category-community)를 추출
            const categoryClass = Array.from(parentBlock.classList).find(cls => cls.startsWith('category-'));
            
            if (!categoryClass) return;
            
            // 'category-design' -> 'content-design'으로 변환
            const targetId = categoryClass.replace('category', 'content');

            // 4. 모든 콘텐츠 숨기기
            contentSections.forEach(section => {
                section.classList.add('hidden');
            });

            // 5. 목표 콘텐츠 보여주기
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                
                // 콘텐츠가 나타난 후 부드럽게 스크롤 (선택 사항)
                targetContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});