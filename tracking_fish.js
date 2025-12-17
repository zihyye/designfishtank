document.addEventListener('DOMContentLoaded', () => {
    const cursorFish = document.getElementById('cursor-fish');
    if (!cursorFish) return;

    // 현재 금붕어의 위치 (실제 DOM 위치)
    let currentX = window.innerWidth / 2; // 초기 X 위치
    let currentY = window.innerHeight / 2; // 초기 Y 위치
    
    // 마우스 커서의 목표 위치
    let targetX = currentX;
    let targetY = currentY;
    
    // 움직임 제어 변수
    let lastDirection = 1; // 1: 오른쪽, -1: 왼쪽
    let isPaused = false; // 일시 정지 상태
    
    // 부드러움 정도 (0.05 ~ 0.2 사이의 값이 적당합니다. 값이 클수록 빨라집니다.)
    const followSpeed = 0.08; 

    // 초기 위치 설정
    cursorFish.style.left = `${currentX}px`;
    cursorFish.style.top = `${currentY}px`;

    // 1. 마우스 위치 감지
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });
    
    // 2. 금붕어 클릭 이벤트 (멈춤/재개)
    cursorFish.addEventListener('click', () => {
        isPaused = !isPaused;
        
        // 멈췄을 때 사용자에게 멈췄음을 시각적으로 알리기 위해
        if (isPaused) {
            cursorFish.style.opacity = '0.5'; // 투명하게
            cursorFish.style.boxShadow = '0 0 10px 5px rgba(255, 255, 0, 0.5)'; // 빛나는 효과
        } else {
            cursorFish.style.opacity = '1';
            cursorFish.style.boxShadow = 'none';
        }
    });

    // 3. 애니메이션 루프 (부드러운 움직임 구현)
    function animate() {
        if (!isPaused) {
            // 현재 위치에서 목표 위치까지의 차이
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            
            // 🌟 부드러운 움직임 구현: 차이의 일부(followSpeed)만 이동
            currentX += dx * followSpeed;
            currentY += dy * followSpeed;
            
            // 4. 금붕어 방향 설정 (좌우 반전)
            // dx가 0이 아닌 경우에만 방향을 업데이트하여 제자리 멈춤 시 방향 변화 방지
            if (Math.abs(dx) > 0.5) { 
                if (dx > 0) { // 오른쪽으로 이동 중
                    lastDirection = 1;
                } else { // 왼쪽으로 이동 중
                    lastDirection = -1;
                }
            }

            // CSS Transform 업데이트
            let transformValue = `translate(-50%, -50%)`;
            if (lastDirection === -1) {
                // 왼쪽을 바라보도록 이미지 반전
                transformValue += ' scaleX(-1)';
            } else {
                transformValue += ' scaleX(1)';
            }
            
            // 위치와 방향을 DOM에 적용
            cursorFish.style.left = `${currentX}px`;
            cursorFish.style.top = `${currentY}px`;
            cursorFish.style.transform = transformValue;
        }

        // 다음 프레임을 요청하여 애니메이션 루프를 계속 실행
        requestAnimationFrame(animate);
    }

    // 애니메이션 시작
    animate();
});