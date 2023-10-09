import checkNumInputs from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');
          
          checkNumInputs('input[name="user_phone"]');

          const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
          };

          const postData = async (url, data) => {
                document.querySelector('.status').textContent = message.loading;
                let res = await fetch(url, {
                    method: 'POST',
                    body: data
                });

                return await res.text();
          };

          const clearInputs = () => {
                inputs.forEach(item => {
                    item.value = '';
                });
          };

          function closeEndWin(win){
            document.querySelector(win).style.display = "none";
            document.body.style.overflow = "";
          }

          form.forEach(item => {
            item.addEventListener('submit', (e)=> {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                    statusMessage.classList.add('status');
                    item.appendChild(statusMessage);


                const formData = new FormData(item);

                if(item.getAttribute('data-calc') === 'end'){
                    for(let key in state){
                        formData.append(key, state[key]);
                    }
                }

                postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(()=> {
                    clearInputs();
                    closeEndWin("[data-calc='end'] > div");
                    closeEndWin(".form-time > div");
                    setTimeout(()=>{
                        statusMessage.remove();
                        document.querySelector("[data-calc='end'] > div").style.display = "block";
                        document.querySelector(".form-time > div").style.display = "block";
                        closeEndWin('.popup_calc_end');  
                        closeEndWin('.popup');
                        Object.keys(state).forEach(key => delete state[key]);
                    }, 2000);

                });

            });
          });
};

export default forms;