let responseAsJson;
let imgPosition = 0;


function init() {
    loadRockets();
}


async function loadRockets() {
    let url = `https://api.spacexdata.com/v4/rockets`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    renderRockets(responseAsJson);
}

function renderRockets(rockets) {
    let RocketsHTML = document.getElementById('rocketContainer');
    for (let i = 0; i < rockets.length; i++) {
        const rocket = rockets[i];
        RocketsHTML.innerHTML += generateRocketsHTML(rocket, i);
    }
}

function renderData(index) {
    addBlurr();
    let dataHTML = document.getElementById('dataSheet');
    const data = responseAsJson[index];
    document.getElementById('imgContainer').style.zIndex = '-1';
    document.getElementById('dataSheet').classList.remove('d-none');
    document.getElementById('rocketContainer').style.zIndex = '0';
    dataHTML.innerHTML += generateDataHTML(data, index);
    document.getElementsByTagName("body")[0].style = `overflow: hidden`;
    renderPayloadWeights(index);
}

function renderPayloadWeights(index) {
    let dataHTML = document.getElementById('payloadTable');
    for (let i = 0; i < responseAsJson[index]['payload_weights'].length; i++) {
        const element = responseAsJson[index]['payload_weights'][i];
        let payloadWeight = element['kg'];
        let payloadName = element['name'];
        dataHTML.innerHTML += generatePayloadHTML(payloadWeight, payloadName);
    }
}

function addBlurr() {
    let element = document.querySelectorAll('[id^="rocketCards"]');
    for (let i = 0; i < element.length; i++) {
        element[i].style = 'filter: blur(4px)';
    }
}

function removeBlurr() {
    let element = document.querySelectorAll('[id^="rocketCards"]');
    for (let i = 0; i < element.length; i++) {
        element[i].style = 'filter: none';
    }
}

function closeData() {
    document.getElementsByTagName("body")[0].style = `overflow: auto`;
    document.getElementById('dataSheet').classList.add('d-none');
    if (document.getElementById('rocketTableChild')) {
        document.getElementById('rocketTableChild').remove();
        document.getElementById('rocketContainer').style.zIndex = '1';
    }
    if (document.getElementById('imgZoom')) {
        document.getElementById('imgZoom').remove();
        document.getElementById('rocketContainer').style.zIndex = '1';


    }
    let element = document.querySelectorAll('[id^="payloadTableChild"]');
    for (let i = 0; i < element.length; i++) {
        element[i].remove();
    }
    imgPosition = 0;
    removeBlurr();
}

function renderImages(index) {
    addBlurr();
    let imagesHTML = document.getElementById('imgContainer');
    document.getElementById('rocketContainer').style.zIndex = '0';
    document.getElementById('imgContainer').style.zIndex = '0';
    document.getElementsByTagName("body")[0].style = `overflow: hidden`;
    for (let i = 0; i < responseAsJson[index]['flickr_images'].length; i++) {
        const currentImg = responseAsJson[index]['flickr_images'][imgPosition];
        imagesHTML.classList.remove('d-none');
        imagesHTML.innerHTML = ``;
        imagesHTML.innerHTML += generateImagesHTML(currentImg, index);
    }
}

function imgForeward(index) {
    if (imgPosition < responseAsJson[index]['flickr_images'].length - 1) {
        imgPosition++;
    } else {
        imgPosition = 0;
    }
    document.getElementById('imgContainer').innerHTML = ``;
    renderImages(index);
}

function imgBackward(index) {
    if (imgPosition !== 0) {
        imgPosition--;
    } else {
        imgPosition = responseAsJson[index]['flickr_images'].length - 1;
    }
    document.getElementById('imgContainer').innerHTML = ``;
    renderImages(index);
}

function generateRocketsHTML(rocket, i) {
    return /* html */ `
                       <div id="rocketCards" class="card">
                            <div class="card-input">
                            <h5 class="card-title">${rocket['name']}</h5>
                            <img src="${rocket['flickr_images'][0]}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text card-text-bottom">${rocket['description']}</p>
                            </div>
                            </div>
                            <div class="card-btn">
                                <button id="btnRenderData" onclick="renderData(${i})" class="btn btn-primary">Open Data</button>
                                <button id="btnRenderImg" onclick="renderImages(${i})" class="btn btn-primary">Open Images</button>
                            </div>                        
                        </div> 
                        `;
}




function generateDataHTML(data) {
    return /* html */ `


                            <table id="rocketTableChild" class="table table-dark table-striped table-borderless table-hover">
                                <tr>
                                    <th>Name</th>
                                    <td>${data['name']}</td>
                                </tr>
                                <tr>
                                    <th>Stages</th>
                                    <td>${data['stages']}</td>
                                </tr>
                                <tr>
                                    <th>Boosters</th>
                                    <td>${data['boosters']}</td>
                                </tr>            
                                <tr>
                                    <th>Diameter(m)</th>
                                    <td>${data['diameter']['meters']}</td>
                                </tr>
                                <tr>
                                    <th>Heigth(m)</th>
                                    <td>${data['height']['meters']}</td>
                                </tr>
                                <tr>
                                    <th>Mass(kg)</th>
                                    <td>${data['mass']['kg']}</td>
                                </tr>
                                <tr>
                                    <th>Landing Legs</th>
                                    <td>${data['landing_legs']['number']}</td>
                                </tr>
                                <tr>
                                    <th>Costs Per Launch($)</th>
                                    <td>${data['cost_per_launch']}</td>
                                </tr>
                                <tr>
                                    <th>First Flight</th>
                                    <td>${data['first_flight']}</td>
                                </tr>
                            </table>

                            `;
}

function generatePayloadHTML(payloadWeight, payloadName) {
    return /* html */ `
                                <tr id="payloadTableChild">
                                    <th>${payloadName}(kg)</th>
                                    <td>${payloadWeight}</td>
                                </tr>           
                        `;
}

function generateImagesHTML(currentImg, index) {
    return /* html */ `
                <div class="overlay d-flex arrows" id="imgZoom">
                    <div class="d-flex">
                    <img src="${currentImg}" class= "zoomed-img" alt="">
                        <div class ="nav">
                            <img src="./img/arrow-fw.png" id="btnFw" onclick="imgForeward('${index}')" alt="" type="button" class="btn-fw">
                            <img src="./img/arrow-bw.png" id="btnBw" onclick="imgBackward('${index}')" alt="" type="button" class="btn-bw">
                        </div>
                    </div> 
                </div>  
                        `;
}