const releaseStatus = document.querySelector("#status");
const download = document.querySelector("#download");
const release = document.querySelector("#release");

async function showLatestRelease() {
  try {
    const response = await fetch("./version.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    release.href = data.release_url;

    if (data.download_url) {
      download.href = data.download_url;
      download.hidden = false;
      releaseStatus.textContent = `Актуальная версия ${data.version}`;
      return;
    }

    releaseStatus.textContent = data.version
      ? `Версия ${data.version}. Архив пока не опубликован.`
      : "Первый релиз ещё не опубликован.";
  } catch {
    releaseStatus.textContent = "Данные о версии недоступны. Релизы можно открыть на GitHub.";
  }
}

showLatestRelease();

