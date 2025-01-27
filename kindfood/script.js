let count = 0;

document.getElementById('yes').addEventListener('click', () => {
    var response = (new URL(document.location)).searchParams.get("response") || 'no';
    var eat = (new URL(document.location)).searchParams.get("eat") || 'yes';
    window.location.href = `/choosefood/?response=${response}&eat=${eat}&wet=yes`;
});
document.getElementById('no').addEventListener('click', () => {
    var response = (new URL(document.location)).searchParams.get("response") || 'no';
    var eat = (new URL(document.location)).searchParams.get("eat") || 'yes';
    window.location.href = `/choosefood/?response=${response}&eat=${eat}&wet=no`;
});

