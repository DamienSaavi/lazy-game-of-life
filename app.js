const app = Vue.createApp({
    data() {
        return {
            grid: [],
            activeCells: {},
            scope: {},
            dimx: 64,
            dimy: 64,
            simSpeed: 10,
            keepGoing: false,
            mouseDown: false
        }
    },
    methods: {
        updateGrid() {

            this.scope = {}
            const nextGrid = [...Array(this.dimy)].map(x => Array(this.dimx).fill(0))
            const nextActiveCells = {}

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

                        if (this.scope[neighCell] > 3 || this.scope[neighCell] < 2) {
                            this.scope[neighCell]['active'] = false
                            delete nextActiveCells[neighCell]
                        } else if (this.scope[neighCell] == 3) {
                            this.scope[neighCell]['active'] = true
                            nextActiveCells[neighCell] = 1
                        } else if (this.activeCells[neighCell]) {
                            this.scope[neighCell]['active'] = true
                            nextActiveCells[neighCell] = 1
                        } else {
                            this.scope[neighCell]['active'] = false
                            delete nextActiveCells[neighCell]
                        }
                    }
                }
            }

            for (cell in nextActiveCells) {

                const i = Number(cell.split(',')[0])
                    , j = Number(cell.split(',')[1])

                nextGrid[i][j] = 1
            }

            this.activeCells = nextActiveCells
            this.grid = nextGrid

        },

        toggleCell(i, j) {
            this.grid[i][j] = (this.grid[i][j] + 1) % 2

            if (this.grid[i][j] == 1)
                this.activeCells[`${i},${j}`] = 1
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
            const t1 = performance.now()
            
            console.log(t1-t0)
            
            if (this.keepGoing)
                setTimeout(() => this.runSim(), 300 - this.simSpeed * 30);
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
            if (event.target.value > 64)
                event.target.value = 64
            else if (event.target.value < 8)
                event.target.value = 8

            this.dimx = Number(event.target.value)
            this.clearGrid()
        },

        changeY(event) {
            if (event.target.value > 64)
                event.target.value = 64
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