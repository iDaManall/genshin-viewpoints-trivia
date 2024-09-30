# Web Development Project 2 - *Genshin GeoGuessr*

Submitted by: **Samiul Saimon**

This web app: **Guess the Genshin Nation based on the viewpoint name, viewpoint description, and viewpoint background image!**

Time spent: **8** hours spent in total

## Required Features

The following **required** functionality is completed:

- [X] **The title of the card set and some information about it, such as a short description and the total number of cards are displayed**
- [X] **A single card at a time is displayed, only showing one of the components of the information pair**
- [X] **A list of card pairs is created**
- [X] **Clicking on the card shows the corresponding component of the information pair**
- [X] **Clicking the next button displays a random new card**

The following **optional** features are implemented:

- [X] Cards contains images in addition to or in place of text
- [ ] Cards have different visual styles such as color based on their category
  - [X] *The background image changes when the card changes*

The following **additional** features are implemented:

* [X] Had a JSON file for the data by extracting data from a related website through a thoroughly modified script (took way too long). This resulted in a list of dictionaries. 

## Video Walkthrough

Here's a walkthrough of implemented required features:

![viewpoint_trivia](https://github.com/user-attachments/assets/f5742382-7e63-47ca-8811-9f27a6adde0b)


<!-- Replace this with whatever GIF tool you used! -->
GIF created with Mac Recorder + ezgif converter  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

The project took much longer than expected because of my persistence in figuring out how to use the data from a website without manually downloading or typing it all. I have never really used a non-manual approach hence why everything was new and slow. Originally, I started off with one website but the image urls weren't working and were base64. Then I switched plans to another website which also included viewpoint descriptions that I could utilize. So I spent a few hours figuring out how to implement a proper script to get this data and paste it into a JSON file, and just when I was about to give up it finally worked. After that the styling was a bit of a challenge as I wanted to change the background of the website instead of just a part of the card. So I had to change the styling inline in App.jsx instead of the css file. Overall, I'm satisfied with the results even if it took a while. 

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
