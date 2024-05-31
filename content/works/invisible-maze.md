---
title: "In-visible Maze"
date: 2024-03-01
type: works
image: "images/works/maze/maze_hero.jpg"
category: ["Tangible toy"]
---
#### In-visible Maze: playing a maze with hearing and touching

{{< youtube Jx5NucF_VCU "16:9" "100">}}

</br>

In-visible Maze is a digital maze game mainly played with audio and haptic feedback. Players can tilt the device to navigate an invisible maze. The purpose is to explore an interesting way to encourage people to use their senses except for the visuals.

</br></br></br>

#### Background

Although the immersion of the game and the importance of game accessibility are getting attention, visuals are still the main form of feedback for video games.  However, people have five essential senses to perceive this world: touch, sight, hearing, smell, and taste. I wonder if there is an interesting and casual way to train people to use their senses more comprehensively, so we can feel more in our daily.

To explore this idea, I designed a maze game called In-visible Maze. Except for the prototype of the device, user testing also be conducted to explore how different sensory feedback affects the game experience.

</br></br></br>


#### Design Goals

The ultimate goal is to design a maze toy that can be played only with audio and haptic feedback, without any visuals. It can be played by anyone and anywhere. In the first stage, I assumed that people with visual impairment have better acuity in hearing and touching, so I first tested with people with normal sight. To achieve this goal, I focused on the following aspects when designed:

##### Intuition of the operation

An intuitive operation process allows users to put less effort into learning how to use it, reducing barriers and increasing efficiency. In this case, inspired by the tangible design, I aimed to have a physical object that interacted with the users, mapping navigating a maze to users' operation that was natural to them, instead of playing a maze on the screen with buttons or a keyboard. Therefore, the users could more focus on their senses without being distracted by the operation of the device.

##### Game Feedback design

Game feedback is an important medium between the game and the users. In-visible Maze tries to reduce the visuals as much as possible and focuses on audio and haptic feedback. According to previous research, these two senses can affect users' experience and performance in various ways and with different combinations. I aimed to find a proper sound and haptic design to provide users with a good game experience.

##### Fun

In-visible Maze aims to enhance people's hearing and touch senses interestingly, so fun is important. Besides innovative gameplay, proper challenges for the users are also a key to providing fun. Therefore, I tried to find a balance between suitable challenge and frustration when users with normal sight can only rely on hearing and touch.


</br></br></br>



#### Design Process

The development of In-Visible Maze includes two parts:

- a physical prototype to make a functional game 
- a user testing to explore how different sensory feedback affects users

The design process started with background research and competitor analysis. By learning from the previous research and similar products, I designed it with the following features:

- A digital maze game with optional difficulty.
- Tilting the device to play, correlating users' hand movements with their movement in a maze.
- Portable and personal with headphones to make the experience more immersive.
  
</br>

##### Prototype

The physical device currently went through two main versions with some minor iterations:

{{< postimg url = "maze/prototype_v1.jpg" alt ="prototype" imgw ="100%" >}}
</br>
{{< postimg url = "maze/prototype_v2.jpg" alt ="prototype" imgw ="100%" >}}
</br>
{{< postimg url = "maze/process.png" alt ="prototype process" imgw ="100%" >}}
</br>

{{< postimg url = "maze/use_scene.png" alt ="prototype" imgw ="50%" >}}
<p style="text-align: center; margin-top: 10px">Usage scene</p>
</br>


##### User testing

Version 2 was used for the user testing. The purposes were:

- Understand which types of game feedback provided the better game experience to the users.
- Understand how different game feedback affects users' game performance.

To reduce the Novelty Effect and the testing cost, the test was designed by combining the between-subjects and within-subjects approach. There were 15 participants in total. They were divided into three different testing groups as the table below (5 participants/group):

{{< postimg url = "maze/test_groups.png" alt ="user test groups" imgw ="70%" >}}
</br>

A participant went through the operation part twice (pre-section and post-section) with different game feedback. To avoid the Learning Effect, the paths of the mazes were different in two sections.

{{< postimg url = "maze/testing_process.jpg" alt ="user test process" imgw ="100%" >}}
<p style="text-align: center; margin-top: 10px">The test process for one participant</p>



The test collected quantitative and qualitative data to understand the research topic better. The test included a series of operating tasks and a questionnaire. In operation tasks, the completion time, the number of hitting walls, and the number of hints used were collected by the device; and the questionnaire included questions answered by a 7-point Likert scale and open-ended questions. 

</br></br></br>



#### Design Outcome

</br>

