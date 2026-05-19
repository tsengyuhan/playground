---
title: "WAVE MACHINE"
date: 2022-11-10
type: works
image: "images/works/wave-machine2/wave_machinev2_hero.jpg"
category: ["Interactive installation"]
---

#### Wave Machine v.1: a kinetic sculpture

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

Inspired by an amazing machine, {{< hightlight link = "https://www.nervousquirrel.com/duckmachine.html" >}} the Mechanical Duck sculpture {{< /hightlight >}} by David Cranmer, this project aims to design a flexible platform with a similar structure. This platform will enable artists to attach various mediums to showcase their concepts. There is a user interface to control each unit individually and manually, including the speed, the moving direction, and the length of movement (steps). The machine can also run with an automatic program.

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

{{< postimg url = "wave-machine/unit_assemble.jpg" alt ="unit structure" imgw ="80%" >}}

- White part: 3mm transparent acrylic by laser cutting
- Red part: 2mm matel sheet by EDM machine
- Yellow part: 3D printing
- a: M3 5mm screw
- b: M2 8mm screw
- c: M3 8mm screw
- d: M3 20mm screw
  
</br>

{{< video src = "wave-machine/wave-machine-unit.mp4" type = "video/webm" preload = "auto" videow = "80%" >}}


 You can find the entire producing process and details of this machine {{< hightlight link = "https://yuhantyh.gitlab.io/digital-fabrication/final-project/final-project/" >}} here {{< /hightlight >}}.

</br></br></br>

---

#### Wave Machine v.2: let's dance with music

{{< youtube 0qLS-spX0bY "16:9" "100">}}

</br>

This installation performs with the music selected by the audience. The audience can enjoy the music from the headphones and the movement of the mechanism structures. 


- **Size** : 31 x 30 x 20 cm 

- **Hardware** : PC, headphones, custom PCBs, stepper motors, motor drivers
  
- **Software** : TouchDesigner, Spotify, Fusion360, Illustrator, KiCad, CopperCAM

- **Material** : Plywood, metal sheet, arcylic, mirror

- **Tool** : Laser cutter, Milling machine, 3D printer, EDM machine

</br></br></br>

#### Design Concept

This project is the second version of Wave Machine. It mainly explores two ideas: 

- achieving audio visualization by physical machines, and
- the cooperation between mechanical sound and human music.
  
I am fascinated with the sound made by the movement of the mechanical structure. When these sounds follow the rhythm of a song, the outcomes become more meaningful.


The audience first wears the headphones and selects a song from Spotify. When the song starts, the 16 objects attached to the machine move up and down according to the rhythm of the song. One interesting thing is that only the audience who is wearing the headphones understands why the machine moves like that 😎

{{< postimg url = "wave-machine2/concept.jpg" alt ="design concept" imgw ="100%" >}}

</br>

{{< postimg url = "wave-machine2/img2.jpg" alt ="work in the exhinition" imgw ="100%" >}}
</br>

{{< postimg url = "wave-machine2/img1.jpg" alt ="mechnical parts" imgw ="100%" >}}
</br>

{{< postimg url = "wave-machine2/img5.jpg" alt ="whole machine" imgw ="100%" >}}
</br>



##### About long-leg cats

Each attached cat-like creature has a pair of sexy feet, which are stretchable with the up-and-down movement. The face is a mirror that the audience can see their partial face when facing these cats. The design is to make the audience part of this performance, trying to create an interesting interaction between the audience and the machine. Each cat with movable feet was specifically designed, so it was 3D-printed at once.

</br>
{{< postimg url = "wave-machine2/img6.jpg" alt ="cat with sexy legs" imgw ="100%" >}}
</br>
{{< postimg url = "wave-machine2/img3.jpg" alt ="cat with sexy legs" imgw ="100%" >}}




</br></br></br>

#### Used Techniques

The machine used TouchDesigner to process the computer's internal audio and send the digital signal to the machine by serial communication. The machine consists of 16 units. Each unit is a stepper motor controlled by an ATtiny412. The whole circuit is integrated into a custom PCB designed by KiCad and manufactured by a milling machine.

</br>
{{< postimg url = "wave-machine2/process-2.jpeg" alt ="making process" imgw ="80%" >}}
</br>
{{< postimg url = "wave-machine2/process-1.jpeg" alt ="making process" imgw ="80%" >}}

</br></br></br>
