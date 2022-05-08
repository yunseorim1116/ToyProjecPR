const expendWrap = document.querySelector(".day-money__wrap");
const dragBtn = document.querySelector(".drag-btn");
dragBtn.addEventListener("touchstart", handleStart, false);
dragBtn.addEventListener("touchmove", handleMove, false);
dragBtn.addEventListener("touchend", handleEnd, false);

const header = document.querySelector(".header");
const bottonOfHeader = header.getBoundingClientRect().bottom;

function handleStart(e) {
  console.log(e);
}

function handleMove(e) {
  console.log("움직이고있다");
}

function handleEnd(e) {
  console.log("끛낫다");
}

async function getData() {
  const response = fetch("https://eulsoo.github.io/list.json");
  return response;
}

getData()
  .then((res) => res.json())
  .then((data) => getDatas(data));

function getDatas(data) {
  data.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  }); //최신순으로 정렬 ,,

  const test = groupArrayOfObjects(data, "date"); //날짜별로 나눠준다
  //   console.log(test);
  const newArr = Object.entries(test);
  //   console.log(newArr);

  newArr.forEach((datas) => {
    console.log(datas);
    console.log("---");
    const ul = document.createElement("ul");
    ul.classList.add("money-history");

    console.log(datas[1]);
    const sum = datas[1]
      .filter((i) => i.inOut === "out")
      .reduce((a, b) => a + b.price, 0); //필터링을 해서 먼저 총액을 구하기

    console.log(sum);

    expendWrap.appendChild(drowTotal(datas[1][0], sum));
    expendWrap.appendChild(ul);
    datas[1].forEach((data) => {
      drowTodayExpend(ul, data);
    });
  });
}

function drowTotal(datas, sum) {
  //오늘,총합 html

  const useWrap = document.createElement("div");
  useWrap.classList.add("day-use__wrap");

  const useDate = document.createElement("div");
  useDate.classList.add("day-use__date");

  const useExpendWrap = document.createElement("div");
  useExpendWrap.classList.add("day-use__expand-wrap");

  const Expend = document.createElement("div");
  Expend.classList.add("day-use__expend");

  const won = document.createElement("span");
  won.classList.add("won");

  const inEx = document.createElement("div");
  inEx.classList.add("inEx");

  useExpendWrap.append(Expend, won, inEx);
  useWrap.append(useDate, useExpendWrap);

  useDate.textContent = datas.date;
  Expend.textContent = sum;
  won.textContent = "원";

  return useWrap;
}

function drowTodayExpend(ul, datas) {
  if (!datas.price) datas.price = "0"; //널처리

  const li = document.createElement("li");
  li.classList.add("history__list");
  const item = document.createElement("div");
  item.classList.add("item");
  item.textContent = datas.item;
  const price = document.createElement("div");

  if (datas.inOut == "in") {
    price.textContent = "+";
    price.classList.add("red");
  }
  price.textContent += datas.price;
  price.classList.add("price");
  li.append(item, price);
  ul.append(li);

  return ul;
}

function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
