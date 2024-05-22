window.addEventListener('load', function () {

  let bg = document.getElementById('range');
  let bg_w = bg.offsetWidth;
  let bg_h = bg.offsetHeight;
  let div = document.getElementById('contact');
  let div_w = div.offsetWidth;
  let div_h = div.offsetHeight;

  let nar_h = 81;
  //let press_count = 0;


  let dir_v = 1; //vertical direction
  let dir_h = 1; //horozontal direction
  let speed_v = getRandomInt(3);
  let speed_h = getRandomInt(3);


  //random starting point
  let div_pos_top = getRandomInt(bg_h - div_h) + nar_h;
  let div_pos_left = getRandomInt(bg_w - div_w);
  //console.log(div_pos_top);
  //console.log(div_pos_left);
  div.style.left = div_pos_left + 'px';
  div.style.top = div_pos_top + 'px';

  let id = null;

  id = setInterval(move, 8);
  


  function move() {
    bg_w = bg.offsetWidth;
    bg_h = bg.offsetHeight;
    
    if ((div_pos_left > bg_w - div_w - 2) || (div_pos_left < 0)) {
      dir_h = dir_h * -1;
      speed_h = getRandomInt(5);
    }
    if ((div_pos_top > bg_h - div_h  - 1) || (div_pos_top < nar_h)) {
      dir_v = dir_v * -1;
      speed_v = getRandomInt(5);
    }

    div_pos_left = div_pos_left + dir_h * speed_v;//width, horozontal
    div_pos_top = div_pos_top + dir_v * speed_h;//high, vertical
    div.style.left = div_pos_left + 'px';
    div.style.top = div_pos_top + 'px';
    //console.log(div.style.left);
  }


  /*div.addEventListener("mouseenter", (e) => {
    console.log('stop');
    clearInterval(id);
  });

  div.addEventListener("mouseleave", (e) => {
    console.log('start');
    id = setInterval(move, 8);
  });*/


})

function getRandomInt(max) {
  return 0.5 + Math.floor(Math.random() * max);
}