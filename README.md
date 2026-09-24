# Hex-2048
## The 2048 Game, but Hexagonal!
![Cover Image](https://raw.githubusercontent.com/Cesium72/Hex-2048/refs/heads/main/README_cover.png)
## Live Preview
The whole thing is static, so it is all visible on [github pages](https://cesium72.github.io/Hex-2048)
## Features
- Essential Gameplay
- Saving Game and High score locally
- Mobile and keyboard support
## Some Questions (And Answers)
### What is this?
This is like the classic number game, 2048, but instead of a square, it's a hexagon! When you make a move, (for example, right), all the tiles will move as far to the right as they can. If two tiles with the same number hit each other, the combine into the next one up! If you haven't played classic 2048 before, go to [play2048.co](https://play2048.co) to try it first.
### How do I control it?
To control the game with the keyboard, use the keys ZAWEDX (or the equivalent for your keyboard layout). They kind of make a hexagon around the "s" key. On a touchscreen, you can swipe in the direction to go. Just remember that the pieces travel toward corners, not edges like in regular 2048.
### Hey! The pieces aren't moving properly!
Yes, they are. The movement of the pieces can seem a little counterintuitive, such as pices not going all the way down when down-left is pressed, but I can promise you that the movement is working just as it is intended to. The pieces will move in __straight lines__ for as far as they can. This means that down-left makes the pieces move, well, down-left as far as they can go. Not down. Not left. Down-left.
### How do I win?
This seems to be a little easier than regular 2048, so you won't get notified if you win. I find 4096 to be a reasonable goal. As for strategy? That's for you to figure out :)
## Acknowledgements
- Inspired by the original 2048: [play2048.co](https://play2048.co)
- IDK, not really anything else. No libraries were harmed in the making of this project.