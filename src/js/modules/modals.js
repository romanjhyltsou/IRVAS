const modals = (state) => {
    function binedModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true){
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]');
              
        trigger.forEach(item => {

           item.addEventListener('click', (e)=> {
                if(e.target){
                    e.preventDefault();
                }

                if(windows){
                   clearTimeout(clearTim);
                }
                
                
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                //document.body.classList.add('modal-open');
            });

        });    

        close.addEventListener('click', ()=> {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            modal.style.display = "none";
            document.body.style.overflow = "";
            //document.body.classList.remove('modal-open');
        });

        modal.addEventListener('click', (e)=> {
            //console.log(state.hasOwnProperty('width'));
            if(e.target === modal && closeClickOverlay){
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                modal.style.display = 'none';
                document.body.style.overflow = "";
                //document.body.classList.remove('modal-open');
            }
        });
    }
    /* function showModalByTime(selector, time){ */
      let clearTim =  setTimeout(function(){
            document.querySelector('.popup').style.display = 'block';
            document.body.style.overflow = "hidden";
      }, 60000);
    /* } */

    binedModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
    binedModal('.phone_link', '.popup', '.popup .popup_close');
    //showModalByTime('.popup', 6000);
    binedModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
    binedModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
    binedModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
    
};
export default modals;