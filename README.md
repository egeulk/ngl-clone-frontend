# NglClone Frontend
This is the frontend part of the ngl.link clone I've developed using Angular. Since they're a startup and actually have multiple employees I thought about just how hard it'd be write it from scratch. You can see the backend part from [here](https://github.com/egeulk/ngl-clone-backend)

## Features
-More Greenish interface, just because I prefer that color :)
-Works on every platform due to nature of Angular unlike ngl.link
-Various new templates, inspired by Windows 95 (which uses the css from one of my [projects](https://github.com/egeulk/angular-windows-95-pink)), Spongebob, Family Guy and a new one that can be customized by the colors users pick.

<table>
  <tr>
    <td><img src="readme-images/templateTwo.png" alt="Windows 95"></td>
    <td><img src="readme-images/templateThree.png" alt="Spongebob Template"></td>
    <td><img src="readme-images/templateOne.png" alt="Family Guy"></td>
    <td><img src="readme-images/templateFour.png" alt="Rainbow Template"></td>
  </tr>
</table>

-After downloading the generated image the service saves and remembers what template you've chosen, something that was lacking in ngl.link
-For feature parity sake and to prove I could've do it, a replica of the green template from ngl.link
-Authentication to view the dashboard, unlike ngl.link where everytime you download it there're no ways to login or sync the questions

# Running

## Running on Local

Before running, make sure you have the [backend](https://github.com/egeulk/ngl-clone-backend) installed and running.
Run `ng serve --ssl` for a dev server. SSL is required since the messaging between frontend and backend uses WSS to communicate if there're any new messages to load. Navigate to `https://localhost:4200/`. Since it uses a self-signed SSL make sure you accept the warnings.

## Running on Heroku

Before deploying make sure you've deployed the backend first and edit the environments/environments.prod.ts file to point to the URL containing the backend.
The rest follows a similar fashion to deploying apps on Heroku. You can connect a Github repository and make it deploy every commit or install the Heroku CLI and push your changes to heroku. More detailed instructions are [here](https://devcenter.heroku.com/articles/git)
