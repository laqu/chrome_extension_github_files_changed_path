function getFileList(document) {
  return [...document.querySelectorAll('.file-info')].map(element => {
    return element.querySelector('a').getAttribute('title');
  });
};

chrome.runtime.sendMessage({
  action: 'getSource',
  list: getFileList(document)
});
