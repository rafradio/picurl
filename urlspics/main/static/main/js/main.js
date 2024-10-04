let allPhotosField = document.querySelectorAll('.choose_photo_block');
let mainBlock = document.querySelectorAll('.flex-fieldset')[0];
let resultButton = document.getElementById("Copy");

allPhotosField.forEach((item, index) => {
    item.onchange = (event) => {
        Array.from(event.target.files).forEach((fileElem, indexFile) => {
            createImageBlock(item, fileElem);
        });
        
    }
});

const createImageBlock= function(item, fileElem) {
    console.log(fileElem);
    let newDiv = document.createElement('div');
    newDiv.setAttribute("class", "picture-front-block");

    const myImage = new Image();
    myImage.height = 200;
    myImage.style.objectFit = "contain";
    let selectedFile = fileElem;
    let reader = new FileReader();
    reader.onload = function(event) {
        myImage.src = event.target.result;
        item.value = "";
      };
    reader.readAsDataURL(selectedFile);

    let newButton = document.createElement('button');
    newButton.innerHTML = "Получить URL";
    newButton.setAttribute("class", "delete-for-photo");
    newButton.onclick = createUrlForPic;

    newDiv.appendChild(myImage);
    newDiv.appendChild(newButton);
    mainBlock.appendChild(newDiv);
    
}

const createUrlForPic = async function() {
    let picBlock = document.querySelectorAll('.picture-front-block')[0];
    console.log("Проверяю кнопку = ", picBlock.firstChild.src);
    let url = new URL(window.location.href);
    url.pathname = "/getdata/short";
    let csrftoken = getCookie('csrftoken');
    console.log("мой url = ", url.toString());
    await makeRequest(url, csrftoken, picBlock.firstChild.src);
}

const makeRequest = async (url, csrftoken, imgSrc) => {
    let dataToSend = {'data': imgSrc};
    const request = new Request(url, {
                                method: "POST",
                                headers: {
                                            'Content-Type': 'application/json;charset=utf-8',
                                            'X-CSRFToken': csrftoken,
                                        },
                                body: JSON.stringify(dataToSend)
                                });
    try {
        const response = await fetch(request);  
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        console.log("url result = ", data["data"]);
        document.getElementById("UResult").value = data["data"];
        // document.getElementById("Uname").value = "";
        // console.log(data);
    }
    catch(error) {
        console.log(error.message);
    }
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        console.log("coockies = ", document.cookie);
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
        console.log("coockies = ", cookieValue);
    }
    return cookieValue;
}

resultButton.onclick = () => {
    let copyText = document.getElementById("UResult");
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
}