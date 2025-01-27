let count = 0;

const url = '/BeybyDate/choosefood/';
// const url = '/choosefood/';

document.getElementById('yes').addEventListener('click', () => {
    var response = (new URL(document.location)).searchParams.get("response") || 'no';
    var eat = (new URL(document.location)).searchParams.get("eat") || 'yes';
    window.location.href = `${url}?response=${response}&eat=${eat}&wet=yes`;
});
document.getElementById('no').addEventListener('click', () => {
    var response = (new URL(document.location)).searchParams.get("response") || 'no';
    var eat = (new URL(document.location)).searchParams.get("eat") || 'yes';
    window.location.href = `${url}?response=${response}&eat=${eat}&wet=no`;
});

