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
    let dataHTML = document.getElementById('rocketContainer');
        const data = responseAsJson[index];
        
        dataHTML.innerHTML += generateDataHTML(data, index);
        renderPayloadWeights(index);

        function renderPayloadWeights(j) {
            for (let i = 0; i < responseAsJson[j]['payload_weights'].length; i++) {
                const element = responseAsJson[j][i];
             dataHTML.innerHTML += `${element['id']}`;   
            }
        }
}



function addBlurr() {
    let element = document.querySelectorAll('[id^="rocketCards"]');
    for (let i = 0; i < element.length; i++) {
        element[i].style = 'filter: blur(4px)';        
    }
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


function generateDataHTML(data, index) {
    return /* html */ `
    <img src="./img/close.png" alt="" type="button" class="btn-close">
    <div class="rocket-table">
        <table class="table table-dark table-striped table-borderless table-hover">
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
                <th>Payload Weight(kg)</th>
                <tr>
                    <th>${data['payload_weights']}</th>
                    <td>${data['payload_weights'][0]['kg']}</td>
                </tr>
            </tr>
            <tr>
                <th>Boosters</th>
                <td>${data['boosters']}</td>
            </tr>
        </table>
        </div>
        `;
}
