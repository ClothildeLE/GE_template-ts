import { Watch } from "../Watch"
import "./animatedPanel.css"

export class animatedElement {
  row: number
  column: number
  scale: number
  rotation: number
  constructor(private readonly parent: Watch) {
    this.scale = 5
    this.rotation = 0
  }
  render(parentElement: Element) {
       const elementHTML = document.createElement("div")
       elementHTML.className="animatedPanel"
       elementHTML.innerHTML = this.toHTMLText()
       parentElement.prepend(elementHTML)
       this.addEvent()
  }

  addEvent(){
    const parent = document.getElementById(this.parent.id)
    const panel = parent.getElementsByClassName("animatedPanel")[0] as HTMLElement
    const scaleUpBtn = panel.getElementsByClassName("scaleUp_btn")[0] as HTMLElement
    const scaleDownBtn = panel.getElementsByClassName("scaleDown_btn")[0] as HTMLElement
    const rotateBtn = panel.getElementsByClassName("rotate_btn")[0] as HTMLElement
    const moveBtn = panel.getElementsByClassName("move_btn")[0] as HTMLElement
    const copyBtn = panel.getElementsByClassName("copy_btn")[0] as HTMLElement
    const removeBtn = panel.getElementsByClassName("remove_btn")[0] as HTMLElement


    scaleUpBtn.onclick = () => {
      this.scale++
      parent.style.transform = this.getTransformStyle()
    }
    scaleDownBtn.onclick = () => {
      if(this.scale > 0) {
        this.scale--
        parent.style.transform = this.getTransformStyle()
      }
    }
    rotateBtn.onclick = () => {
      this.rotation++
      if(this.rotation === 36){
        this.rotation = 0
      }
      parent.style.transform = this.getTransformStyle()
    }
    copyBtn.onclick = () => {
      this.parent.duplicateWatch()

    }
    removeBtn.onclick = () => {
      this.parent.destroy()
    }
    moveBtn.onclick = () => {
      this.parent.board.modal.render([
        {id:"rowIndex", type:"number", label:"X-Position"},
        {id:"colIndex", type:"number", label:"Y-Position"}
      ], this.parent.move, this.parent)
    }
  }

  getTransformStyle(): string{
    return  "scale("+ (this.scale * 0.2) +")" + "rotate(" + this.rotation * 10 + "deg)"

  }

 
  toHTMLText(): string {
    let htmlText =  '<button class="scaleUp_btn"> <i class="fa-solid fa-plus" aria-hidden="true"></i></button>'+
                      '<button class="scaleDown_btn"><i class="fa-solid fa-minus" aria-hidden="true"></i></button>'+
                      '<button class ="rotate_btn"><i class="fa-solid fa-rotate" aria-hidden="true"></i></button>' + 
                      '<button class="move_btn"><i class="fa fa-arrows" aria-hidden="true"></i></button>' +
                       '<button class="copy_btn"> <i class="fa-regular fa-copy"></i></button>' +
                       '<button class="remove_btn"><i class="fa-solid fa-xmark"></i></button>'
                      
    return htmlText
  }
}
