#rbot
A bot based on mineflayer which can execute task with dependancies

[Youtube Demo of repeat spiral down](http://www.youtube.com/watch?v=UM1ZV5200S0)

## Features
 * basic mecanism to handle task and dependancies
 * a few task : dig, move, repeat, sequence
 * integration of mineflayer-navigate which can make the bot go to any position not too far away
 * building a spiral staircase
 * inventory management : equip,toss,list
 
### Roadmap

 * Doing more complicated things : getting any block, crafting things, getting anywhere by digging
 * Integrate other mineflayer functionnality : inventory, building
 * Improve/simplify the code
 
## Usage
	node index.js host port name password
 Commands :
 * dig r0,0,1
 * move r0,0,1
 * x+ x- z+ z-
 * dig forward r0,0,1 : dig the two block in front of you then move, works if there is gravel that fall
 * repeat &lsaquo;action&rsaquo; for example :
  * repeat dig forward r0,0,1
 * &lsaquo;action1&rsaquo; then &lsaquo;action2&rsaquo; : do first action then do the second one, for example :
  * x+ then z+
 * look for mob &lsaquo;mob&rsaquo;
 * stop repeat &lsaquo;action&rsaquo;
 * pos &lsaquo;player&rsaquo; : say the position of the other player if he is not too far away
 * move to me : make the bot come to you
 * move to position : use mineflayer-navigate to get to the position
 * spiral up : build an ascending spiral staircase
 * spiral down : build a descending spiral staircase
 * equip &lsaquo;position&rsaquo; &lsaquo;item&rsaquo; : equip item at position (for example hand)
 * toss &lsaquo;item&rsaquo;
 * list : list all items of the bot
