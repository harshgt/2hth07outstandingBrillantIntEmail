import { LightningElement } from 'lwc';

export default class QuizApp extends LightningElement {

    selected={};
    correctAnswer =0;
    isSubmitted = false;
    myQuestions=[
        {
            id:"Question1",
            question: "Which of the following is no the template Loop",
            answers: {
                a: "for:each",
                b: "iterator",
                c: "map loop"
            },
            correctAnswer: "c"
        },
        {
            id:"Question2",
            question: "Which of the invalid file in LWC Components Folder",
            answers: {
                a: ".svg",
                b: ".apex",
                c: ".js"
            },
            correctAnswer: "b"
        },
        {
            id:"Question3",
            question: "Which of the following is anotation in LWC",
            answers: {
                a: "@wire",
                b: "@aura",
                c: "@tester"
            },
            correctAnswer: "a"
        }

    ]


    get allNotSelected(){
        return !(Object.keys(this.selected).length === this.myQuestions.length)
    }

    get isScoredFull(){
        return `slds-text-heading_large ${this.myQuestions.length === this.correctAnswer? 
        'slds-text-color_success' : 'slds-text-color_error'}`;
    }

    changeHandler(event){
        console.log('value',event.target.value);
        console.log('name',event.target.name); 
        const {name,value} = event.target;
        //const name = event.target.name;
        //const value = event.target.value;
        this.selected = {...this.selected, [name]:value}
    }

    submitHandler(event){
        event.preventDefault();  //it refersh the page in form
        //this.selected = {"Question1":"a", "question2": "b", "Question3":"c"}
        let correct = this.myQuestions.filter(item=>this.selected[item.id] === item.correctAnswer);
        this.correctAnswer = correct.length;
        this.isSubmitted = true;
        console.log('thiscoreect andwe', this.correctAnswer);
    }

    resetHandler(){
        this.selected={};
        this.correctAnswer=0;
        this.isSubmitted = false;
    }



}