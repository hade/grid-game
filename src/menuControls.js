import createGrid from './gridFactory.js'
import { createListeners, resetCurrentNumber } from './game.js'

const resetGame = () => {
  const gridContainer = document.getElementById('grid-container')
  gridContainer.textContent = ''
  createGrid()
  createListeners()
  resetCurrentNumber()
}

const gridSizeControls = () => {
  const sizeButtons = document.querySelectorAll('div#numbers-container div[data-grid-size]')
  sizeButtons.forEach((btn) => (
    btn.addEventListener('click', (e) => {
      const newSize = e.target?.textContent
      const gridContainer = document.getElementById('grid-container')
      gridContainer.setAttribute('data-grid-size', newSize)
      gridContainer.setAttribute('style', `--size: ${newSize};`)
      resetGame()
    })
  ))
}

const tryAgainButton = () => {
  const button = document.getElementById('try-again-button')

  button.addEventListener('click', () => {
    resetGame()
  })
}

const enableMenuControls = () => {
  gridSizeControls()
  tryAgainButton()
}

export default enableMenuControls
