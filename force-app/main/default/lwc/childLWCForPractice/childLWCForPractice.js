import { LightningElement, api } from 'lwc';

export default class ChildLWCForPractice extends LightningElement {

     @api count=0;

    @api maximizeCounter(){
        this.count=this.count+100;
    }

  /*  
    subHandler(){
        this.dispatchEvent(new CustomEvent('substract'));
    }

    addHandler(){
        this.dispatchEvent(new CustomEvent('addition'));
    }

    mulHandler(event){
        const valueForMultiply = event.target.value;
        this.dispatchEvent(new CustomEvent('multiply', {
            detail : valueForMultiply
        }))
   
    }

    mulsecHandler(event)
    {
        const valueForMultiplySec = event.target.value;
        this.dispatchEvent(new CustomEvent('multiplysec', {
            detail:valueForMultiplySec
        }))

    }

    zeroHandler(event){
        const valueForZero = event.target.value;
        this.dispatchEvent(new CustomEvent('zerosec', {
            detail:valueForZero
        }))
    }*/
}