<h4 style={{ display: 'flex' }}>
<div onClick={() => handlePrediction(fight.Fighters[0])}>{createFighterName(fight.Fighters[0])}</div>
<div style={{ margin: '0 5px' }}>vs</div>
<div onClick={() => handlePrediction(fight.Fighters[1])}>{createFighterName(fight.Fighters[1])}</div>
</h4>