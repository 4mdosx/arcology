function makeEmptyWorld () {
  return {
    benchmark: 0.92
  }
}

export default class World {
  game: Game
  constructor(game: Game) {
    this.game = game
    game.world = this

    // game.data.world
    if (game.data.world === undefined) {
      game.data.world = makeEmptyWorld()
    }
  }
}
