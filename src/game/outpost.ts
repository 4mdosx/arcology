function makeEmptyOutPost () {
  return {
    poi: 1,
    buildings: [],
    power: 10,
    stock: {
      raw_material: 0,
    },
    max: {
      power: 100,
      raw_material: 500
    }
  }
}

export default class OutPost {
  game: Game
  constructor(game: Game) {
    this.game = game
    game.outpost = this

    // game.data.world
    if (game.data.outpost === undefined) {
      game.data.outpost = makeEmptyOutPost()
    }
  }

  store (resource: string, amount: number) {
    const outPost = this.game.data.outpost
    if (outPost.stock[resource] + amount > outPost.max[resource]) {
      outPost.stock[resource] = outPost.max[resource]
    } else {
      outPost.stock[resource] += amount
    }
  }

  changePower () {
    this.game.data.outpost.power = this.game.data.outpost.max.power
  }
}
