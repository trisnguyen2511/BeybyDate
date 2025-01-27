let count = 0;

const url = '/BeybyDate/kindfood/';
// const url = '/kindfood/';

document.getElementById('yes').addEventListener('click', () => {
    let params = (new URL(document.location)).searchParams;
    window.location.href = url + '?response=yes&eat=yes';
});
document.getElementById('no').addEventListener('click', () => {
    window.location.href = url + '?response=yes&eat=yes';
});
