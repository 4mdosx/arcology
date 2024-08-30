function makeEmptyOutPost () {
  return {
    probe: 1,
    buildings: [],
    power: 10,
    resources: {
      fuel: 0,
      raw_material: 0,
    },
    max: {
      power: 10,
      fuel: 50,
      raw_material: 50
    }
  }
}

export default class OutPost {
  game: Game
  constructor(game: Game) {
    this.game = game
    game.outpost = this

    // game.data.world
    if (game.data.outposts === undefined) {
      game.data.outposts = [makeEmptyOutPost()]
    }
  }

  store (resource: string, amount: number) {
    const outPost = this.game.data.outposts[0]
    if (outPost.resources[resource] + amount > outPost.max[resource]) {
      outPost.resources[resource] = outPost.max[resource]
    } else {
      outPost.resources[resource] += amount
    }
  }
}
