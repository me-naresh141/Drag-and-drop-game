let input = document.querySelector('input')
let root = document.querySelector('ul')
let span = document.querySelector('span')

let data = JSON.parse(localStorage.getItem('li')) || []

span.addEventListener('click', (e) => {
  input.value == '' ? alert('please enter your text') : data.push(input.value)
  creatUi()
  localStorage.setItem('li', JSON.stringify(data))
  input.value = ''
})

// // creatUi

function creatUi() {
  root.innerText = ''
  data.forEach((elm) => {
    var li = document.createElement('li')
    let p = document.createElement('p')
    p.innerText = elm
    let small = document.createElement('small')
    small.innerText = 'drag me'
    li.append(p, small)
    root.append(li)
  })
  let allLi = document.querySelectorAll('li')
  allLi.forEach((elm) => {
    elm.setAttribute('draggable', true)
    elm.setAttribute('id', 'liId')
    elm.addEventListener('dragstart', setData)
    elm.addEventListener('dragover', defalut)
    elm.addEventListener('drop', getdata)
  })
}

creatUi()

function setData(e) {
  dragSrcEl = this
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/html', this.innerHTML)
}
function defalut(e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
  return false
}

function getdata(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML
    this.innerHTML = e.dataTransfer.getData('text/html')
  }
  return false
}
