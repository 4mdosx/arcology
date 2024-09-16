const initValue = {
  unlocked_buildings: [],
}

export default class Mission {
  game: Game
  constructor(game: Game) {
    this.game = game
    game.meta = this

    if (game.data.meta === undefined) {
      game.data.meta = { ...initValue }
    } else {
      this.game.data.meta = { ...initValue, ...game.data.meta }
    }
  }

}
