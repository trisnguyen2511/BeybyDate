const urlPlace = "https://api.github.com/repos/trisnguyen2511/BeybyDate/contents/chooseplace/resources/place"
const urlwet = "https://api.github.com/repos/trisnguyen2511/BeybyDate/contents/choosefood/resources/wet"
const urlnotwet = "https://api.github.com/repos/trisnguyen2511/BeybyDate/contents/choosefood/resources/notwet"

const url = '/BeybyDate/thanhkiu/';
// var url = '/thankiu/';

fetch(urlPlace)
	.then(response => response.json())
	.then(data => {
        data.forEach(element => {
            // remove extention of file
            element.name = element.name.replace(/\.[^/.]+$/, "");
            element.nameclass = convertToClassName(element.name.replace(/\.[^/.]+$/, ""));

            const selectDiv = document.createElement('div');
            selectDiv.classList.add('selectDiv');
            
            const img = document.createElement('img');
            img.src = element.download_url;
            img.alt = "yay";
            img.classList.add('imgchoose');
            img.name = element.nameclass
            img.htmlFor = element.nameclass;
            img.onclick = function() {
                const checkbox = document.getElementById(element.nameclass);
                checkbox.checked = !checkbox.checked;
            }
            selectDiv.appendChild(img);
            
            const checkboxArea = document.createElement('div');
            checkboxArea.classList.add('checkboxArea');
            selectDiv.appendChild(checkboxArea);
            
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = element.nameclass;
            checkbox.name = element.nameclass;
            checkbox.value = element.nameclass;
            checkboxArea.appendChild(checkbox);
            
            const label = document.createElement('label');
            label.htmlFor = element.nameclass;
            label.textContent = element.name;
            checkboxArea.appendChild(label);

            document.getElementById("selectArea").appendChild(selectDiv)
            
        });
    })
	.catch(err => console.error(err));

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
    const selected = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(x => x.value);
    if (selected.length === 0) {
        alert("Beyby chọn một món đi mò... hong lẽ để 2 mình nhịn đóiiiiiii 🥺🥺");
        return;
    }
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('selectedPlace', selected.join(','));
    url = url += ('?' + currentParams.toString());
    var food = (new URLSearchParams(window.location.search)).get('selectedFood');
    var place = selected.join(',');
    //convert to class name
    place = place.split(',').map(x => mapNamePlace.get(x)).join(',');
    food = food.split(',').map(x => mapNameFood.get(x)).join(',');

    sendMail(food,place,url);
});

function sendMail(food,place,url) {
    let paramsSend ={
        reply_to: 'tris1',
        subject: 'Respond from my Beyby',
        to_name: 'Tris',
        from_name: 'Beyby',
        food: food,
        place: place,
    }

    emailjs.send('service_wd4ugyd', 'template_a0g9xwy', paramsSend).then(function(response) {
        window.location.href = url;
    }, function(error) {
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