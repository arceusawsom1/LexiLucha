import { Container, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AboutMe = () => {
    return(
        <Container sx={{textAlign:"left"}}>
            <Typography variant="h1">LexiLucha</Typography>
            <Typography sx={{my:2}}>{para1}</Typography>
            <Typography variant="h2">Why did I make it</Typography>
            <Typography sx={{my:2}}>{newPara}</Typography>
            <Typography variant="h2">The timeline of the project</Typography>
            <Typography variant="h3">The beggining</Typography>
            <Typography sx={{m:2}}>{para2}</Typography>
            <img src="images/readme1.png" style={{width:"100%",...shadowProp}}/>
            <Typography sx={{my:2}}>{para3}</Typography>
            <Typography variant="h3">Creating the prototype</Typography>
            <Typography sx={{my:2}}>{para4}</Typography>
            <img src="images/readme2.png" style={{width:"100%",...shadowProp}}/>
            <Typography sx={{my:2}}>{para5}</Typography>
            <Typography sx={{my:2}}>{para6}</Typography>
            <Typography sx={{my:2}}>{para7}</Typography>
            <Typography sx={{my:2}}>{para8}</Typography>
            <Typography sx={{my:2}}>{para9}</Typography>
            {renderList(list1)}
            <Typography sx={{my:2}}>{para10}</Typography>
            <Typography sx={{my:2}} variant="h3">The final touches</Typography>
            <Typography sx={{my:2}}>{para11}</Typography>
            <Typography sx={{my:2}}>{para12}</Typography>
            {renderList(list2)}

            <Typography sx={{my:2}}>{para13}</Typography>
            <Typography sx={{my:2}} variant="h2">Technologies used</Typography>
            <Typography>For a full list of technologies used, go <Link to="https://github.com/arceusawsom1/LexiLucha#technologies-used">Here</Link></Typography>

            
        </Container>
    )
}
export default AboutMe;
const renderList = (items:Array<String>) =>{
    return (
        <List>
            {items.map((item, index)=>
                <ListItem key={index}>
                    <ListItemText primary={item} sx={{textAlign:"center"}}/>
                </ListItem>
            )}
        </List>
    )
}
const shadowProp={boxShadow:"1px 1px 22px 0px rgba(0,0,0,0.75)"};
const newPara = `I embarked on this web development project with the primary goal of delving into new tools and technologies within the realm of web development, notably Socket.IO and TypeScript. However, throughout the journey, I found myself immersing in a plethora of other technologies, including Kotlin, GitHub Actions, Docker, Framer Motion, and Material-UI. Of course there were some tools that I have allready used plenty, but could refresh my skills on such as MySQL and SpringBoot.`
const para1 = `LexiLucha, a platform where users can hone their Language Other Than English (LOTE) skills, emerged as a dynamic space where individuals can engage in friendly competitions with their peers. Leveraging real-time communication enabled by sockets, users can race against each other to translate simple phrases and questions from languages such as Spanish, German, and Vietnamese. This project not only served as a playground for learning but also as a practical application of these technologies in a meaningful and engaging context.`
const para2 = `My primary goal of this project was to improve my React and front-end skills. I wanted to create a project with a functional and easy-to-use UI. The first page I created was the main game page, where the site gives you a phrase and you are provided with a number of words to choose from to translate the phrase.`
const para3 = `I aimed for the page to be intuitive so that users would not need a guide or tutorial to figure out how to use it. I had some friends and family test the interface locally, and people were generally fans, which was exciting!`
const para4 = `The next major goal was to finish the main game loop that I had in my head, which included being able to choose a language, join a game, and finish a game (seeing a leaderboard update along the way).`
const para5 = `With the main game loop ready, I wanted to deploy the project so that I could share it with people around me and start collecting feedback. But I didn’t want to hastily throw together a manual deployment like I had done in the past, so I took a little detour from my development journey.`
const para6 = `At this point, all I knew about DevOps was a little bit of Docker. Armed with this knowledge, I started by creating a Docker container for each of my services (React frontend, Spring backend, MySQL database) and then a Docker Compose file to tie them all together.`
const para7 = `Once I had the compose working locally, I set up a GitHub Actions workflow to take my main branch and deploy it to my personal homelab. After adding some (very frustrating) configuration to my reverse proxy server, it was all working. This may seem like a short couple of paragraphs, but it actually took many hours. Back to development!`
const para8 = `One major benefit of having deployed the application is that I was now able to distribute the prototype to my friends and family and collect feedback. This was important given the one-man nature of the project, and they had no shortage of feedback to provide.`
const para9 = `For the main game loop, there were two main features that people really wanted were:`
const list1 = [`A time limit for each question, increasing the pace of the game`,`A way to see the answers to incorrectly answered questions` ]
const para10 = `Both were relatively easy to implement, and people loved the changes. I also observed that although people somewhat enjoyed playing the game itself, there was nothing incentivizing them to keep coming back to the game. To address this, I decided to implement gamification.`
const para11 = `I had plans to add a shop to customize your profile, and profiles, for that matter. Completing tasks like achieving first place or maintaining a daily streak would reward players with credits that they could use to buy cosmetic items.`
const para12 = `This required a lot of additions to both the backend and frontend, including:`
const list2 = [`Account registration and login functionality`,`Tracking completed games (this information used to be temporary)`, `a credit system`, `an in-game shop`,`Functionality to apply/choose upgrades`,`Achievements to earn upon completing games`,`Incorporating a navigation bar (given all the new pages)`,`General improvements to the front-end styling`]
const para13 = `There were a few silly mistakes made during this process that increased development time, mostly relating to having unnecessary constraints in my database. However, eventually, all of these changes were made, and the project became what you see today.`
