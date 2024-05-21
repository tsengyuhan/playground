window.addEventListener('load', function () {

  let bg = document.getElementById('range');
  let bg_w = bg.offsetWidth;
  let bg_h = bg.offsetHeight;
  let div = document.getElementById('contact');
  let div_w = div.offsetWidth;
  let div_h = div.offsetHeight;

  let nar_h = 81;
  let touch_edge_v = 0;
  let touch_edge_h = 0;
  let offset = 150;

  let div_pos_top = getRandomInt(bg_h - div_h) + nar_h;
  let div_pos_left = getRandomInt(bg_w - div_w);
  div.style.left = div_pos_left + 'px';
  div.style.top = div_pos_top + 'px';


  div.addEventListener("mouseenter", (e) => {
    console.log('touch');
    let flag = Math.random();

    //horizontal movement
    if (touch_edge_h == 1) {//at the left
      div_pos_left = div_pos_left + (getRandomInt(5) * 20 + offset);
    } else if (touch_edge_h == 2) {//at the right
      div_pos_left = div_pos_left - (getRandomInt(5) * 20 + offset);
    }
    else if (flag <= 0.5) { //move left
      div_pos_left = div_pos_left - (getRandomInt(5) * 20 + offset);
    } else { //move right
      div_pos_left = div_pos_left + (getRandomInt(5) * 20 + offset);
    }

    if (div_pos_left < 0) {
      div_pos_left = 0;
      touch_edge_h = 1;
    } else if (div_pos_left > bg_w - div_w - 1) {
      div_pos_left = bg_w - div_w - 1;
      touch_edge_h = 2;
    } else {
      touch_edge_h = 0;
    }

    flag = Math.random();
    //vertical movement
    if (touch_edge_v == 1) {//at the top
      div_pos_top = div_pos_top + (getRandomInt(5) * 20 + offset);
    } else if (touch_edge_v == 2) {// at the bottom
      div_pos_top = div_pos_top - (getRandomInt(5) * 20 + offset);
    }
    else if (flag <= 0.5) { //move up
      div_pos_top = div_pos_top - (getRandomInt(5) * 20 + offset);
    } else { //move down
      div_pos_top = div_pos_top + (getRandomInt(5) * 20 + offset);
    }

    if (div_pos_top < nar_h) {
      div_pos_top = nar_h;
      touch_edge_v = 1;
    } else if (div_pos_top > bg_h - div_h - 1) {
      div_pos_top = bg_h - div_h - 1;
      touch_edge_v = 2;
    } else {
      touch_edge_v = 0;
    }

    div.style.left = div_pos_left + 'px';
    div.style.top = div_pos_top + 'px';

  });



})

function getRandomInt(max) {
  return 1 + Math.floor(Math.random() * max);
}