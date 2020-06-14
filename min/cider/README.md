# WEBSF.CIDER

## What is this?
CIDER (**C**ross **I**nstance **D**ata **E**xchange**r**) is a JavaScript module for peer-to-peer connection, which is built on WebRTC, WebSocket, vanilla TCP and vanilla UDP. It will try to use all methods available in the environment.

## What does it do?
The core of this toolchain is a framework that helps instances connect to other instances to form a peer-to-peer connection, and tries its best to connect to or store info of at least 20 peers to form a P2P network. Routing is made available by Kademlia.

Default applications provides *bridging*, text-message delivering, media call delivering, file transferring and torrent indexing. Also, it provides proxied request delivery capability.

## Dependencies
* websf.bridge.sockets
* CryptoJS

## Specifications
### Connection establishment
PS: The peer who wants to establish a connection is called ***caller***, and the peer who receives establishments is called ***callee***.

### Segments

## Components
### Core
#### Segment
This component handles packing and unpacking CIDER segments.

#### Routing

#### WebRTC
This component handles WebRTC connection establishments.

#### WebSocket

#### TCP

#### UDP

### App
