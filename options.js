function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    prevKey: document.querySelector("#prevKey").value,
    nextKey: document.querySelector("#nextKey").value,
    closeKey: document.querySelector("#closeKey").value
  });
}

function restoreOptions() {

  function setPrevKeyChoice(result) {
    document.querySelector("#prevKey").value = result.prevKey || "F1";
  }

  function setNextKeyChoice(result) {
    document.querySelector("#nextKey").value = result.nextKey || "F2";
  }

  function setCloseKeyChoice(result) {
    document.querySelector("#closeKey").value = result.closeKey || "F3";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.local.get("prevKey");
  getting.then(setPrevKeyChoice, onError);

  var getting = browser.storage.local.get("nextKey");
  getting.then(setNextKeyChoice, onError);

  var getting = browser.storage.local.get("closeKey");
  getting.then(setCloseKeyChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);