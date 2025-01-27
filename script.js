let count = 0;

const url = '/BeybyDate/yay/';
// const url = '/yay/';

document.getElementById('yes').addEventListener('click', () => {
    window.location.href = '/yay/?response=yes';
});
document.getElementById('no').addEventListener('click', () => {
    const button = document.getElementById('no');
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;
    const randomX = Math.floor(Math.random() * (window.innerWidth - buttonWidth));
    const randomY = Math.floor(Math.random() * (window.innerHeight - buttonHeight));
    button.style.position = 'absolute';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;

    //Xử lý hint
    const hint = document.getElementById('hintNo');
    switch (parseInt(count)) {
        case 0:
            hint.innerText = 'Đừng mò 🥺';
            break;
        case 1:
            hint.innerText = 'Năn nỉ ó 😣';
            break;
        case 2:
            hint.innerText = 'Hứa sẽ ngoan 😇';
            break;
        case 3:
            hint.innerText = 'Giận😡';
            break;
        default:
            hint.innerText = 'TÔI KHÔNG CHO PHÉP EM BẤM "HONG" 😡';
    }
    count++;
});

