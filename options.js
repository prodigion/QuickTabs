async function saveOptions(e) {
  browser.storage.local.set({ prevKey: document.querySelector("#prevKey").value });
  browser.storage.local.set({ nextKey: document.querySelector("#nextKey").value });
  browser.storage.local.set({ closeKey: document.querySelector("#closeKey").value });

  await browser.commands.update({ name: "prev-tab", shortcut: document.querySelector('#prevKey').value });
  await browser.commands.update({ name: "next-tab", shortcut: document.querySelector('#nextKey').value });
  await browser.commands.update({ name: "close-tab", shortcut: document.querySelector('#closeKey').value });
}

async function loadOptions() {
  let commands = await browser.commands.getAll();
  for (command of commands) {
    if (command.name === "prev-tab") {
      document.querySelector('#prevKey').value = command.shortcut;
    } else if (command.name === "next-tab") {
      document.querySelector('#nextKey').value = command.shortcut;
    } if (command.name === "close-tab") {
      document.querySelector('#closeKey').value = command.shortcut;
    }
  }
}

document.addEventListener("DOMContentLoaded", loadOptions);
document.querySelector("form").addEventListener("submit", saveOptions);