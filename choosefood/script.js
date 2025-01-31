const urlwet = "https://api.github.com/repos/trisnguyen2511/BeybyDate/contents/choosefood/resources/wet"
const urlnotwet = "https://api.github.com/repos/trisnguyen2511/BeybyDate/contents/choosefood/resources/notwet"

const urlGet = ((new URL(document.location)).searchParams.get("wet") || 'no') === 'yes' ? urlwet : urlnotwet;

const chosefood = ['sushi','mixomtau'];

var url = '/BeybyDate/chooseplace/';
// var url = '/chooseplace/';

fetch(urlGet)
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
            if(chosefood.includes(element.nameclass)) {
                checkbox.checked = true
            }
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
    currentParams.set('selectedFood', selected.join(','));
    url = (url + ('?' + currentParams.toString()));
    window.location.href = url;
});