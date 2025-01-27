let count = 0;

document.getElementById('yes').addEventListener('click', () => {
    let params = (new URL(document.location)).searchParams;
    window.location.href = '/kindfood/?response=yes&eat=yes';
});
document.getElementById('no').addEventListener('click', () => {
    window.location.href = '/kindfood/?response=yes&eat=yes';
});

// var dir = "/resource";
// var fileextension = ".gif";
// $.ajax({
//     //This will retrieve the contents of the folder if the folder is configured as 'browsable'
//     url: dir,
//     success: function (data) {
//         // List all mp4 file names in the page
//         $(data).find("a:contains(" + fileextension + ")").each(function () {
//             var filename = this.href.replace(window.location.host, "").replace("http:///", "");
//             $("body").append($("<img src=" + dir + filename + "></img>"));
//         });
//     }
// });