const CONTAINER = document.querySelector(".card-container");
const BTN = document.querySelectorAll(".btn");
const north = ["臺北市","新北市","基隆市","新竹市","桃園市","新竹縣","宜蘭縣",];
const center = ["苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣"];
const south = ["嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣", "澎湖縣"];
const east = ["花蓮縣", "臺東縣"];
const island = ["金門縣", "連江縣"];
var mydata;

fetch(
  "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-AA300EC1-31BA-465E-B669-6CA2C320A195"
)
  .then(function (response) {
    // console.log(response)
    return response.json();
  })
  .then(function (weather) {
    mydata = weather;
    var locations = weather.records.location;
    result = locations;
    locations.forEach((element) => {
      let location = element.locationName;
      let minTemp = element.weatherElement[2].time[0].parameter.parameterName;
      let maxTemp = element.weatherElement[4].time[0].parameter.parameterName;
      let rain = element.weatherElement[1].time[0].parameter.parameterName;
      let feel = element.weatherElement[3].time[0].parameter.parameterName;
      // 如果降雨機率小於25% 就是晴天, 如果小於等於50% 陰天, 如果大於50% 就是下雨天
      let imgPath;
      if (rain < 25) {
        imgPath = "./img/cloud.gif";
      } else if (rain <= 50) {
        imgPath = "./img/wind.gif";
      } else {
        imgPath = "./img/rain.gif";
      }
      CONTAINER.innerHTML += `
                <div class="card radius" data-city="${location}">
                    <img src="${imgPath}" alt="" class="radius">
                    <h2>${location}</h2>
                    <p>溫度: ${minTemp}℃ ~ ${maxTemp}℃</p>
                    <p>降雨機率: ${rain}%</p>
                    <p>舒適度: ${feel}</p>
                </div> 
                `;
    });
  });


  // 我把所有縣市印出來, 然後把不想看到的加上display:none  ->
function filter1(areas) {
  var allcity = document.querySelectorAll(".card.radius");

  //將所有城市一筆一筆叫出來
  allcity.forEach((city) => {
    //如果條件是all(全部), 就直接給block
    if (areas == "all") {
      city.style.display = "block";
    } else {
      //先假設所有城市都不顯示
      city.style.display = "none";
      areas.forEach((area) => {
        //將條件拿出來比較, 如果條件中的任何一個縣市有符合就加上block顯示出來
        if (city.dataset.city == area) {
          city.style.display = "block";
        }
      });
    }
  });
}

// 根據按下的按鈕選定條件, 只將符合條件的縣市做出卡片
function filter2(areas) {
  console.log(mydata);

  var allcity = document.querySelectorAll(".card.radius");
  allcity.forEach((item)=>{
    if ( !item.classList.contains('hide') ) {
      // 將已經顯示的卡片隱藏
      item.classList.add('hide');
    }
  }) ;
  if (areas == "all") {
    // 
    console.log('all');
    allcity.forEach((item)=>{
      item.classList.remove('hide');
    }) ;
  }
  else {
    showRegion(areas);
  }
  // else if (areas == "north") {
  //   // 
  //   showRegion(north);
  // }else if (areas == "south") {
  //   // 
  //   showRegion(south);
  // }else if (areas == "east") {
  //   // 
  //   showRegion(east);
  // }else if (areas == "center") {
  //   // 
  //   showRegion(center);
  // }else if (areas == "island") {
  //   // 
  //   showRegion(island);
  // }
}

function showRegion(reg) {
  var allcity = document.querySelectorAll(".card.radius");
  
  reg.forEach(regName => {
    console.log("regName :"+regName);
    allcity.forEach(cityName => {
      if ( regName == cityName.dataset.city ) {
        console.log("cityName :"+cityName.dataset.city);
        cityName.classList.remove('hide');
      }
    });
  });
}