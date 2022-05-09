const allYearList = [
  (janu = []),
  (feb = []),
  (mar = []),
  (apr = []),
  (may = []),
  (june = []),
  (july = []),
  (aug = []),
  (sep = []),
  (oct = []),
  (mov = []),
  (dec = []),
];

const todayExpendData = [];
const todayDate = [];
const octoberExpendData = [];
const monthData = [
  "2022.1",
  "2022.2",
  "2022.3",
  "2022.4",
  "2022.5",
  "2022.6",
  "2022.7",
  "2022.8",
  "2022.9",
  "2022.0",
  "2022.11",
  "2022.12",
];

const keyData = [];
const sumExpendData = [];

const expendListBox = document.querySelector(".expend-list__box");
const month = document.querySelector(".month");

async function getData() {
  const response = fetch("data.json");
  return response;
}

getData()
  .then((res) => res.json())
  .then((data) => getDatas(data));

function getDatas(data) {
  data.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  }); //최신순으로 정렬 ,,

  const newDatas = groupBy(data, "date"); //날짜별로 나눠준다

  // console.log(newDatas); //날짜별로 나누어진 데이터 모음

  makeTodayData(newDatas); //데이터 가공
  getMonthData(data); //월별 데이터 만들기//함수가 끝나면 가공 완료
  getMonthClassfy(allYearList[4]); //원하는 월별 데이터를 "직접"넣으면
  month.textContent = "5";
}

function makeTodayData(newDatas) {
  for (const [key, value] of Object.entries(newDatas)) {
    // console.log(value);
    //value = 분류된 데이터 하나하나 뽑아내는 포문
    //데이터일별로가공
    const sum = value
      .filter((i) => i.inOut == "out")
      .reduce((a, b) => a + b.price, 0);

    const test = {
      [key]: sum,
    };

    todayDate.push(key.substring(5, 10));
    todayExpendData.push(test);
  }

}

function getMonthData(datas) {
  //데이터가공
 

  for (const [key, value] of Object.entries(datas)) {
    const month = value.date.substring(0, 6);

    if (month == monthData[0]) {
      allYearList[0].push(value);
    } else if (month == monthData[1]) {
      allYearList[1].push(value);
    } else if (month == monthData[2]) {
      allYearList[2].push(value);
    } else if (month == monthData[3]) {
      allYearList[3].push(value);
    } else if (month == monthData[4]) {
      allYearList[4].push(value);
    } else if (month == monthData[5]) {
      allYearList[5].push(value);
    } else if (month == monthData[6]) {
      allYearList[6].push(value);
    } else if (month == monthData[7]) {
      allYearList[7].push(value);
    } else if (month == monthData[8]) {
      allYearList[8].push(value);
    } else if (month == monthData[9]) {
      allYearList[9].push(value);
    } else if (month == monthData[10]) {
      allYearList[10].push(value);
    } else if (month == monthData[11]) {
      allYearList[11].push(value);
    }
  }
}

function getMonthClassfy(monthDatas) {
  //원하는 달의 데이터를 넘겨받음
  const newMonthDatas = groupBy(monthDatas, "type");
  makeHtmlMonthList(newMonthDatas);
}

const groupBy = function (data, key) {
  return data.reduce(function (carry, el) {
    let group = el[key];

    if (carry[group] === undefined) {
      carry[group] = [];
    }

    carry[group].push(el);
    return carry;
  }, {});
};

function makeHtmlMonthList(monthDatas) {
  for (const [key, value] of Object.entries(monthDatas)) {

    const itemExpend = value
      .filter((i) => i.inOut === "out")
      .reduce((a, b) => a + b.price, 0); //목록당 지출



    const expendList = document.createElement("div");

    key != "" ? keyData.push(key) : keyData.push("Etc");

    sumExpendData.push(itemExpend);
    expendList.classList.add("expend-list"); //부모박스

    const expendListWrap = document.createElement("div");
    expendListWrap.classList.add("expend-list__expend-wrap"); //자식박스 1

    const img = document.createElement("img");
    img.classList.add("img-icon");
    const expendLisTitle = document.createElement("span");
    expendLisTitle.classList.add("expend-list__expend");
    key != ""
      ? (expendLisTitle.textContent = key)
      : (expendLisTitle.textContent = "etc");

    expendListWrap.append(img, expendLisTitle); //자식박스1에 자식들 붙여주기

    const expendAmountWrap = document.createElement("div");
    expendAmountWrap.classList.add("expend-list__amount-wrap"); //자식박스 2

    const expendListAmount = document.createElement("span");
    expendListAmount.classList.add("expend-list__amount");
    expendListAmount.textContent = itemExpend.toLocaleString();
    expendListAmount.textContent += " 원";

    expendAmountWrap.append(expendListAmount); //자식박스2에 자식들 붙여주기

    expendList.append(expendListWrap, expendAmountWrap);
    expendListBox.append(expendList);
  } //html그려주기 끝


  new Chart(document.getElementById("doughnut-chart"), {
    type: "doughnut",
    data: {
      labels: keyData,
      datasets: [
        {
          label: "이번달 소비 현황",
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          data: sumExpendData,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "이번달 소비 현황",
      },
    },
  });
}
