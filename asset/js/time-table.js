function resizeTimeTable() {
  const timeTable = document.querySelector('.fv_time-table');
  if (!timeTable) return;

  const maxRight = 471;
  const baseWindowWidth = 1000;
  const triggerWidth = 1100;
  const baseBottomPx = 600;
  const maxBottomIncrease = 100;

  const currentWidth = window.innerWidth;
  const scaleRatio = Math.min(currentWidth / baseWindowWidth, 1);

  // スケール
  timeTable.style.transform = `scale(${scaleRatio})`;
  timeTable.style.transformOrigin = 'right top';

  // bottom調整（最大+50pxまで）
  let adjustedBottom = baseBottomPx;
  if (currentWidth < triggerWidth) {
    const increase = Math.min(triggerWidth - currentWidth, maxBottomIncrease);
    adjustedBottom += increase;
  }
  timeTable.style.bottom = `${adjustedBottom}px`;

  // hidden時だけ right を調整
  if (timeTable.classList.contains('hidden')) {
    const hiddenRight = maxRight * scaleRatio;
    timeTable.style.right = `-${Math.round(hiddenRight)}px`;
  } else {
    timeTable.style.right = '';
  }
}



  // 初期・リサイズ時に反映
  window.addEventListener('DOMContentLoaded', resizeTimeTable);
  window.addEventListener('resize', resizeTimeTable);

  // toggleボタンでhidden切替時にも反映
  document.addEventListener("DOMContentLoaded", function () {
    const timeTable = document.querySelector(".fv_time-table");
    const verticalButton = document.getElementById("verticalBtn");

    timeTable.addEventListener("click", function () {
      timeTable.classList.toggle("hidden");
      resizeTimeTable(); // ← hiddenが切り替わったらright再設定
    });

    window.addEventListener("scroll", function () {
      if (window.scrollY === 0) {
        timeTable.classList.remove("hidden");
      } else {
        if (!timeTable.classList.contains("hidden")) {
          timeTable.classList.add("hidden");
        }
      }
      resizeTimeTable(); // スクロールでhidden変更時もright再設定
    });
  });