##### Outcome 1: A device to play In-visible Maze

Version 2 was the latest version of In-visible Maze. It features with:

- Optional difficult levels and visible levels of the mazes.
- Tile the device to play the maze.
- Audio through headphones and vibration on the hands as the main game feedback.

Based on the testing, it's too challenging for people with normal sight to navigate the complex maze with this device completely without seeing the path, so there is a hint function for the users to see the path temporarily if they want.

{{< postimg url = "maze/prototype_v2final.jpg" alt ="outcome" imgw ="100%" >}}
</br>
{{< postimg url = "maze/v2_exploded.jpg" alt ="outcome" imgw ="100%" >}}
</br></br></br>

##### Outcome 2: How sensory feedback affects users' game experience and performance

</br>

##### About game experience

To assess the participants’ game experience, the participants were asked to answer the related questions using a seven-point Likert scale ranging from strongly disagree to strongly agree. The final score of each aspect was the average score from the participants in the same group, with higher scores indicating more favorable outcomes.

Some questions were from the short version of the Game User Experience Satisfaction Scale [(GUESS-18)](https://uxpajournal.org/validation-game-user-experience-satisfaction-scale-guess/) and the other were modified to fit the context of the In-visible Maze.

{{< postimg url = "maze/experience_result.png" alt ="outcome" imgw ="100%" >}}
<p style="text-align: center; margin-top: 10px">Result scores of the game experience in different aspects.</p>

The right chart in the middle row: Compared to the first version, I think this version is more fun. This question was only asked in the post-section, which asked the participant to play without visual feedback. The purpose was to verify the question "I think the game is fun" and avoid the Novelty Effect.

According to the results, here were brief conclusions of the findings from different aspects:

- **Game feedback design:** Playing the maze with only audio feedback had a positive impact, revealing comparable effectiveness to playing the maze with only visual feedback.
- **Plyability:** Playing solely with visual feedback offers better playability compared to using audio and vibration feedback. When the post-section of each group was compared, the result indicates that participants were more used to using hearing than touch to help them navigate a maze with minimum visual cues.
- **Fun:** All the post-sections received higher scores than the pre-sections, indicating that the participants found playing mazes mainly with audio or/and vibration feedback more- enjoyable than playing with only visual feedback. 
- **Creative freedom:** Participants more actively imagine the path in mind when navigating mazes with audio and vibration feedback, compared to using only visual feedback.
- **Immersion:** Compared to playing a maze solely with visual feedback, using audio and vibration feedback without visual cues enhances the immersion of walking in the maze. 

</br></br>

##### About game performance

The data on game performance included the completion time, the number of hitting walls, and the number of hints used. Due to a system error, although there were 15 participants in total, the system recorded 4 participants' data in each group during user testing, resulting in a total of 12 data sets. The value of the data that was outside three times the standard deviation was considered an outlier and should be removed. The final results are presented as the mean.

{{< postimg url = "maze/perormance-1.png" alt ="outcome" imgw ="100%" >}}
<p style="text-align: center; margin-top: 10px">The completion time when playing mazes in different difficulty levels.</p>
</br>

{{< postimg url = "maze/perormance-2.png" alt ="outcome" imgw ="100%" >}}
<p style="text-align: center; margin-top: 10px">The number of hitting walls when playing mazes in different difficulty levels.</p>
</br>

{{< postimg url = "maze/perormance-3.png" alt ="outcome" imgw ="100%" >}}
<p style="text-align: center; margin-top: 10px">The number of hits used when playing mazes in different difficulty levels.</p>


According to the results, here were brief conclusions of the findings about how different feedback design affects users' performance:

- Most of the values under the same testing conditions increased with the difficulty of the maze, suggesting that the mazes were appropriately designed with difficulty levels.
- Compared to Groups A (audio feedback) and C (audio and vibration feedback), vibration feedback could be more helpful for participants to navigate the maze when the path was not complicated.
- Combining audio and vibration feedback is more helpful for navigating a maze as it becomes more complex, compared to using audio or vibration feedback alone.

</br>

##### Conclusions

1. In terms of game experience, playing a maze using In-visible Maze with only audio feedback provided the best overall game experience. 
2. Concerning game performance, participants achieved their best results when playing with vibration feedback alone at easy and medium levels. When the maze became hard level, the combination of audio and vibration feedback proved to be the most effective method for navigating a maze without relying on visuals.
3. For both game experience and performance, the combined audio and vibration feedback did not necessarily outperform individual feedback modes, even though they were effective when used separately.

</br></br></br>

to be continued.....
