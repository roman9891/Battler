const monsters = [
  {
    id: 0,
    name: `Big Red Crab`,
    hp: 100,
    energy: 100,
    actions: [
      {
        name: `charges up`,
        power: 0,
        effect: {}
      },
      {
        name: `power attacks`,
        power: 50,
        effect: {}
      }
    ],
    info: `A large crab that takes it's time using heavy attacks`,
    image: `https://vignette.wikia.nocookie.net/etrian/images/e/ee/Clawfly.png/revision/latest/top-crop/width/300/height/300?cb=20120514011330`
  },
  {
    id: 1,
    name: `Blob`,
    hp: 100,
    actions: [
      {
        name: `attacks`,
        power: 20,
        effect: {}
      }
    ],
    image: `https://www.ckaleb.com/wp-content/uploads/2018/05/ro-poring.gif`
  },
  {
    id: 2,
    name: `Dark Knight`,
    hp: 200,
    actions: [
      {
        name: `slashes`,
        power: 20
      },
      {
        name: `gets enraged`,
        beforeEffect: [[`enemyPowerIncrease`, 1.5]]
      }
    ],
    image: `https://lh3.googleusercontent.com/proxy/8w0pLP1HdQ9nBCLReZeXTXY6GuPkPPwUV1PxtxONTPuOTB9EqDNawPiTBstgD36hgw_caolBq9MZAmuGWZSAr_Rctg`
  }
]

export default monsters