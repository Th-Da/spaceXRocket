let responseAsJson

function init() {
    loadRockets();
/*     loadLandpads();
 */}

async function loadRockets() {
    let url = `https://api.spacexdata.com/v4/rockets`;
    let response = await fetch(url);
    responseAsJson = await response.json();
    console.log('Rockets:', responseAsJson);
    renderRockets(responseAsJson);
}


/*https://api.spacexdata.com/v4/landpads */

function renderRockets(rockets) {
    let RocketsHTML = document.getElementById('rocketContainer');
    for (let i = 0; i < rockets.length; i++) {
        const rocket = rockets[i];
        RocketsHTML.innerHTML += generateRocketsHTML(rocket, i);
    }
}

function renderData(index) {
    addBlurr();
    let dataHTML = document.getElementById('rocketTable');
    const data = responseAsJson[index];

    document.getElementById('dataSheet').classList.remove('d-none');
    dataHTML.innerHTML += generateDataHTML(data, index);
    document.getElementsByTagName("body")[0].style = `overflow: hidden`
    renderPayloadWeights(index);
}

function renderPayloadWeights(j) {
    let dataHTML = document.getElementById('payloadTable');
    for (let i = 0; i < responseAsJson[j]['payload_weights'].length; i++) {
        const element = responseAsJson[j]['payload_weights'][i];
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
    document.getElementById('dataSheet').classList.add('d-none');
    document.getElementById('btnClose').remove();
    document.getElementById('rocketTableChild').remove();
    let element = document.querySelectorAll('[id^="payloadTableChild"]');
    for (let i = 0; i < element.length; i++) {
        element[i].remove();
    }
    removeBlurr();
    document.getElementsByTagName("body")[0].style = `overflow: auto`

}

function renderImages(index) {
    addBlurr();

    let imagesHTML = document.getElementById('rocketContainer');
    const img = responseAsJson[index];

    imagesHTML.innerHTML += generateImagesHTML(img, index);

}










function generateRocketsHTML(rocket, i) {
    return /* html */ `
                       <div id="rocketCards" class="card bg-transparent">
                            <div class="card-input">
                            <h5 class="card-title">${rocket['name']}</h5>
                            <img src="${rocket['flickr_images'][0]}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">${rocket['description']}</p>
                            </div>
                            </div>
                            <div class="card-btn">
                                <button onclick="renderData(${i})" class="btn btn-primary">Open Data</button>
                                <button onclick="renderImages(${i})" class="btn btn-primary">Open Images</button>
                            </div>                        
                        </div> 
                        `;
}


function generateDataHTML(data) {
    return /* html */ `
                            <img onclick="closeData()" id="btnClose" src="./img/close.png" alt="" type="button" class="btn-close">
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

function generateImagesHTML(img, index) {
    return /* html */ `
                        <div class="img-zoom " id="imgZoom">
                            <img src="${img['flickr_images'][0]}" class= "zoomed-img" alt="">
                            <div class ="nav">
                            </div> 
                            <img src="images/close.png" onclick="imgClose()" class="button-close" alt=""> 
                        </div>
                        `;
}