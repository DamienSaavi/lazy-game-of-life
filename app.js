const app = Vue.createApp({
    data() {
        return {
            grid: [],
            dimx: 32,
            dimy: 32,
            simSpeed: 7,
            keepGoing: false,
            mouseDown: false
        }
    },
    methods: {
        updateGrid() {
            const nextGrid = JSON.parse(JSON.stringify(this.grid))
            
            for (let i = 0; i < this.dimy; i++) {
                for (let j = 0; j < this.dimx; j++) {
                    
                    const cell = this.grid[i][j]
                    let pop = 0;

                    for (let di = i-1; di <= i+1; di++) {
                        for (let dj = j-1; dj <= j+1; dj++) {
                            
                            if ((di < 0 || di >= this.dimy) || (dj < 0 || dj >= this.dimx))
                                continue

                            if (!(di == i && dj == j) && this.grid[di][dj] == 1) {
                                pop++;
                            }
                        }
                    }

                    if (pop < 2 || pop > 3)
                        nextGrid[i][j] = 0
                    else if (cell == 0 && pop == 3)
                        nextGrid[i][j] = 1
                    else
                        nextGrid[i][j] = cell
                }
            }

            this.grid = nextGrid

        },

        toggleCell(i,j) {
            this.grid[i][j] = (this.grid[i][j]+1)%2
        },

        drawCell(i,j) {
            if (this.mouseDown)
                this.toggleCell(i,j)
        },

        toggleSim() {
            this.keepGoing = !this.keepGoing

            if(this.keepGoing)
                this.runSim()
        },

        runSim() {
            this.updateGrid()

            if (this.keepGoing)
                setTimeout(() => this.runSim(), 300 - this.simSpeed*30);
        },

        toggleMouse(isDown) {
            this.mouseDown = isDown
        },

        clearGrid() {
            console.log(this.dimx, this.dimy)
            this.keepGoing = false
            this.grid = [...Array(this.dimy)].map(x => Array(this.dimx).fill(0))
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