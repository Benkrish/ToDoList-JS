const container = document.querySelector('.container')
const form = document.querySelector('form')
const tittle = document.getElementById('tittle')
const desc = document.getElementById('desc')

// reload karte hi local storage ki value fetch ho jaye
// .parse convert string into object
const tasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : []
// uppar wala reload karne ke baad reload karte hi local storage me save ho jaye
//ye render ke liye jasie reload wasie dikh jaye
showAllTasks()

// for rendering from array we are using for loop

function showAllTasks() {
  tasks.forEach((v, i) => {
    const div = document.createElement('div')
    div.setAttribute('class', 'task')

    const innerDiv = document.createElement('div')

    const p = document.createElement('p')
    p.innerHTML = v.tittle
    innerDiv.append(p)

    const span = document.createElement('span')
    span.innerHTML = v.desc
    innerDiv.append(span)

    const btn = document.createElement('button')
    btn.setAttribute('class', 'deleteBtn')
    btn.innerHTML = '-'

    btn.addEventListener('click', () => {
      //sare remove karo
      removeTask() // ye imp nhi pura array har baar iterate karega and baar baar same ele bhi dikhenge
      // same problem jab show all task niche call kar rahe the
      //   phir array me se remove karke
      tasks.splice(i, 1) // for each se index mila hai n vo hi hai ye i = index vohi ele delete hoga
      localStorage.setItem('tasks', JSON.stringify(tasks))

      console.log(tasks)
      //   render kar do
      showAllTasks()
    })

    div.append(innerDiv)
    div.append(btn)
    container.append(div)
  })
}

// u have to remove whatever is rendering

function removeTask() {
  tasks.forEach(() => {
    //jitne bhi div hai sab ko ek kar ek seletct karke    delete karega
    const div = document.querySelector('.task')
    div.remove() //.remove removes an ele(here div) from docunent
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  removeTask()
  tasks.push({
    tittle: tittle.value,
    desc: desc.value,
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
  console.log(tasks)
  showAllTasks()
})
