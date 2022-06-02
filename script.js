function init() {
    loadRockets();
/*     loadLandpads();
 */}

async function loadRockets() {
    let url = `https://api.spacexdata.com/v4/rockets`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    console.log('Rockets:', responseAsJson);
    showData(responseAsJson);
}


/*https://api.spacexdata.com/v4/landpads */

function showData(rockets) {

    let html = document.getElementById('rocketContainer');
    for (let i = 0; i < rockets.length; i++) {
        const rocket = rockets[i];
        html.innerHTML += generateRocketsHTML(rocket, i);
    }

}


function openData(i) {

}


function generateRocketsHTML(rocket, i) {
    return /* html */ `
                       <div class="card bg-transparent">
                            <div class="card-input">
                            <h5 class="card-title">${rocket['name']}</h5>
                            <img src="${rocket['flickr_images'][0]}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">${rocket['description']}</p>
                            </div>
                            </div>
                            <div class="card-btn">
                                <button onclick="openData(i)" class="btn btn-primary">Open Data</button>
                                <button onclick="openImages(i)" class="btn btn-primary">Open Images</button>
                            </div>                        
                        </div> 
                        `;
}



//function generateRocketsHTML(rocket, i) {
//    return /* html */ `
//    <div class="rocket-table">
//        <img src="${rocket['flickr_images'][0]}" alt="">
//        <table class="table">
//            <tr>
//                <th>Name</th>
//                <td>${rocket['name']}</td>
//            </tr>
//            <tr>
//                <th>Stages</th>
//                <td>${rocket['stages']}</td>
//            </tr>
//            <tr>
//                <th>Boosters</th>
//                <td>${rocket['boosters']}</td>
//            </tr>
//        </table>
//        </div>
//
//                    `;
//}

