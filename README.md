# networked-aframe-synced-stereo-360-video-example

[A-Frame](https://aframe.io) example using [networked-aframe](https://github.com/networked-aframe/networked-aframe) with a custom component for roughly synchronized multi-user stereo 360 video viewing.

This example was built with [Networked-A-Frame](https://github.com/networked-aframe/networked-aframe), a web framework for building multi-user virtual reality experiences. Works on Vive, Rift, desktop, mobile platforms.

The approach taken here is to statically define a singleton video as part of the scene and expose the video's transport characteristics with a custom component `video-src-transport`, so that networked-aframe can handle the data synchronization.

When trying to synchronize video position, care needs to be taken to avoid repeatedly trying to match exactly, but always failing to keep up due to buffer fetch, etc.  Improvements to the crude algorithm are clearly possible; during normal operation, video position updates should be quite predictable.

Creating singleton objects in networked-aframe is not yet encapsulated in a component; the crude approach taken here is to define the singleton(s) by using an explicit `networkId` value and no initial owner (more specifically, an initial `owner` that is invalid), along with JavaScript that waits a little bit to see if a client is the only/first, and if so then takes ownership of the singleton(s).

In order to play the stereo 360 video back correctly, rather than making separate videospheres for each eye, this example uses a single videosphere with a custom shader that presents the appropriate portion of the video to the proper eye when required.

(Updated to place the video at eye height when in VR, and also to sync the shader used so that both mono and stereo 360 can be supported, for example.)

Enjoy!
- M