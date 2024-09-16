export default class Character {
  game: Game
  constructor(game: Game) {
    this.game = game
    game.character = this
  }

  gather () {
    const raw_material = Math.ceil(Math.random() * 5)
    this.game.outpost.store('raw_material', raw_material)

    return {
      success: true,
      raw_material
    }
  }

  tick () {
  }
}
