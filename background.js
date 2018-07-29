browser.storage.local.get().then(results => {
  if (results.prevKey) { browser.commands.update({ name: "prev-tab", shortcut: results.prevKey }); };
  if (results.nextKey) { browser.commands.update({ name: "next-tab", shortcut: results.nextKey }); };
  if (results.closeKey) { browser.commands.update({ name: "close-tab", shortcut: results.closeKey }); };
});

function onError(error) {
  console.log(`Error: ${error}`);
}

function getActiveTab() {
  return browser.tabs.query({currentWindow: true, active: true});
}

function getTabsCount() {
  return browser.tabs.query({currentWindow: true});
}

browser.commands.onCommand.addListener(function(command) {
  if (command == "prev-tab") {
    getActiveTab().then((tab) => {
      curTab = tab[0].index;
      if (curTab > 0) {
        browser.tabs.query({currentWindow: true, index: curTab - 1}, function(prevTab) {
          browser.tabs.update(prevTab[0].id, {active: true});
        });
      }
    });
  } else if (command == "next-tab") {
    browser.tabs.query({currentWindow: true}, function(tabList) {
      getActiveTab().then((tab) => {
        nextTab = tab[0].index + 1;
        if (nextTab < tabList.length ) {
          browser.tabs.query({currentWindow: true, index: nextTab}, function(nextTab) {
            browser.tabs.update(nextTab[0].id, {active: true});
          });
        }
      });
    });
  } else if (command == "close-tab") {
    getActiveTab().then((tabs) => {
      browser.tabs.remove(tabs[0].id)
    });
  }
});
