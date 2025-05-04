document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const googleData = JSON.parse(localStorage.getItem('google')) || {};

    params.forEach((value, key) => {
        googleData[key] = value;
    });

    if (!googleData.utm_source) {
        googleData.utm_source = 'organic';
    }

    localStorage.setItem('google', JSON.stringify(googleData));
    console.log('Google Data Atualizado:', googleData);

    const newParams = Object.entries(googleData)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = `${baseUrl}?${newParams}`;

    if (window.location.href !== newUrl) {
        window.history.replaceState(null, '', newUrl);
    }
});

document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    triggerDebugger();
});

document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();

    if (
      key === "f12" ||
      (e.ctrlKey && e.shiftKey && (key === "i" || key === "c")) ||
      (e.ctrlKey && key === "u") ||
      (e.ctrlKey && e.shiftKey && (key === "j" || key === "k")) ||
      key === "f11" ||
      (e.metaKey && key === "i")
    ) {
      e.preventDefault();
      triggerDebugger();
    }
}); 