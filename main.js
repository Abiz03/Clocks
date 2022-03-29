const arrHours = document.querySelector('.arrH');
const arrMinutes = document.querySelector('.arrM');
const arrSeconds = document.querySelector('.arrS');
const numHours = document.querySelector('.hours span');
const numMinutes = document.querySelector('.minutes span');
const numSeconds = document.querySelector('.seconds span' );
const links = document.querySelectorAll('.tabsPanel-links a');
const items = document.querySelectorAll('.tabsPanel-content__info');
const stopWatchBtn = document.querySelector('.start');
const stopWatchResult = document.querySelector('.result');
const minNum = document.querySelector('.min span');
const secNum = document.querySelector('.sec span');
const milNum = document.querySelector('.mil span');
const indicator = document.querySelector('.indicator');
const stopWatchResultText = document.querySelector('.stopWatch__result');
const timerH = document.querySelector('.timerH input');
const timerM = document.querySelector('.timerM input');
const timerS = document.querySelector('.timerS input');
const timerMl = document.querySelector('.timerMl input');
const timerBtn = document.querySelector('.time-start');
const timerClearBtn = document.querySelector('.time-clear')

// таймер
timerClearBtn.addEventListener('click', function(){
  if(timerBtn.innerHTML == 'stop'){
    timerH.value = ''
    timerM.value = ''
    timerS.value = ''
    timerMl.value = ''
    timerH.disabled = false
    timerM.disabled = false
    timerS.disabled = false
    timerMl.disabled = false
    timerBtn.innerHTML = 'start'
  }else{
    timerH.value = ''
    timerM.value = ''
    timerS.value = ''
    timerMl.value = ''
    timerH.disabled = false
    timerM.disabled = false
    timerS.disabled = false
    timerMl.disabled = false
  }
})
timerBtn.addEventListener('click', function(){
  let valueH = Number(timerH.value);
  let valueM = Number(timerM.value);
  let valueS = Number(timerS.value);
  let valueMl = Number(timerMl.value);
  if(timerBtn.innerHTML == 'start'){
    timerBtn.innerHTML = 'stop'
    timerH.disabled = true
    timerM.disabled = true
    timerS.disabled = true
    timerMl.disabled = true
    timer(valueH,valueM,valueS,valueMl,timerBtn)
  }else{
    timerBtn.innerHTML = 'start'
  }
})
function timer(h,m,s,mi,btn){
  if(btn.innerHTML == 'stop'){
    timerH.value = h<10?`0${h}`:h;
    timerM.value = m<10?`0${m}`:m;
    timerS.value = s<10?`0${s}`:s;
    if(mi == 0){
      mi = 99
      timerS.value = s<10?`0${s}`:s
      if(s == 0){
        s = 59
        timerS.value = s<10?`0${s}`:s
        if(m == 0){
          m = 59
          timerM.value = m<10?`0${m}`:m
          if(h == 0){
            h = 23
            timerH.value = h<10?`0${h}`:h
          }else{
            h--
            timerH.value = h<10?`0${h}`:h
          }
        }else{
          m--
          timerM.value = m<10?`0${m}`:m
        }
      }else{
        s--
        timerS.value = s<10?`0${s}`:s
      }
    }else{
      mi--
      timerMl.value = mi<10?`0${mi}`:mi
    }
    if(h > 0 || m > 0 || s > 0 || mi > 0){
      setTimeout(function(){
        timer(h,m,s,mi,btn)
      }, 10.1);
    }else{
      timerH.disabled = false
      timerM.disabled = false
      timerS.disabled = false
      timerMl.disabled = false
    }
  }
}
// секундомер
stopWatchBtn.addEventListener('click', function(){
  if(stopWatchBtn.innerHTML == 'start'){
    stopWatchBtn.innerHTML = 'stop'
    indicator.classList.add('start');
    stopWatch(0,0,0,stopWatchBtn)
  }else if(stopWatchBtn.innerHTML == 'stop'){
    stopWatchBtn.innerHTML = 'clear'
    indicator.classList.remove('start');
    indicator.classList.add('stop');
  }else{
    stopWatchBtn.innerHTML = 'start'
    indicator.classList.remove('stop');
    milNum.innerHTML = '00';
    minNum.innerHTML = '00';
    secNum.innerHTML = '00';
    stopWatchResultText.innerHTML = '';
  }
})
stopWatchResult.addEventListener('click', function(){
  stopWatchResultText.innerHTML += `<p>${minNum.innerHTML}:${secNum.innerHTML}:${minNum.innerHTML}</p>`;
})
function stopWatch(mi, s, m, btn){
  if(btn.innerHTML == 'stop'){
    if(mi == 100){
      mi = 0
      if(s == 59){
        s = 0;
        m++
        minNum.innerHTML = m<10?`0${m}`:m;
        secNum.innerHTML = s<10?`0${s}`:s;
      }else{
        s++
        secNum.innerHTML = s<10?`0${s}`:s;
      }
    }else{
      console.log(mi);
      milNum.innerHTML = mi<10?`0${mi}`:mi;
      mi++
    }
    setTimeout(() => {
      stopWatch(mi,s,m,btn)
    }, 10.1);
  }
}
// навигация по вкладкам
links.forEach(function(link, key){
  link.addEventListener('click', function(){
    for(let i = 0; i < links.length; i++){
      links[i].classList.remove('active');
      items[i].classList.remove('active')
    }
    links[key].classList.add('active')
    items[key].classList.add('active')
  })
})
// часы
function clock(){
  const time = new Date();
  const timeHours = time.getHours();
  const timeSeconds = time.getSeconds();
  const timeMinutes = time.getMinutes();
  
  arrSeconds.style = `transform: rotate(${timeSeconds * 6}deg);`;
  arrMinutes.style = `transform: rotate(${timeMinutes * 6}deg);`;
  arrHours.style = `transform: rotate(${timeHours * 30 + (timeMinutes / 2)}deg);`;
  
  numSeconds.innerHTML = timeSeconds < 10 ?`0${timeSeconds}`:timeSeconds;
  numHours.innerHTML = timeHours < 10 ?`0${timeHours}`:timeHours;
  numMinutes.innerHTML = timeMinutes < 10 ?`0${timeMinutes}`:timeMinutes;
  
  setTimeout(clock, 1000);
}
clock();
