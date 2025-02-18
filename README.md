# Three.js Transparency Issue Example

This repository contains a minimal example that replicates a transparency issue in Three.js.

- With standard settings, looking through the yellow front plane, the opaque red plane in the background is visible, but the transparent blue plane in the middle is not.
  <img src="./preview1.png"/>
- If `depthWrite` is disabled on the front plane, the blue plane appears as if it were in front of the yellow plane. (The opacity has been increased to 1 to highlight this issue).
  <img src="./preview2.png"/>

## Setup

Download [Node.js](https://nodejs.org/en/download/).

Run the following commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:5173
npm run dev

# Build for production in the dist/ directory
npm run build
```


## Solution - Points to Consider

1) Material Types Matter (?) 

ThreeJS batches material types together when rendering. So for (yellow / blue / red) planes make them all the same material (ie 'MeshPhysicalMaterial') to avoid any issues behind the scenes there. This might apply to groups as well, which is something to consider if you're using groups (untested yet) 

2) depthWrite: true/false

depthWrite determines whether an object writes to the depth buffer, which is of course important for rendering other objects behind transparent objects. So for transparent materials - disable it (so objects can be drawn behind them). For opaque materials - enable it (so objects aren't drawn accidentally on top)

3) transparent: true

This just needs to be true for the transparent materials. 
Set to false for the opaque material (it will mess things up if its true on the opaque red material)
