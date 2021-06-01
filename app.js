const app = Vue.createApp({
    data() {
        return {
            grid: [],
            activeCells: {},
            scope: {},
            dimx: 32,
            dimy: 32,
            maxx: 128,
            maxy: 128,
            simSpeed: 7,
            keepGoing: false,
            mouseDown: false
        }
    },
    methods: {
        updateGrid() {
            this.scope = { ...this.activeCells }

            for (cell in this.activeCells) {
                const i = Number(cell.split(',')[0])
                    , j = Number(cell.split(',')[1])

                for (let di = i - 1; di <= i + 1; di++) {
                    for (let dj = j - 1; dj <= j + 1; dj++) {

                        if ((di == i && dj == j) || di < 0 || di >= this.dimy || dj < 0 || dj >= this.dimx)
                            continue

                        const neighCell = `${di},${dj}`

                        if (this.scope[neighCell])
                            this.scope[neighCell]++
                        else
                            this.scope[neighCell] = 1
                    }
                }
            }

            for (cell in this.scope) {
                const pop = this.scope[cell]
                const i = Number(cell.split(',')[0])
                    , j = Number(cell.split(',')[1])

                if (pop == 3){
                    this.activeCells[cell] = 0
                    this.grid[i][j] = 1
                }
                else if (pop < 2 || pop > 3) {
                    delete this.activeCells[cell]
                    this.grid[i][j] = 0
                }
            }
        },

        toggleCell(i, j) {
            this.grid[i][j] = (this.grid[i][j] + 1) % 2

            if (this.grid[i][j] == 1)
                this.activeCells[`${i},${j}`] = 0
            else
                delete this.activeCells[`${i},${j}`]
        },

        drawCell(i, j) {
            if (this.mouseDown)
                this.toggleCell(i, j)
        },

        toggleSim() {
            this.keepGoing = !this.keepGoing

            if (this.keepGoing)
                this.runSim()
        },

        runSim() {
            const t0 = performance.now()
            this.updateGrid()

            const t = performance.now() - t0

            if (this.keepGoing)
                setTimeout(() => this.runSim(), 300 - t - this.simSpeed * 30);
        },

        toggleMouse(isDown) {
            this.mouseDown = isDown
        },

        clearGrid() {
            this.keepGoing = false
            this.grid = [...Array(this.dimy)].map(x => Array(this.dimx).fill(0))
            this.scope = {}
            this.activeCells = {}
        },

        changeX(event) {
            if (event.target.value > this.maxx)
                event.target.value = this.maxx
            else if (event.target.value < 8)
                event.target.value = 8

            this.dimx = Number(event.target.value)
            this.clearGrid()
        },

        changeY(event) {
            if (event.target.value > this.maxy)
                event.target.value = this.maxy
            else if (event.target.value < 8)
                event.target.value = 8

            this.dimy = Number(event.target.value)
            this.clearGrid()
        },

        changeSpeed(event) {
            if (event.target.value > 10)
                event.target.value = 10
            else if (event.target.value < 1)
                event.target.value = 1

            this.simSpeed = Number(event.target.value)
        }
    },
    mounted() {
        this.grid = [...Array(this.dimy)].map(x => Array(this.dimx).fill(0))
    },
})

app.mount('#app')