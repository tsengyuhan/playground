---
title: "ARTIFACT GENERATOR"
date: 2022-04-22
type: works
image: "images/works/artifact/artifact-heroimg.png"
category: ["Projection mapping"]
---
#### Artifact Generator: an interactive sculpture

{{< youtube CR-ZAs-5Gag "16:9" "100">}}

</br>

In this interactive installation, the participant can rearrange their face, then project this living face on the sculpture. This work tries to present the indescribable feeling from the digital artiface through an interesting interaction.

- **Size** : 55 x 43 x 90 cm
  
- **Hardware** : PC, projector, webcam
  
- **Software** : TouchDesigner, FaceOSC.app
  
- **Material** : Recycled bottles, plastic bags


</br></br>

#### Design Concept

Inspired by the rapid development of artificial intelligence and AR/VR technology, which both try to combine some properties of humans into artifact (most are digital) products. I look forward to the development of this trend, while sometimes feeling the discord from these digital artifacts. This work tries to express my own ambiguous feelings to the participants with an interesting way.

This project allows the participants to use their faces as the elements to create a "motion skin" for the sculpture of this work. 

1. The participants see their faces on the interface.
2. They can arrange their face randomly on the screen. When they are satisfied with the facial arrangement, they can record a 10-second video of the facial movement.
3. After the record is finished, the video will be projected on the sculpture.

 {{< postimg url = "artifact/artifact_concept.jpg" alt ="sketch of the work" imgw ="80%" >}}
</br>


##### Artifact

***"An artifact,or artefact, is a general term for an item made or given shape by humans, such as a tool or a work of art, especially an object of archaeological interest."*** (by [wikipedia](https://en.wikipedia.org/wiki/Artifact_(archaeology)))



##### The Sculpture

In this project, the sculpture is one of the materials to create an artifact. The sculpture was made of lots of recycled bottles and plastic bags, forming a modern fossil.

{{< video src = "artifact/artifact-sculpture.mp4" type = "video/webm" preload = "auto" videow = "100%" >}}

</br>

##### Human's face

Participants' faces are another material used to create the artifact. The application can catch the user's eyes, mouth, nose, and skin to create a new texture for the artifact.

{{< video src = "artifact/artifact-face.mp4" type = "video/webm" preload = "auto" videow = "100%" >}}



</br></br></br>

#### Used Techniques

The whole system was developed in TouchDesigner, including the user interface and projection mapping. Regarding face recognition and detection, TouchDesigner used OSC to receive the data from [FaceOSC](https://github.com/kylemcdonald/ofxFaceTracker/releases), which can recognize the raw point positions of people's eyes, mouths, and noses.

</br></br>