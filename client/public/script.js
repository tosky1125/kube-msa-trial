//alert("Please Use Desktop View For Better Expeience")

const handleClickAnchor = async (e) => {
  const result = await fetch(`http://172.30.5.25:31667/movies/${e.target.className}`).then(data => data.json());
  alert(`
  영화제목 : ${result.data.name}
  주연 : ${result.data.actor}
  출시연도 : ${result.data.year}
  `);
}
const getMovieListSet = async () => {
  const imgList = await fetch(`http://172.30.5.25:31667/movies`)
    .then(async (response) => await response.json())
  const list = imgList.data.map(e => {
    const anchor = document.createElement('a')
    anchor.onclick = (e) => handleClickAnchor(e);
    anchor.className = e.pk;
    const div2 = document.createElement('div')
    div2.className = 'column'
    const content = document.createElement('div')
    content.className = 'content'
    const img = document.createElement('img')
    img.src = `http://172.30.5.25:31667/movies/${e.path}`;
    img.className = e.pk;
    img.style.width = '100%';
    content.appendChild(img)
    div2.appendChild(content)
    anchor.appendChild(div2);
    return anchor;
  })
  return list;
}

getMovieListSet().then(result => {
  const target = document.querySelector('.row')
  result.forEach(e => {
    target.appendChild(e)
  })
})

filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
