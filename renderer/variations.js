(function () {
  function init() {
    const toolBar = document.getElementById('tool-bar');
    if (!toolBar) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tool-btn';
    button.id = 'more-variations';
    button.textContent = 'More variations';
    button.title = 'Generate another set from the same prompt';
    button.addEventListener('click', function () {
      const input = document.getElementById('prompt-input');
      if (!input || !input.value.trim()) return;
      document.dispatchEvent(new CustomEvent('promptforge:more-variations'));
    });
    toolBar.appendChild(button);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
