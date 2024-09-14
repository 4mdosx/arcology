const dataSchema = {
  character: {
    attributes: {

    }
  }
} as any

export default class Character {
  game: Game
  constructor(game: Game) {
    this.game = game
    game.character = this

    for (const key in dataSchema) {
      if (dataSchema.hasOwnProperty(key)) {
        if (!game.data[key]) {
          game.data[key] = dataSchema[key]
        }
      }
    }
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
