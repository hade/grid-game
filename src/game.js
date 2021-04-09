const nextNumber = () => {
  const elem = document.getElementById('next-number')

  return {
    nextElem: elem,
    nextNum: parseInt(elem.textContent, 10),
  }
}

const increaseCurrentNumber = () => {
  const { nextElem, nextNum } = nextNumber()
  nextElem.textContent = nextNum + 1

  return nextNum
}

const decreaseCurrentNumber = () => {
  const { nextElem, nextNum } = nextNumber()
  nextElem.textContent = nextNum - 1

  return nextNum
}

const resetCurrentNumber = () => {
  const { nextElem, nextNum } = nextNumber()
  nextElem.textContent = 1

  return nextNum
}

const okToRemoveTheNumber = (elemText) => {
  const { nextNum } = nextNumber()
  // console.log('nextNumber: ', nextNum)

  return (
    elemText !== ''
    && ((nextNum - 1) === parseInt(elemText, 10))
  )
}

const okToAddNumber = (elem) => {
  const elemText = elem.textContent
  const newRow = elem?.getAttribute('data-row')
  const newCol = elem?.getAttribute('data-col')

  const { nextNum } = nextNumber()
  const prevElem = document.querySelector(`div#grid-container div[data-value='${nextNum - 1}']`)
  const prevRow = prevElem?.getAttribute('data-row')
  const prevCol = prevElem?.getAttribute('data-col')

  // console.log('newRow: ', newRow, ' prevRow: ', prevRow)
  // console.log('newCol: ', newCol, ' prevCol: ', prevCol)

  if (elemText !== '') { return false }
  if (typeof (prevRow) === 'undefined') { return true }

  if (
    (Math.abs(newRow - prevRow) === 0 && Math.abs(newCol - prevCol) === 3)
    || (Math.abs(newCol - prevCol) === 0 && Math.abs(newRow - prevRow) === 3)
    || (Math.abs(newRow - prevRow) === 2 && Math.abs(newCol - prevCol) === 2)
    || (Math.abs(newCol - prevCol) === 2 && Math.abs(newRow - prevRow) === 2)
  ) {
    return true
  }

  return false
}

const removeLastItemClass = () => {
  const els = document.getElementsByClassName('last-item')

  const removeClasses = () => {
    els[0].classList.remove('last-item')
    if (els[0]) removeClasses()
  }

  if (els[0]) removeClasses()
}

const highlightPrevNumber = () => {
  removeLastItemClass()
  const { nextNum } = nextNumber()
  const prevElem = document.querySelector(`div#grid-container div[data-value='${nextNum - 1}']`)
  prevElem?.classList.add('last-item')
}

const createGridListeners = () => {
  const boxes = document.querySelectorAll('div#grid-container div.item')
  boxes.forEach((box) => (
    box.addEventListener('click', (e) => {
      const elem = e.target
      const elemText = elem.textContent

      if (okToAddNumber(e.target)) {
        elem.classList.toggle('taken')
        removeLastItemClass()
        elem.classList.add('last-item')

        const newNumber = increaseCurrentNumber()
        elem.setAttribute('data-value', newNumber)
        e.target.textContent = newNumber
      } else if (okToRemoveTheNumber(elemText)) {
        e.target.classList.toggle('taken')
        elem.setAttribute('data-value', '')
        decreaseCurrentNumber()
        e.target.textContent = ''
        highlightPrevNumber()
      }
    })
  ))
}

const createListeners = () => {
  createGridListeners()
}

export {
  createListeners,
  resetCurrentNumber,
}
