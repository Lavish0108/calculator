class Calc{
    constructor(previousDisplay,currentDisplay){
        this.previousDisplay= previousDisplay;
        this.currentDisplay= currentDisplay;
        this.clear();
    }

    clear(){
        this.previous= "";
        this.current="";
        this.operation=undefined;
    }

    delete(){
        this.current=this.current.toString().slice(0,-1);
    }
    
    operate(operation){
        
        if(this.current==='') return;
        if(this.current!=='') {
            this.compute();
        }
        this.operation=operation;
        this.previous=this.current.toString();
        this.current="";
    
    }

    appendNumber(number){
        if (number==='.' && this.current.includes('.')){
            return;
        } 
        this.current=this.current.toString() + number.toString();

    }

    compute(){
        let answer;
        const past= parseFloat(this.previous);
        const now = parseFloat(this.current);
        if(isNaN(past)||isNaN(now)){
            return;  
        } 
        switch(this.operation){
            case'+':
                answer=past+now;
                break;
            case'-':
                answer=past-now;
                break;
            case'*':
                answer=past*now;
                break; 
            case'/':
                answer=past/now;
                break;
            default:
                return;

        }
        this.current=answer;
        this.operation=undefined;
        this.previous=''
    }

    display(){
        this.currentDisplay.innerHTML=this.current;
        if(this.operation!=null){
            this.previousDisplay.innerHTML= this.previous.toString() + ' '+ this.operation ;

        }
        else{
            this.previousDisplay.innerHTML=this.previous;
        }
    }
}




const currentDisplay= document.querySelector('[data-current]')
const previousDisplay=document.querySelector('[data-previous]')
const equalsButton= document.querySelector('[data-equals]')
const acButton= document.querySelector('[data-all-clear]')
const deleteButton= document.querySelector('[data-delete]')
const numberButtons= document.querySelectorAll('[data-number]')
const operationButtons= document.querySelectorAll('[data-operation]')

const calculator=new Calc(previousDisplay,currentDisplay);

acButton.addEventListener("click",()=>{
    calculator.clear();
    calculator.display();
})
numberButtons.forEach(element=>{
    element.addEventListener("click",()=>{
        calculator.appendNumber(element.innerHTML);
        calculator.display();
    })
})

operationButtons.forEach(element=>{
    element.addEventListener("click",()=>{
        calculator.operate(element.innerHTML);
        calculator.display();
    })
})

equalsButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.display();
})

deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.display();
})