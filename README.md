# Getting Started with Create React App

**First run** ----> `npm install`
**Then** ----> `npm run start`
I hope you enjoy!

------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------


# Future Considerations


## `Additional Features`
### Features:
- Pagination: I would like to include pagination for locations.  I would also like to include arrows on the current pagination buttons
- Evolutions: I would add the level required for a pokemon to evolve, whether the pokemon needs to be traded, or the type of stone/happiness the pokemon needs in order to level. I would also like to include a picture of all evolutions instead of just the buttons.
- Generations: A nice addition would be including a picture of the pokemon that changes depending on the generation you would like to view the pokemon.  Changing generations would also change moves/stats/evolutions/etc.
- Variations: Now that the pokemon world has many locations each with different variations of pokemon, I would incorporate the different kinds of the same species of pokemon.  Unfortunately, the API was sending back 404 requests when I tried to access the variation API.
- Stats: I would like to add base stats to the pokedex so users can compare pokemon/evolution changes.
- Legendary/Mythical: Adding a mythical/legendary category would be easy, and it’s a nice change for users who are unfamiliar with all the pokemon.
- Nature: This is more of a nerd feature, I would like to add the natures that are most viable for a specific pokemon.  This feature would be tedious to incorporate, as there are no API’s with this information, but it helps competitive players.
- Male vs. Female Pokemon: Due to gender being on a scale of 0-8 with 8 being completely female and 0 being completely male, some kind of bar that changes depending on the number would be the best representation of gender.

## `Other Technologies`

I would incorporate redux to have a front end database storage.  This would make implementation of new features much cleaner and easier to incorporate.

## `Performance Concerns`

I feel like run time and memory usage can be optimized better.
- To start I feel like my fetch request hook is a little chaotic and can be refactored to be more efficient through the use of redux.
- Because I created my own functions in the components themselves, some of which include iteration, the performance and app runtime are not optimal.  This results in excess variables that may slow down the app, as well as a slower runtime because the functions need to run before displaying information.
- I use multiple states, which does not appear as clean as Redux.  Redux would be the quick fix for making the code look cleaner.
- I coded history as an object in order to prevent duplicates.  Looking back I think an array was the correct approach, however removing duplicates was taking a bit of time, so I decided to use the object approach.  Time seems to be the limiting factor for a lot of these features.


## `Visual Enhancements`

- Editing the background photo I used (of a pokedex) to not have a white background would make the website easier to work with.  Due to using an already created photo, I had to make the app over this background photo within a certain area.  I think a better approach would be to add nice photos occasionally instead of setting the entire background as one image.

- The webpage has a 2002 feel, it needs some touching up to make it appear more modern.
