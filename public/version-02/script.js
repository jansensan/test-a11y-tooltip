// dom elements
let tooltipToggle;
let tooltip;
let tooltipCloseButton;

let firstTooltipElement;
let lastTooltipElement;

let isTooltipVisible = false;


init();


function init() {
  // dom elements
  tooltipToggle = document.getElementById('tooltipToggle');
  tooltip = document.getElementById('tooltip');
  tooltipCloseButton = document.getElementById('tooltipCloseButton');

  const focusable = tooltip.querySelectorAll('a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  firstTooltipElement = focusable[0];
  lastTooltipElement = focusable[focusable.length - 1];

  // event handlers
  tooltipToggle.addEventListener('click', onToggleClicked);
  tooltipCloseButton.addEventListener('click', onCloseClicked);
  document.addEventListener('keydown', onKeyPressed);
}


// events
function onToggleClicked() {
  if (isTooltipVisible) {
    hideTooltip();
  } else {
    showTooltip();
  }
}

function onCloseClicked() {
  hideTooltip();
}

function onKeyPressed(event) {
  if (!isTooltipVisible) {
    return;
  }

  const { key, shiftKey } = event;

  if (key === 'Escape') {
    hideTooltip();
  }

  // NOTE: this keyboard loop should be improved for a real project
  if (key === 'Tab') {
    if (shiftKey) {
      // tabbing backwards
      if (document.activeElement === firstTooltipElement) {
        event.preventDefault();
        lastTooltipElement.focus();
      }
    } else {
      // tabbing forward
      if (document.activeElement === lastTooltipElement) {
        tooltip.focus();
      }
    }
  }
}


// methods
function showTooltip() {
  tooltip.classList.add('visible');
  tooltip.focus();
  isTooltipVisible = true;
}

function hideTooltip() {
  tooltip.classList.remove('visible');
  isTooltipVisible = false;
  tooltipToggle.focus();
}
