
const tickerList = document.querySelector('.ticker-items');

let totalWidth = 0;
tickerList.querySelectorAll('li').forEach(item => {
  totalWidth += item.offsetWidth;
});

const scrollDuration = totalWidth / 50;

const animationStyle = document.querySelector('.ticker-items').style;
animationStyle.animationDuration = `${scrollDuration}s`;