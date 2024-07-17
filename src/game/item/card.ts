const cards = {
  todo_0: {
    name: "一张移交清单",
    desc: "一张移交清单，上面列出了一些物品，看起来是要交给某人的。",
    actions: {
      work: {
        field: []
      }
    }
  },
  house_0: {
    name: "廉价公寓的房卡",
    desc: "短租的廉价公寓，简陋，但是可以住人。",
    actions: {
      work: {
        field: [{ type: "application", name: "house" }]
      }
    }
  },
  computer_0: {
    name: "过时的台式机",
    desc: "外表过时，性能还可以。",
    actions: {
      work: [{
        need: [{ type: "item", name: "stock_0" }],
      }],
      study: {
        field: [{ type: "item", name: "business_0" }]
      },
      dream: {
        field: [{ type: "item", name: "spark" }]
      }
    }
  }
}

export default cards
