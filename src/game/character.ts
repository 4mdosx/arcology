const dataSchema = {} as any

export default class Character {
  game: Game | null = null
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

  tick () {
    console.log('Character is ticking')
  }
}
