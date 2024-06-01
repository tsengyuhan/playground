---
title: "LET'S DANCE WITH MUSIC"
date: 2022-11-10
type: works
image: "images/works/wave-machine2/wave_machinev2_hero.jpg"
category: ["Interactive installation"]
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

This project is the second version of {{< hightlight link = "https://yuhantyh.gitlab.io/playground/works/wave-machine/" >}} Wave Machine {{< /hightlight >}}. It mainly explores two ideas: 

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