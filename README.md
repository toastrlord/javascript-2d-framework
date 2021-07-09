# JavaScript 2D Game Framework
This repository is all about building a framework for 2D games from the ground up using WebGL for graphics display, and JavaScript for the game logic. Currently, this repository features a version of Breakout, playable using the link below.

# Live Demo
https://toastrlord.github.io/javascript-2d-framework/

## How to Play
Use the left and right arrow keys to move the paddle at the bottom of the screen. Bounce the ball off the bricks to break them and increase your score.
If a ball passes below the screen, a new one will be served. Try to break as many of the bricks as you can!

# Running Locally
To run from your own machine, simply clone the repo, install npm, and execute `npm run start` in your console.

# Game Objects
A Game Object merely consists of a position (x and y), a unique ID, and a list of contained components. It also includes functions for adding/removing components, and an `update` function, which is called every frame. The time between the current and last frame is passed along as an argument to each component attached to the Game Object. By adding different components to a Game Object, you can modify the way it will behave!

## Components
Components require an `update` function as well as an `onCreate` function, which is called when first being added to a Game Object. If some cleanup is required when removed from a Game Object, they may also include an `onDelete` function.
Some example components used in the Breakout demo are:
* `Trigger`, which performs a callback when the supplied predicate is fulfilled
* `RectCollider`, which determines the bounds of rectangular objects and keeps track of their velocities
* `DrawRectangleComponent`, used to render rectangular objects
* `BrickComponent`, responsible for keeping track of how much health the bricks have

# Graphics
Currently, the primitive-shapes.js features three different drawable shapes:
1. Rectangles
2. Triangles 
3. Circles

Additionally, text can be rendered to the screen using the included 8x8 font using font-util.js.

## Shaders
Shaders are programs that convert a given input to graphical output- they are located in dist/shaders/
A GLSL shader program consists of two parts- a fragment shader, and a vertex shader. Two such programs (for a total of 4 .glsl files) are included, one for drawing primitive shapes and another for drawing textures (such as sprites from a spritesheet). At present, these shaders do not include any special effects.

webgl-utils.js includes several utility functions for compiling shaders and extracting the locations of the attributes and uniforms required for the program.
*Note that currently only vec2, vec3, and vec4 types are supported for uniforms! Other types will require the user to set them manually before using the shader!*

# Keyboard Input
Keyboard input is handled via key-manager.js. This includes utility functions for adding and removing different keybinds. The actions are stored in KeyBindContainer objects; currently, there is one such object for 'keydown' events, and another for 'keyup' events. 

When the key-manager module is loaded, it attaches an event listener directly to the window object, and dispatches the event to the appropriate key action, if one exists.

# Physics
Currently, collision-manager.js keeps track of two different categories of `Collider`s; moving objects and static objects. This is done for performance purposes- moving objects can only collide with static objects, and that neither static-static nor moving-moving collisions are accounted for. This allows for `O(m*n)` scaling in performance, instead of `O((m+n)^2)`, where `m` is the number of moving objects, and `n` is the number of static objects. Although this is still not ideal, it is sufficient for Breakout since only the ball is categorized as a moving object.

collision-manager.js also determines whether the collision is vertical or horizontal, and negates the proper velocity.

`Collider` components are responsible for tracking velocity, as well as moving the parent Game Object on each `update` call.

# How the Game Runs
The core of the game can be found in index.js, in the `start` function.
First, `webGLSetup` is called, which intializes the canvas, compiles the necessary shaders, and prepares the WebGL context.
Next, `loadAssets` is called, which prepares any necessary image assets, in this case the 8x8 font sheet.
`setupGame` is called, which creates all Game Objects required in the start of the game. Here, this creates the bricks, the paddle, ball, and sets up the player score.
Finally, `loop` is called, starting the game.

## The Game Loop
The game loop consists of two steps; `update` and `render`.
`update` keeps track of the time that has passed between the last frame and current one, and then calls `update` on each Game Object using this value. Collisions between objects are also checked here.
`render` flushes any primitive shape data to the canvas, and also draws text.
Once both steps are completed, `window.requestAnimationFrame` is called, using `loop` itself as an argument, starting the process over again.

