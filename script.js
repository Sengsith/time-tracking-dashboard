function createCard(activity) {
  // card container
  const newContainer = document.createElement("div");
  newContainer.setAttribute("class", "card-container");
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class", "card " + activity.title.toLowerCase().replaceAll(' ', '-'));

  // inner div for a row based flexbox
  const newInnerDiv = document.createElement("div");
  newInnerDiv.setAttribute("class", "card-inner");

  // inside the first inner div
  const newHeader = document.createElement("h1");
  const newTitle = document.createTextNode(activity.title);
  newHeader.appendChild(newTitle);
  newInnerDiv.appendChild(newHeader);

  // also inside the first inner div
  const newImg = document.createElement("img");
  newImg.src = "./images//icon-ellipsis.svg";
  newImg.alt = "ellipsis";;
  newInnerDiv.appendChild(newImg);

  // set of timeframe inner divs for a row based flexbox
  const dailyInnerDiv = document.createElement("div");
  const weeklyInnerDiv = document.createElement("div");
  const monthlyInnerDiv = document.createElement("div");

  // For each of the timeframes (daily, monthly, weekly)
  Object.entries(activity.timeframes).forEach(entry => {
    const [key, value] = entry;
  
    const newElement = document.createElement("h2");
    const newContent = document.createTextNode(value.current + "hrs");
    newElement.appendChild(newContent);
    
    const newElementPrevious = document.createElement("h3");
    const newContentPrevious = document.createTextNode("Last Week - " + value.previous + "hrs");
    newElementPrevious.appendChild(newContentPrevious);

    switch (key) {
      case "daily":
        dailyInnerDiv.appendChild(newElement);
        dailyInnerDiv.appendChild(newElementPrevious);
        dailyInnerDiv.setAttribute("class", "card-inner daily");
        break;
      case "weekly":
        weeklyInnerDiv.appendChild(newElement);
        weeklyInnerDiv.appendChild(newElementPrevious);
        weeklyInnerDiv.setAttribute("class", "card-inner weekly");
        break;
      case "monthly":
        monthlyInnerDiv.appendChild(newElement);
        monthlyInnerDiv.appendChild(newElementPrevious);
        monthlyInnerDiv.setAttribute("class", "card-inner monthly");
        break;
      default:
        break;
    }

   });

   newContainer.appendChild(newInnerDiv);
   newContainer.appendChild(dailyInnerDiv);
   newContainer.appendChild(weeklyInnerDiv);
   newContainer.appendChild(monthlyInnerDiv);

  // Create backdrop for each activity
  const newBackdrop = document.createElement("div");
  newBackdrop.setAttribute("class", "backdrop");
  // append the inner divs into card container
  newDiv.appendChild(newBackdrop);
  newDiv.appendChild(newContainer);

  // append all into main
  document.querySelector("main").appendChild(newDiv);
}

async function getData() {
  const response = await fetch("./data.json");
  const json = await response.json();
  json.forEach(activity => {
    createCard(activity);
  })
}

const timeframe_inner = document.getElementsByClassName("timeframe-inner");
const timeframe_daily = document.getElementsByClassName("daily");
const timeframe_weekly = document.getElementsByClassName("weekly");
const timeframe_monthly = document.getElementsByClassName("monthly");
const header_daily = document.getElementById("daily");
const header_weekly = document.getElementById("weekly");
const header_monthly = document.getElementById("monthly");

Array.from(timeframe_inner).forEach(timeframe => {
  timeframe.addEventListener("click", (e) => {
    console.log("clicked");
    switch (e.currentTarget.textContent) {
      case "Daily":
        header_daily.style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw-regular');
        header_daily.style.color = "white";
        header_daily.style.scale = "1.1";
        header_weekly.style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw-light');
        header_weekly.style.color = getComputedStyle(document.documentElement).getPropertyValue('--clr-neutral-desaturatedblue');
        header_weekly.style.scale = "1.0";
        header_monthly.style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw-light');
        header_monthly.style.color = getComputedStyle(document.documentElement).getPropertyValue('--clr-neutral-desaturatedblue');
        header_monthly.style.scale = "1.0";
        Array.from(timeframe_daily).forEach(daily => {
          daily.style.display = "flex";
        });
        Array.from(timeframe_weekly).forEach(weekly => {
          weekly.style.display = "none";
        });
        Array.from(timeframe_monthly).forEach(monthly => {
          monthly.style.display = "none";
        })
        break;
      case "Weekly":
        header_daily.style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw-light');
        header_daily.style.color = getComputedStyle(document.documentElement).getPropertyValue('--clr-neutral-desaturatedblue');
        header_daily.style.scale = "1.0";
        header_weekly.style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw-regular');
        header_weekly.style.color = "white";
        header_weekly.style.scale = "1.1";
        header_monthly.style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw-light');
        header_monthly.style.color = getComputedStyle(document.documentElement).getPropertyValue('--clr-neutral-desaturatedblue');
        header_monthly.style.scale = "1.0";
        Array.from(timeframe_daily).forEach(daily => {
          daily.style.display = "none";
        });
        Array.from(timeframe_weekly).forEach(weekly => {
          weekly.style.display = "flex";
        });
        Array.from(timeframe_monthly).forEach(monthly => {
          monthly.style.display = "none";
        })
        break;
      case "Monthly":
        header_daily.style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw-light');
        header_daily.style.color = getComputedStyle(document.documentElement).getPropertyValue('--clr-neutral-desaturatedblue');
        header_daily.style.scale = "1.0";
        header_weekly.style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw-light');
        header_weekly.style.color = getComputedStyle(document.documentElement).getPropertyValue('--clr-neutral-desaturatedblue');
        header_weekly.style.scale = "1.0";
        header_monthly.style.fontWeight = getComputedStyle(document.documentElement).getPropertyValue('--fw-regular');
        header_monthly.style.color = "white";
        header_monthly.style.scale = "1.1";
        Array.from(timeframe_daily).forEach(daily => {
          daily.style.display = "none";
        });
        Array.from(timeframe_weekly).forEach(weekly => {
          weekly.style.display = "none";
        });
        Array.from(timeframe_monthly).forEach(monthly => {
          monthly.style.display = "flex";
        })
        break;
      default:
        break;
    }
  });
})

getData();