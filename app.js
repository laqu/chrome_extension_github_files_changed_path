chrome.runtime.onMessage.addListener(request => {
  const { list } = request;
  const ul = document.querySelector('#filelist');
  list.forEach(file => {
    const li = document.createElement('li');
    li.innerText = file;
    ul.appendChild(li);
  });
  const button = document.querySelector('#copy');
  button.addEventListener('click', copy);
});

// クリップボードにコピー
const copy = () => {
  const textArea = document.createElement('textarea');
  textArea.style.cssText = 'position:absolute; left:-100%;';
  document.body.appendChild(textArea);
  textArea.value = document.querySelector('#filelist').innerText;
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
};

// 現在のタブがgithubのfiles changedページかどうか確認
const checkGithubFilesChangedPage = (url) => {
  return /^https:\/\/github/.test(url) && /\/pull\/\d+\/files/.test(url);
};

// 対象ページではない場合
const setError = () => {
  document.body.innerHTML = '<p id="error">対象ページではありません</p>';
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
