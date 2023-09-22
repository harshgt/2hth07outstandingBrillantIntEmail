import { LightningElement } from 'lwc';

export default class ParentLWCForPractice extends LightningElement {
    
    setCounter = 0;

    counterHandler(event){
        this.setCounter = parseInt(event.target.value);
    }

    set100AddCounter(){
        this.template.querySelector('c-child-l-w-c-for-practice').maximizeCounter();
    }
    








    /*count = 0;
    subHandler(){
        this.count = this.count - 1;
    }

    addHandler(){
        this.count = this.count + 1;
    }

    mulHandler(event){
       const valueForMul = event.detail;
        this.count = this.count * valueForMul;
    }

    mulsecHandler(event){
        const valuForMulSec = event.detail;
        this.count = this.count*valuForMulSec;
    }

    zeroHandler(event){
        const valuForZero = event.detail;
        this.count = this.count*valuForZero;
    }*/
}