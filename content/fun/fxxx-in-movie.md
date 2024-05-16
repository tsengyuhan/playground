---
title: "How many FxCK in a Movie"
date: 2023-03-02
type: fun
image: "images/fun/fxck-movie/movie-hero.jpg"
category: ["Interactive website"]
---
#### Data visualization and analysis practise

</br>

{{< video src = "fxck-movie/fxck_movie_demo.mp4" type = "video/webm" preload = "auto" videow = "100%" >}}

</br>

<h4> 
<a href="https://tsengyuhan.github.io/fxck-in-movie/" target="_blank">🎬 <u>Live Demo</u> 🎬 </a>
</h4>

(please open on a PC)

- Website: HTML, CSS, JavaScript(d3.js)
- Data processing: Python

</br>

#### Background

I found an interesting dataset about many movies and how many FxCKs have been used in these movies. Profanity in films has often been controversial but sometimes makes the audiences feel closer to the story. Therefore, I was curious whether the number of FxCKs in a movie was related to its rating and what other information about a movie might be associated with this word? 

The data used in this project were from [the IMDb database](https://www.imdb.com/interfaces/)(for general movie information) and [List of films that most frequently use the word F*](https://www.kaggle.com/datasets/devrimtuner/list-of-films-that-most-frequently-use-the-word)(for the Fxck counting data). The purpose is to explore different ways to present data visually and find some interesting facts from the data.

{{< postimg url = "fxck-movie/data_integration.png" alt ="combine multiple datasets" imgw ="100%" >}}

</br>

This is a final project for a course about data visualization. I learned about visualizing data both theoretically and technically. The main tools were Python and [d3.js](https://d3js.org/).

</br></br>

#### Findings

Based on these data, I tried to find some trends and associations between the amount of FxCKs and the movie's attributes. However, the project was not designed carefully and there were limits and flaws in the datasets, so just for reference and fun 😆

- More FxCKs in a movie don't mean a higher rating because ratings 6-9 include both the highest word counts and lowest word counts.
- If a rating higher than 5 means a movie is good, then this profanity might be helpful in some cases, because the Top 9 highest word counts movies were rated from 6 to 8.2 (No.10 rating data is missing).
- [The movie version of Swearnet](https://www.imdb.com/title/tt2380564/) holds the record for the most uses of the word "FxCK" in a film. This means its writer Mike Smith wrote more FxCKs in one movie than some writers wrote in three movies, such as Paul Laverty, Quentin Tarantino, Kevin Smith, and Seth Rogen.

</br></br>

##### If you like to know more about this projcet
</br>
<h5> 
<a href="https://github.com/tsengyuhan/fxck-in-movie" target="_blank">🎬 <u>Project Repository</u> 🎬 </a>
</h5>