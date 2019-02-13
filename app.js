chrome.runtime.onMessage.addListener(request => {
  const { list } = request;
  const ul = document.querySelector('#filelist');
  let html = '';
  list.forEach(file => {
    html += `<li>${file}</li>`;
  });
  ul.innerHTML = html;
});

const checkGithubFilesChangedPage = (url) => {
  return /^https:\/\/github/.test(url) && /\/pull\/\d+\/files/.test(url);
};

const setError = () => {
  document.body.innerHTML = '<p class="error">対象ページではありません</p>';
};

const setup = () => {
  chrome.tabs.getSelected(null, tab => {
    if (!checkGithubFilesChangedPage(tab.url)) {
      setError();
      return;
    }
    chrome.tabs.executeScript(tab.id, {
      file: 'execute.js'
    }, () => {
      if (chrome.runtime.lastError) {
        // error
      }
    });
  });
};

window.addEventListener('load', setup);
