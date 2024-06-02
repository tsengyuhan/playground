---
title: "WAVE MACHINE"
#date: 2022-06-03
date: 2004-01-01
type: works
image: "images/works/wave-machine/wave-machine-heroimg.JPG"
category: ["Interactive installation"]
---
#### Wave Machine: a kinetic sculpture

{{< youtube nBlCu2ZVkhw "16:9" "100">}}

</br>

This is a kinetic sculpture consisting of 16 units that can move up and down. By combining various materials and mediums, different ideas can be presented.

- **Size** : 31 x 30 x 20 cm 

- **Hardware** : PC, headphones, custom PCBs, stepper motors, motor drivers
  
- **Software** : TouchDesigner, Spotify, Fusion360, Illustrator, KiCad, CopperCAM, ArduinoIDE

- **Material** : Plywood, metal sheet, arcylic

- **Tool** : Laser cutter, Milling machine, 3D printer, EDM machine

</br></br>

#### Design Concept

Inspired by an amazing machine, {{< hightlight link = "https://www.nervoussquirrel.com/duckmachine.html" >}} the Mechanical Duck sculptur {{< /hightlight >}} by David Cranmer, this project aims to design a flexible platform with a similar structure. This platform will enable artists to attach various mediums to showcase their concepts. There is a user interface to control each unit individually and manually, including the speed, the moving direction, and the length of movement (steps). The machine can also run with an automatic program.

It is also my final project for {{< hightlight link = "https://www.aalto.fi/en/minors/digital-fabrication-minor" >}} Digital Fabrication {{< /hightlight >}}, which is a minor at Aalto University operated by {{< hightlight link = "https://fablab.aalto.fi/" >}} Aalto Fablab {{< /hightlight >}}.


</br>

There is a hole on the top of each unit to allow the user to attach different materials by screw and nut. Here are some examples:

##### Gesture

The gesture is an important way for humans (maybe also for other animals) of showing their statement and spirit. The sculpture acts like a crowd trying to put out their voice.

{{< postimg url = "wave-machine/wave-machine-gesture.jpg" alt ="gesture version" imgw ="100%" >}}

</br>

##### Mirrors

A mirror is a tool for people to see themselves. The sculpture moves multiple little mirrors randomly to create a chaotic and fragmented feeling, making the audience part of this sculpture.

{{< video src = "wave-machine/wave-machine-mirrors.mp4" type = "video/webm" preload = "auto" videow = "100%" >}}

</br>

##### Flexible fabrics and projection

I am also curious about the combination of the mechanical structure and the soft material, so I tried to attach a very thin and stretchable fabric to the machine, projecting my other project: {{< hightlight link = "https://yuhantyh.gitlab.io/playground/works/artifact-generator/" >}} Artifact Generator{{< /hightlight >}} on the fabric.


{{< video src = "wave-machine/wave-machine-fabric.mp4" type = "video/webm" preload = "auto" videow = "100%" >}}


</br></br></br>

#### Used Techniques

The machine is controlled by a TouchDesigner program through serial communication. Each unit has a unique ID so the program can control specific unit's movement precisely.

Each unit consisted of a stepper motor, plastic frames, metal plates, and a custom PCB. The plastic frames were made by laser cutter and 3D printer; the metal parts were cut by EDM machine. The custom PCB, which was designed by KiCad and produced by milling machine, integrates a microcontroller ATtiny412 and a motor driver circuit.

{{< video src = "wave-machine/wave-machine-unit.mp4" type = "video/webm" preload = "auto" videow = "80%" >}}


 You can find the entire producing process and details of this machine {{< hightlight link = "https://yuhantyh.gitlab.io/digital-fabrication/final-project/final-project/" >}} here {{< /hightlight >}}.