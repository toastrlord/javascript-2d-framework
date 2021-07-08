# JavaScript 2D Game Framework
This repository is all about building a framework for 2D games from the ground up using WebGL for graphics display, and JavaScript for the game logic. 

# Live Demo
https://toastrlord.github.io/javascript-2d-framework/

# Game Objects

# Graphics

## Shaders

## Drawing Objects on the Screen

# Keyboard Input
Keyboard input is handled via key-manager.js. This includes utility functions for adding and removing different keybinds. The actions are stored in KeyBindContainer objects; currently, there is one such object for 'keydown' events, and another for 'keyup' events. 

When the key-manager module is loaded, it attaches an event listener directly to the window object, and dispatches the event to the appropriate key action, if one exists.

# Physics

# Update Loop