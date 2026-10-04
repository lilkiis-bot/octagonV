/* This stays a classic script: even a failed module load must give an explanation. */
(function () {
  var banner = document.getElementById("app-status");
  var cameraStatus = document.getElementById("camera-status");
  var script = document.currentScript;
  var entry = script.getAttribute("data-entry") || "./src/main.js?v=20261004-4";
  var ready = false;
  function fail(detail) {
    if (ready) return;
    banner.hidden = false;
    banner.setAttribute("data-error", "true");
    banner.textContent =
      "앱을 불러오지 못했습니다. 새 업로드용 ZIP의 파일을 모두 같은 위치에 올린 뒤 새로고침해 주세요. (" +
      detail +
      ")";
    cameraStatus.textContent =
      "실행 파일을 읽지 못해 카메라 버튼을 준비하지 못했습니다.";
  }
  if (location.protocol === "file:") {
    fail("파일 앱에서 열기 대신 GitHub Pages HTTPS 주소를 사용하세요");
    return;
  }
  window.addEventListener("octagon-ready", function () {
    ready = true;
    banner.hidden = true;
    banner.removeAttribute("data-error");
  });
  window.addEventListener("error", function (event) {
    if (event.message) fail(event.message);
  });
  var module = document.createElement("script");
  module.type = "module";
  module.src = entry;
  module.onerror = function () {
    fail("실행 파일 경로 또는 브라우저 지원 확인 필요");
  };
  document.body.appendChild(module);
  setTimeout(function () {
    if (!ready)
      fail("불러오기 지연 · 네트워크와 파일 업로드 상태를 확인하세요");
  }, 20000);
})();
