//On récupère le h2 #question
const question = document.getElementById("question");
const choicesList = document.getElementById("choiceContainer");
//On récupère les différents choix #choix-text dans un tableau

const imgContainer = document.getElementById("imgContainer");
//on récupère les éléments du 'HUD' (head-up display) :
//text qui indique 1/3 et le score + la progress bar
const progressText = document.getElementById("progressText");

const progressBarFull = document.getElementById("progressBarFull");
let choices;
let choice;

// (objet)
let currentQuestion = {};

//pour ajouter un délai : si le user a répondu, on crée un délai avant qu'il puisse répondre à nouveau (voy setTimeOut plus bas)
let acceptingAnwswers = false;

let score = 0;
let resultsPsychotech = {
  wad: 0,
  web: 0,
  game: 0,
  AI: 0,
};
//quelle question 
let questionCounter = 0;

//copie du set de questions : on prendra les questions depuis ce tableau et on les enlèvera pour être surs que la question ne soit pas posée plusieurs fois
let availableQuestions = [];

// set des questions (tableau d'objets)
let questions = [
    {
        question: "Select better design",
        choices : ["A","B"],
        answer: "1",
        group: "web",
        image: {
            source: "./images/ux/4question.png",
            width: "500px",
            height: "300px"
        }
    },
    {
        question: "You can easily motivate yourself even when you have a difficult task to perform",
        choices : ["Absolutely","It depends on my mood","Not really, but I try to","I'm not creative at all", "Not sure"],
        answer: "2",
        group: "wad",
        image: null,
    },

    {
        question: "Do you enjoy working in a team?",
        choices : ["Absolutely","It depends on my mood","Not really, but I try to","I'm not creative at all"],
        answer: "3",
        group: "game",
        image: {
            source: "./images/ux/question1a.png",
            width: "500px",
            height: "300px"
        }
    },


    

];

// CONSTANTES nécessaires pour le jeu lui-même

//Combien vaut une bonne réponse ?
const CORRECT_BONUS = 10;

//À combien de questions le user doit-il répondre pour compléter le quizz ?
const MAX_QUESTIONS = 3;

startGame = () => {

    questionCounter = 0;
    
    score = [];
    availableQuestions = [...questions]; //[...questions] permet de faire une full copie du tableau "questions" (si on fait juste "= questions" le lien sera référenciel !)
    console.log(availableQuestions);
    getNewQuestion();

};

getNewQuestion = () => {
    //s'il n'y a plus de question disponible, on renvoie vers une page de fin
    if(availableQuestions === 0 || questionCounter >= MAX_QUESTIONS){
        //on stocke le tableau de résultat final dans le local storage grâce à la méthode "setItem" (on caste le tableau en string grâce à la méthode JSON.stringify )
        
        localStorage.setItem('resultsPsychotech', JSON.stringify(resultsPsychotech));
        return window.location.assign("./end_psychotech.html");
    }
    choicesList.innerHTML = "";
    imgContainer.innerHTML = "";

    questionCounter++;
    //on set le "Question x/3 en fonction du questionCounter"
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    //On update la width de la progressBarFull en fonction de l'avancée en question
    // console.log((questionCounter/MAX_QUESTIONS)*100);
    // console.log(progressBarFull);

    // progressBarFull.style.width = (questionCounter/MAX_QUESTIONS)*100; => ne fonctionne pas pcq la valeur doit être en % !
    // progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    //random question => Math.floor(Math.random()* nb de question)
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    //on set la currentQuestion
    currentQuestion = availableQuestions[questionIndex];
    console.log(currentQuestion);
    //on remplacer l'innerText de la div "question" par la propriété "question" de la currentQuestion

    question.innerText = currentQuestion.question;
    if (currentQuestion.image != null){
        pImage = document.createElement("p");
        image = document.createElement('img');
        pImage.appendChild(image);
        image.src = currentQuestion.image.source;
        image.style.width = currentQuestion.image.width;
        image.style.height = currentQuestion.image.height;
        imgContainer.appendChild(pImage);


    }

    console.log(currentQuestion.choices);
    for (let index in currentQuestion.choices) {
        
        console.log(currentQuestion.choices[index]);
        choice = document.createElement('p');
        
        choice.innerText = currentQuestion.choices[index];
        choice.dataset.number = index;
        console.log(choice.dataset.number);
        choice.classList.add("choice-text");
        choicesList.appendChild(choice);
        choice.addEventListener("click", e =>{
            if(!acceptingAnwswers) return;
            acceptingAnwswers = false;
        
        const selectedAnswer = e.target.dataset['number'];
        console.log(selectedAnswer);
        if(selectedAnswer == currentQuestion.answer){
            resultsPsychotech[currentQuestion.group]++;

        } 
        // console.log(resultsPsychotech);
        setTimeout( ()=>{
            //     // selectedChoice.parentElement.classList.remove(classToApply);
            //     //quand on a répondu a une question, on en a une nouvelle
                
                getNewQuestion();
            }, 500);
        
        

        });
}
   
    //splice (where?, how many ?)
    availableQuestions.splice(questionIndex, 1);
    //to allow the user to answer when the question is loaded
    acceptingAnwswers = true;

};

       
startGame();