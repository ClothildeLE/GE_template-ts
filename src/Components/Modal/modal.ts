import { Board } from "../Board"
import { Watch } from "../Watch"
import "./modal.css"

export class modal {
  private id: string = 'modal'
  private htmlText: string = ""
  private onValid: void
  constructor() {
  }
  render( arrayInput: Array<{id:string, type: string, label:string , listValue?: Array<{name:string, value: string}>} >, 
    onValid: (...args: any) => void  | Watch, object: Board | Watch) {

    let modal = document.getElementById("modal")
    if(!modal){
      modal = document.createElement("div")
      modal.id = this.id
      modal.className = "modal"
    }
    modal.style.display = "block"
    modal.innerHTML = this.toHTMLText(arrayInput)
    document.body.appendChild(modal)
    this.addEvent( arrayInput, onValid,object)
  }

  addEvent(arrayInput: Array<{id:string, type: string, label:string , listValue?: Array<{name:string, value: string}>} >,
     onValid: (...args: any) => void  | Watch, object: Board | Watch){

    const openCreateModalModalBtn = document.getElementById("openCreateModalModal");
    const modal = document.getElementById("modal")

    window.onclick = function(event) {
      if (event.target == modal) {
         modal.style.display = "none";
      }
    }
    const validBtn = document.getElementById("modal_valid")

    validBtn.onclick = () => {

      const titleWatch = document.getElementById("title_watch") as HTMLInputElement
      const timezoneWatch = document.getElementById("timezone_watch") as HTMLInputElement
      let arrParam = []
      for(let i = 0; i < arrayInput.length; i++){
      }
      const p =  arrayInput.map((_inputData, i) => {
        const inputElement =  document.getElementById(arrayInput[i].id) as HTMLInputElement
        return inputElement.value
      })
      const a =   ["test","Europe/Paris"] as const
      onValid.apply(object,p)
      modal.style.display = "none";

    }
  }

 
  toHTMLText(arrayInput: Array<{id:string, type: string, label:string , listValue?: Array<{name:string, value: string}>} >): string {

    let htmlText = '<div class="modal_content" id ="'+this.id+'Form">' 

    for(let i = 0; i < arrayInput.length; i++){
      htmlText += '<label for="'+arrayInput[i].id+'">'+arrayInput[i].label+': </label>'
      switch(arrayInput[i].type){
        case "text":
        case "number":
          htmlText += '<input type="'+arrayInput[i].type+'" id="'+arrayInput[i].id+'" name="'+arrayInput[i].id+'"/> '
          break
        case "select":

        htmlText += '<select id = "timezone_watch">'
        arrayInput[i].listValue.forEach((item: { value: string; name: string; })=> {
            htmlText += '<option value = "' + item.value +'" >'+ item.name+'</option>' 
          })
          htmlText += '</select>'
      }
    }
       
    htmlText +=  ' <button  id="modal_valid">Valid </button>' +
    '</div>' 
                      
    return htmlText
  }
}
