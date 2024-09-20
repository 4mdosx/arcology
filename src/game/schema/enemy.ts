
export const EnemySchema = [{
  id: 'sylvilagus_brasiliensis',
  health: 20,
  defense: 10,
  action: [{
    type: 'attack',
    value: 10,
    ready_time: 1,
  }],
}]

export const EnemyI18n = {
  zh: {
    name: {
      sylvilagus_brasiliensis: '森林兔',
    }
  },
  en: {
    name: {
      sylvilagus_brasiliensis: 'Sylvilagus brasiliensis',
    }
  },
}
