(function () {
  function init() {
    const toolBar = document.getElementById('tool-bar');
    if (!toolBar) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'tool-btn';
    button.id = 'more-variations';
    button.textContent = 'More variations';
    button.title = 'Open the variation menus';
    button.addEventListener('click', function () {
      if (window.PromptForgeExtras && window.PromptForgeExtras.open) window.PromptForgeExtras.open();
    });
    toolBar.appendChild(button);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
