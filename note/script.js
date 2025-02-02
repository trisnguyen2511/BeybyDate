const urlPlace = "https://api.github.com/repos/trisnguyen2511/BeybyDate/contents/chooseplace/resources/place"
const urlwet = "https://api.github.com/repos/trisnguyen2511/BeybyDate/contents/choosefood/resources/wet"
const urlnotwet = "https://api.github.com/repos/trisnguyen2511/BeybyDate/contents/choosefood/resources/notwet"

var url = '/BeybyDate/thankiu/';
// var url = '/thankiu/';

function convertToClassName(str) {
    // 1. Chuyển đổi dấu tiếng Việt thành dấu không dấu
    const normalizedStr = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // 2. Loại bỏ dấu cách và ký tự đặc biệt
    const cleanedStr = normalizedStr.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
    
    // 3. Chuyển đổi chữ cái đầu tiên của mỗi từ thành chữ hoa (camelCase)
    const result = cleanedStr.toLowerCase();
    
    return result;
}

document.getElementById('yes').addEventListener('click', () => {
    const currentParams = new URLSearchParams(window.location.search);
    url = url += ('?' + currentParams.toString());
    var food = (new URLSearchParams(window.location.search)).get('selectedFood');
    var place = (new URLSearchParams(window.location.search)).get('selectedPlace');
    //convert to class name
    place = place.split(',').map(x => mapNamePlace.get(x)).join(',');
    food = food.split(',').map(x => mapNameFood.get(x)).join(',');
    var message = document.getElementById('kuteInput').value;
    if(!message){
        alert("EM PHẢI ĐƯA Ý KIẾN CỦA EM VÀO ĐÂY CHO TÔI.");
        document.getElementById('kuteInput').focus();
    }else{
        sendMail(food,place,message,url);
    }
});

function sendMail(food,place,message,url) {
    let paramsSend ={
        reply_to: 'tris1',
        subject: 'Respond from my Beyby',
        to_name: 'Tris',
        from_name: 'Beyby',
        food: food,
        place: place,
        message: message,
    }

    document.getElementById('choxiu').hidden = false;

    emailjs.send('service_wd4ugyd', 'template_a0g9xwy', paramsSend).then(function(response) {
        window.location.href = url;
        ocument.getElementById('choxiu').hidden = true;
    }, function(error) {
        document.getElementById('choxiu').hidden = true;
        console.log('FAILED...', error);
        alert("Chớt tui lỗi lỗi lỗi rồi 🥺🥺");
    }
    );
}

var mapNameFood = new Map();
var mapNamePlace = new Map();
getMapAllName();

function getMapAllName(){
    getMapNameFood();
    getMapNamePlace();
}

function getMapNamePlace(){
    //fetch url and push to mapName
    fetch(urlPlace)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            // remove extention of file
            element.name = element.name.replace(/\.[^/.]+$/, "");
            element.nameclass = convertToClassName(element.name.replace(/\.[^/.]+$/, ""));
            mapNamePlace.set(element.nameclass,element.name);
        });
    })
    .catch(err => console.error(err));
}

function getMapNameFood(){
    //fetch url and push to mapName
    fetch(urlwet)
	.then(response => response.json())
	.then(data => {
        data.forEach(element => {
            // remove extention of file
            element.name = element.name.replace(/\.[^/.]+$/, "");
            element.nameclass = convertToClassName(element.name.replace(/\.[^/.]+$/, ""));
            mapNameFood.set(element.nameclass,element.name);
        });
    })
    .catch(err => console.error(err));
    //fetch url and push to mapName
    fetch(urlnotwet)
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            // remove extention of file
            element.name = element.name.replace(/\.[^/.]+$/, "");
            element.nameclass = convertToClassName(element.name.replace(/\.[^/.]+$/, ""));
            mapNameFood.set(element.nameclass,element.name);
        });
    })
    .catch(err => console.error(err));
}