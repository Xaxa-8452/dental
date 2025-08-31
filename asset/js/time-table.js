// JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const timeTable = document.querySelector(".fv_time-table");

  if (timeTable) {
    timeTable.addEventListener("click", () => {
      timeTable.classList.toggle("hidden");
    });
  }
  // スクロール時の処理
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      // 1px でも下にスクロールしたら非表示
      timeTable.classList.add("hidden");
    } else {
      // 一番上なら表示
      timeTable.classList.remove("hidden");
    }
  });
});
