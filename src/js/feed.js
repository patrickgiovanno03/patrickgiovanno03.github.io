var sharedMomentsArea = document.querySelector('#shared-moments');

// Currently not in use, allows to save assets in cache on demand otherwise
function clearCards() {
  while(sharedMomentsArea.hasChildNodes()) {
    sharedMomentsArea.removeChild(sharedMomentsArea.lastChild);
  }
}

function updateUI(data) {
  clearCards();
  cardWrapper = ``;
  for (var i = 0; i < data.length; i++) {
    if (i%4==0 || i==0) {
    cardWrapper += '<div class="row">';
    }
    cardWrapper += `
    <div class="text-light col-md-3 pb-4">
          <div data-id ="`+data[i].id+`" class="card border-1" style="width: 100%; ">
            <img class="card-img-top rounded" style="height: 20em; object-fit: cover;" src="`+data[i].image+`" alt="Card image cap">
            <div class="card-body">
              <img class="card-img rounded-circle" style="border:1px solid rgb(104, 104, 104); height:3em; object-fit: cover; width: 3em" src="`+data[i].userImage+`" alt="Card image">
              `+data[i].title+`
            </div>
          </div>
      </div>
    `;
    if (i%4==3 || i==data.length-1) {
      cardWrapper += '</div>';
    }
  }
  sharedMomentsArea.innerHTML += (cardWrapper);
}

var url = 'https://ambwku-default-rtdb.asia-southeast1.firebasedatabase.app/workouts.json';
var networkDataReceived = false;

fetch(url)
  .then(function(res) {
    return res.json();
  })
  .then(function(data) {
    networkDataReceived = true;
    console.log('From web', data);
    var dataArray = [];
    for (var key in data) {
      dataArray.push(data[key]);
    }
    updateUI(dataArray);
  });

if ('indexedDB' in window) {
  readAllData('workouts')
    .then(function(data) {
      if (!networkDataReceived) {
        console.log('From cache', data);
        updateUI(data);
      }
    });
}
