const createGrid = () => {
  const gridContainer = document.getElementById('grid-container')
  const gridSize = parseInt(gridContainer.getAttribute('data-grid-size'), 10)
  const container = document.getElementById('grid-container')

  const arr = [...Array(gridSize).keys()]

  arr.forEach((row) => {
    arr.forEach((col) => {
      const newElem = document.createElement('div')
      newElem.classList.add('item')
      newElem.setAttribute('data-row', row)
      newElem.setAttribute('data-col', col)
      container.appendChild(newElem)
    })
  })
}

export default createGrid
