const todayExpendData = [];

async function getData() {
  const response = fetch("data.json");
  return response;
}

getData()
  .then((res) => res.json())
  .then((data) => getDatas(data));

function getDatas(data) {
  const datas = data.bankList;
  datas.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  }); //최신순으로 정렬 ,,
  const test = groupArrayOfObjects(datas, "date"); //날짜별로 나눠준다
  const newArr = Object.entries(test);

  for (const [key, value] of Object.entries(test)) {
    // console.log(key);
    // console.log(value);
    const sum = value
      .filter((i) => i.income == "out")
      .reduce((a, b) => a + b.price, 0);

    const newKey = value[0].date;
    const test = {
      [key]: sum,
    };

    todayExpendData.push(test);
  }

  drowChart(newArr);
}

function drowChart(newArr) {
  console.log(newArr);
  console.log(newArr[0]);
}

function groupArrayOfObjects(list, key) {
  return list.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
