/* app.js - Serene Feline Care Interactive Logic */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Time-Based Feline Greeting
  initDynamicGreeting();

  // 2. Interactive Booking Form Handler
  initBookingForm();

  // 3. Interactive Service Card Chips Interaction
  initServiceChips();
});

/**
 * Dynamically updates the hero greeting message based on the visitor's current local time,
 * establishing a highly empathetic and personalized warm vibe.
 */
function initDynamicGreeting() {
  const greetingEl = document.getElementById('dynamic-greeting');
  if (!greetingEl) return;

  const currentHour = new Date().getHours();
  let greetingMsg = '';

  if (currentHour >= 5 && currentHour < 12) {
    greetingMsg = '따스한 아침 햇살처럼 평온한 오전, 소중한 반려묘의 건강을 함께 돌봅니다.';
  } else if (currentHour >= 12 && currentHour < 17) {
    greetingMsg = '나른하고 평화로운 오후 시간, 고양이의 스트레스 없는 치유 여정을 시작하세요.';
  } else if (currentHour >= 17 && currentHour < 22) {
    greetingMsg = '고요하고 안락한 저녁, 소중한 반려묘와 보호자님 모두를 위한 따뜻한 치유 공간입니다.';
  } else {
    greetingMsg = '깊고 고요한 밤, 늘 고양이의 평온을 최우선으로 생각하는 동반자적 병원입니다.';
  }

  greetingEl.innerText = greetingMsg;
}

/**
 * Handles the booking form submission, performing visual validation
 * and triggering a beautiful, animated confirmation dialog.
 */
function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const statusEl = document.getElementById('formStatus');

  if (!form || !statusEl) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Fetch form data
    const catName = document.getElementById('catName').value.trim();
    const ownerName = document.getElementById('ownerName').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;

    // Simple validation
    if (!catName || !ownerName || !service || !date || !time) {
      showStatus('모든 예약 필수 항목을 입력해 주셔야 반려묘의 진료 예약이 신청됩니다.', 'error');
      return;
    }

    // Format service text for the display
    const serviceNames = {
      'assessment': '종합 건강 검진 (Feline Assessment)',
      'vaccine': '스트레스 최소화 접종 (Vaccination)',
      'dental': '고양이 특화 치과 케어 (Dental)',
      'grooming': '무마취 안심 미용 (Pampering)'
    };

    const selectedServiceName = serviceNames[service] || '종합 케어';

    // Disable form fields during booking simulation
    setFormDisabled(form, true);

    // Simulate scheduling delay with micro-animations
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = '🐾 소중한 고양이의 일정 확인 중...';

    setTimeout(() => {
      // Re-enable form
      setFormDisabled(form, false);
      submitBtn.innerText = originalBtnText;

      // Display gorgeous confirmation card
      showStatus(`
        ✨ <strong>예약 신청이 성공적으로 접수되었습니다!</strong><br><br>
        • <strong>반려묘 이름</strong>: ${catName} 야옹이<br>
        • <strong>신청 프로그램</strong>: ${selectedServiceName}<br>
        • <strong>진료 예정 일시</strong>: ${date} (${time})<br><br>
        보호자(${ownerName})님께 곧 병원에서 해피콜을 드리겠습니다. 고양이의 안전을 먼저 생각합니다.
      `, 'success');

      // Reset form fields
      form.reset();
    }, 1500);
  });
}

/**
 * Shows the operation status under the booking form with smooth visual transitions.
 */
function showStatus(message, type) {
  const statusEl = document.getElementById('formStatus');
  if (!statusEl) return;

  statusEl.className = 'form-status'; // Reset classes
  statusEl.classList.add(type);
  statusEl.innerHTML = message;
  statusEl.style.display = 'block';

  // Smooth scroll to status message
  statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Disables or enables all interactive elements within the form.
 */
function setFormDisabled(form, disabled) {
  const inputs = form.querySelectorAll('input, select, textarea, button');
  inputs.forEach(input => {
    input.disabled = disabled;
    if (disabled) {
      input.style.opacity = '0.6';
    } else {
      input.style.opacity = '1';
    }
  });
}

/**
 * Adds interactive micro-animations and tag hover alerts when the user clicks
 * on individual service chips/tags, revealing veterinary advice.
 */
function initServiceChips() {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.style.cursor = 'pointer';
    chip.addEventListener('click', (e) => {
      const text = e.target.innerText;
      
      // Showcase custom interactive notification on click
      let tipMsg = '';
      if (text.includes('정밀 검진')) {
        tipMsg = '💡 고양이는 아픔을 숨기는 동물입니다. 매년 1회의 정밀 건강 검진을 권장합니다.';
      } else if (text.includes('무마취')) {
        tipMsg = '💡 무마취 미용은 고양이의 스트레스 호르몬 수치를 최대 80% 줄여줍니다.';
      } else if (text.includes('종합 접종')) {
        tipMsg = '💡 예방접종 전날은 충분한 수면과 사료 섭취가 고양이의 면역력 형성에 좋습니다.';
      } else {
        tipMsg = `🐾 고양이 특화 케어 프로그램: ${text}의 세부 일정을 보시려면 예약을 진행해 주세요!`;
      }
      
      // Briefly change chip style to secondary container to provide feedback
      chip.style.backgroundColor = 'var(--color-primary)';
      chip.style.color = '#ffffff';
      
      setTimeout(() => {
        chip.style.backgroundColor = '';
        chip.style.color = '';
      }, 1000);
      
      // Render status notice below the services grid
      let noticeEl = document.getElementById('service-notice');
      if (!noticeEl) {
        noticeEl = document.createElement('div');
        noticeEl.id = 'service-notice';
        noticeEl.style.marginTop = '24px';
        noticeEl.style.padding = '16px';
        noticeEl.style.borderRadius = 'var(--rounded-md)';
        noticeEl.style.backgroundColor = 'var(--color-primary-container)';
        noticeEl.style.color = 'var(--color-on-primary-container)';
        noticeEl.style.fontWeight = '500';
        noticeEl.style.textAlign = 'center';
        noticeEl.style.animation = 'fadeIn 0.3s ease';
        
        const grid = document.querySelector('.services-grid');
        grid.parentNode.appendChild(noticeEl);
      }
      noticeEl.innerHTML = tipMsg;
    });
  });
}
