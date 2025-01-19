# Jordan's Minigame Assets

By: Stella Marie
Designs of game assets in pure js

## Description

### Assets Schedule
[x] Sprite
[x] Max sprites
    Result:
    - requestAnimationFrame
    - spritesheet
[]  Load sprites
[]  Movable character

```js
const evts = {
    keydown: () => {},
    keyup: () => {}
}

document.addEventListener("keydown", evts.keydown)

document.removeEventListener("keydown", evts.keydown)
evts.keydown = new_fn
document.addEventListener("keydown", evts.keydown)
```

Note: Asset requirements
- Individual frames
- Spritesheet
- Animation

1.  []  Player
    []  Fig: mother
    []  House[player]: interior - bedroom
    []  House[player]: interior - living room
    []  Collision: immovable
    []  Collision: transition

    Move [character]

2.  []  UI: clock
    []  UI: health
    []  UI: stamina
    []  UI: countdown
    []  Contacts
    []  Inventory
    []  Transition: gravitational anomaly

    Activate [character]
    Navigate [menu]

    2b. Communication
        []  Eyes
        []  Object references
            []  charge
            []  charging device(s)
            []  charging station(s)
            []
        []  Actions
            []  open [object]
            []  view [info]
            []  activate [object]
            []  navigate [map|menu]
            []  goto/move
            []  use [object]
            []  ask
            []  answer
        []  Entities
            []  player
            []  mother
        []  Schedule
            []  time
            []  task
            []  goal (params)
            []  priority
            []  interest
        **Note**: Extent of communication system should be developed in segments. Only develop as far as needed for present scope of area, characters, and objects.

3.  []  Fig: friend (Jack Skellington Jr.)
    []  Fig: rival (Genie du Lamp)
    []  Geo: meowth
    []  Geo: eevee
    []  Geo: ditto
    []  Community area
    []  House[player]: exterior
    []  Terrain: underground
        []  Grass
        []  Wall
        []  Path
        []  Lights

    3b. []  House[friend]: exterior
        []  House[friend]: interior - living area
        []  House[rival]: exterior
        []  House[rival]: interior - living area
    3c. []  Battle

4.  []  Figs: clinic staff
    []  Clinic
    []  Figs: temple serfs
    []  Recurs
    []  Temple
    []  Figs: Professor, lab assistants
    []  Lab
    []  Figs: crafters, miners, etc.
    []  House-shops

### Side Notes
Luther/Cassia was given two geos by their parents when they were five years old. Today, the two are missing somewhere in Undertown. Maybe the residents of Undertown can help them find the mischievous pair.

Geo: Geometric
Collectible creatures to befriend, care for, and battle. Their appearances consist of regular lines and shapes. They are responsible for mining and gathering ores.

Fig: Figure
Humanoid creatures that fulfill communal and economic roles to help, befriend, battle against, and compete with. Their appearances consist of points, lines, and planes. A secondary species that has taken to caring for geos and recurs who provide them the charges they need as sustenance.

Recur: Recursive
Humanoid creatures that manage and protect the creatures of an area to help, befriend, and respect. Their appearances consist of patterns recurring on increasingly smaller scales, or rather fractals. Given ores by geos, they break these ores down, extract and so produce charges.

Creature graphics each geo|fig|recur
- Contacts (icon)
- Party (totem)
- Battle (front, back)
- Sprite (side, top, down)

---

"6 Game Design Mistakes You MUST Avoid" (Thomas Brush, youtube)
1. Show the problem before the solution
   ex. lock for key, guide to lock then they find key
2. Level design/dev is 5x more complicated than one thinks
3. Give player mechanical choices / world choices > level design choices
4. If player doesn't learn something can use to advantage in future => bored
5. Don't be afraid to tell the player what's going on
   - too much confusion => feeling of being blind
6. When in doubt, surprise the player
   - reveal mystery or something to reach the end for in first 10 min
   - throw in funzies in dry spots

**Reminder**:
- How does it look and move?
- How does it work?
- How is it coded?

## Complete Setup

**Deployment:** 
```bash
git subtree push --prefix <dirname> origin gh-pages
```

## Known Bugs

## License

Jordan's Mini Game © 2024 by Stella Marie (Sm Kou) is licensed under CC BY-NC-ND 4.0
Jordan's Mini Game is licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License

[License](./LICENSE)
[License](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[Legal Code](https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode.en)
