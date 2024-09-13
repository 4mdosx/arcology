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
    if (this.game.data.character.status.endurance <= 0) {
      return {
        success: false,
        message: 'Not enough endurance'
      }
    }
    const raw_material = Math.ceil(Math.random() * 5)
    this.game.outpost.store('raw_material', raw_material)

    return {
      success: true,
      raw_material
    }
  }

  tick () {
    const character = this.game.data.character
    const recover = character.recover
    for (const key in recover) {
      if (recover.hasOwnProperty(key)) {
        character.status[key] += recover[key]
        if (character.status[key] > character.max[key]) {
          character.status[key] = character.max[key]
        }
      }
    }
  }
}
