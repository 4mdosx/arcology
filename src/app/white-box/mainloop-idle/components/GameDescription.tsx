export function GameDescription() {
  return (
    <div className="mt-8 bg-black/30 rounded-lg p-6">
      <h3 className="text-lg font-bold mb-3">游戏说明</h3>
      <p className="text-gray-300 text-sm leading-relaxed">
        这是一个基于 Arcology 游戏引擎的放置类游戏演示。游戏使用 ECS 架构管理游戏状态和系统更新。
        通过点击赚取金币，然后购买升级来提升收益效率。游戏引擎每秒运行60次更新循环，
        自动计算收益并更新游戏状态。
      </p>
    </div>
  )
}
