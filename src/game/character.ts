const dataSchema = {
  character: {
    status: {
      endurance: 5
    },
    max: {
      endurance: 5
    },
    recover: {
      endurance: 1
    },
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
    const fuel = Math.floor(Math.random() * 5)
    const raw_material = Math.floor(Math.random() * 5)
    this.game.outpost.store('fuel', fuel)
    this.game.outpost.store('raw_material', raw_material)

    return {
      success: true,
      fuel,
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
