const setup = (size) => (p5, parent) => {
  p5.createCanvas(size, size).parent(parent)
  p5.noLoop()
  return
}

const draw = (data) => (p5) => {
  const player_size = data.size
  
  const deg2rad = (deg) => deg * (Math.PI/180)
  
  const players_count = data.players.length
  const radius = (players_count * player_size)/Math.PI * 3/2
  const rot_unit = deg2rad(360/players_count)
  
  p5.translate(p5.width/2, p5.height/2);
  
  const players_pos = data.players.map((player, idx) => {
    var x = radius * p5.sin(rot_unit * idx)
    var y = radius * p5.cos(rot_unit * idx)
    
    return { player, pos: [x,y] }
  })

  
  data.games.forEach(game => {

    const { pos: [x1,y1] } = players_pos.find(p => p.player._id === game[0]._id)
    const { pos: [x2,y2] } = players_pos.find(p => p.player._id === game[1]._id)
    
    const pointer_size = 5

    const alpha = Math.atan((x2-x1)/(y2-y1))
    
    const xd = Math.abs(Math.sin(alpha) * (player_size/2 + pointer_size/2))
    const yd = Math.abs(Math.cos(alpha) * (player_size/2 + pointer_size/2))
    
    const xn = x1 > x2 ? x1 - xd : x1 + xd
    const yn = y1 > y2 ? y1 - yd : y1 + yd
    
    p5.stroke('#aaa')
    p5.line(x1,y1,x2,y2)

    p5.stroke('#aaa')
    p5.fill('#aaa')
    p5.circle(xn, yn, pointer_size)
    
  })
  
  p5.stroke(0,0,0,0)
  players_pos.forEach(p => {
    const won = data.games.filter(game => game[0] === p.player).length
    const lost = data.games.filter(game => game[1] === p.player).length
    const ratio = won+lost > 0 ? won/(won+lost) : 0
    
    p5.circle(...p.pos, player_size)
    const from = p5.color('#fff')
    const to = p5.color('#00b16a')
    p5.fill(p5.lerpColor(from, to, ratio))
    p5.circle(...p.pos, player_size)
  })
  
  players_pos.forEach(p => {
    p5.fill(0,0,0)
    p5.textFont('Barlow')
    p5.textSize(16)
    const width = p5.textWidth(p.player.name)
    const [x,y] = p.pos
    p5.text(p.player.name, x-width/2, y+6)
  })
}

export { setup, draw }