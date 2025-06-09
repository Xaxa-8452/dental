document.addEventListener("DOMContentLoaded", () => {
  // --- 1. スライドショー処理 ---
  const slides = document.querySelectorAll('.fv_slider');
  let current = 0;

  function showNextSlide() {
    const previous = slides[current];
    current = (current + 1) % slides.length;
    const next = slides[current];

    next.classList.add('show');
    next.style.animation = 'none';
    void next.offsetWidth; // 再描画を強制
    next.style.animation = 'panImage 12s linear forwards';

    previous.style.transition = 'opacity 2s ease-in-out';
    previous.style.opacity = '0';

    setTimeout(() => {
      previous.classList.remove('show');
      previous.style.opacity = '';
      previous.style.transition = '';
    }, 2000);
  }

  setInterval(showNextSlide, 6000);

  // --- 2. キャッチコピーアニメーション ---
  const lines = [
    { text: "歯の健康、", textId: "catch-text-1", underlineId: "catch-underline-1" },
    { text: "ずっとそばで守ります。", textId: "catch-text-2", underlineId: "catch-underline-2" }
  ];

  const charDelay = 80;

  lines.forEach(({ text, textId, underlineId }) => {
    const textContainer = document.getElementById(textId);
    const underline = document.getElementById(underlineId);

    text.split("").forEach((char, i) => {
      const wrapper = document.createElement("span");
      wrapper.className = "char-wrapper";

      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char;
      span.style.animation = `appear 0.8s ease forwards`;
      span.style.animationDelay = `${i * 0.08}s`;

      wrapper.appendChild(span);
      textContainer.appendChild(wrapper);
    });

    setTimeout(() => {
      const charSpans = textContainer.querySelectorAll(".char");
      let totalWidth = 0;
      charSpans.forEach(span => totalWidth += span.offsetWidth);
      underline.style.width = `${totalWidth}px`;
      underline.style.animationDelay = `0s`;
    }, 10);

    setTimeout(() => {
      const charSpans = textContainer.querySelectorAll(".char");
      charSpans.forEach((el, i) => {
        el.style.animation = `appear 0.4s ease forwards, bounce 0.3s ease ${i * 0.1 + 1.8}s`;
      });
    }, text.length * charDelay + 1000);
  });


// --- 3. NEWSセクションの円アニメーション ---
const circles = document.querySelectorAll(".news_circle");
const newsSection = document.querySelector(".news"); // ← ここを修正！

if (circles.length > 0 && newsSection) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        circles.forEach((circle, index) => {
          const randomY = Math.floor(Math.random() * 40) - 20;
          circle.style.setProperty('--moveY', `${randomY}px`);

          const delay = index * 0.4;
          circle.style.setProperty('--delay', `${delay}s`);

          setTimeout(() => {
            circle.classList.add('inview');
          }, delay * 1000);
        });

        obs.disconnect(); // 一度だけ発火
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(newsSection);
}



  // --- 4. サービス画像ホバー切替 ---
  const mainImage = document.getElementById("mainServiceImage");
  const items = document.querySelectorAll(".service_item");

  let intervalId = null;
  let currentIndex = 0;
  let currentMode = null; // "pc" or "mobile"

  const images = Array.from(items).map(item => item.getAttribute("data-img")).filter(Boolean);

  // フェード付きで画像を切り替える関数
  function changeImageWithFade(src) {
    mainImage.classList.add("fade-out");
    setTimeout(() => {
      mainImage.setAttribute("src", src);
      mainImage.classList.remove("fade-out");
    }, 800); // フェード時間と一致させる
  }

  // PC用の初期化
  function initPC() {
    if (currentMode === "pc") return;
    currentMode = "pc";
    clearInterval(intervalId);

    // 最初の画像表示
    if (images[0]) {
      mainImage.setAttribute("src", images[0]);
    }

    items.forEach(item => {
      item.addEventListener("mouseenter", handleHover);
    });
  }

  // PC時のホバー処理
  function handleHover(e) {
    const imgSrc = e.currentTarget.getAttribute("data-img");
    if (imgSrc && mainImage.getAttribute("src") !== imgSrc) {
      changeImageWithFade(imgSrc);
    }
  }

  // モバイル用の初期化
  function initMobile() {
    if (currentMode === "mobile") return;
    currentMode = "mobile";

    // ホバーイベント削除（不要なイベントが残らないように）
    items.forEach(item => {
      item.removeEventListener("mouseenter", handleHover);
    });

    // 最初の画像表示
    if (images[0]) {
      mainImage.setAttribute("src", images[0]);
      currentIndex = 1;
    }

    intervalId = setInterval(() => {
      changeImageWithFade(images[currentIndex]);
      currentIndex = (currentIndex + 1) % images.length;
    }, 8000); // 6秒間隔
  }

  // ウィンドウサイズによってモードを切り替える
  function handleResize() {
    const isMobile = window.innerWidth <= 767;
    if (isMobile) {
      initMobile();
    } else {
      initPC();
    }
  }

  // 初期実行とリサイズイベント登録
  window.addEventListener("DOMContentLoaded", handleResize);
  window.addEventListener("resize", handleResize);

});

  // --- 5. ハンバーガーメニュー処理 ---
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });
  }

  // --- 6. ボタンホバーアニメーション処理 ---
  document.querySelectorAll('.slide-btn, .slide-btn-reverse').forEach(btn => {
    const arrow = btn.querySelector('.circle-arrow');

    if (arrow) {
      btn.addEventListener('mouseenter', () => {
        arrow.style.left = 'calc(100% - 40px)';
        setTimeout(() => {
          btn.classList.add('hovered');
        }, 100);
      });

      btn.addEventListener('mouseleave', () => {
        btn.classList.remove('hovered');
        arrow.style.left = '0';
      });
    }
  });
