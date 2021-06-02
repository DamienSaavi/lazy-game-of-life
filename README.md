# README

### Description
Conway's Game of Life with a "lazy" update function that optimizes performance by only processing active cells and their neighbors rather than updating the entire grid. The aim is to achieve optimal scaling where performance only relies on number of active cells and not the size of the grid.
The project uses Vue and runs purely on the browser.

Try it here: https://damiensaavi.github.io/lazy-game-of-life/

### Limitations
Since the project currently uses HTML table, DOM manipulations with larger grids causes performance hinderance. See todo list for future potential fix.

### TODO
- [ ] Replace HTML table with canvas #opt
- [ ] Add ability to load patterns #feat
- [ ] Add further explanation to README #doc