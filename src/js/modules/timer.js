const timer = (id, deadline)=> {

    const addZero = (num) => {
        if(num <= 9){
            return '0' + num;
        }else {
            return num;
        }
   };

   const getTimeRemainig = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              seconds = Math.floor((t/1000) % 60),
              minutes = Math.floor((t/1000/60) % 60),
              hours   = Math.floor((t/(1000 * 60 * 60) % 24)),
              days    = Math.floor((t/(1000 * 60 * 60 * 24)));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

   };

   const setClock =  (selector, endtime) => {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updatClock, 1000);

        updatClock();

        function updatClock(){
            const t = getTimeRemainig(endtime);

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0){
              /*days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
                
                clearInterval(timeInterval); */
                let fullY = new Date().getFullYear();
                let NumMonth = new Date().getMonth();
                let numDay = new Date().getDate();
                let deadline = `${fullY.toString()}-${(NumMonth + 3)
                    .toString()}-${numDay.toString()}`;
                setClock('.container1', deadline);
            }
        }
   };

   setClock(id, deadline);
};

export default timer;