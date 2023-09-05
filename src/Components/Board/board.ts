
import utils from "../../Utils/Utils"
import { modal } from "../Modal"
import { Watch } from "../Watch/watch"
import './board.css'

export class Board {
  arrWatch: Watch[]
  AMPMMode: boolean
  modal: modal
  constructor(){
    this.arrWatch = []
    this.AMPMMode = false
    this.modal = new modal()
  }

  render() {
    const board = document.createElement("div")
    board.id = "board"
    board.innerHTML = this.toHTMLText()
    document.body.appendChild(board)
    this.addEvent()
  }
   
  createWatch(title:string, timezone: string = '', afterElement: HTMLElement = null): Watch{
    let indexWatch = this.arrWatch.length
    if(indexWatch > 0 ){
      const lastWatchId = this.arrWatch[indexWatch-1].id
      const lastWatchIndex =  parseInt(lastWatchId.replace("watch_",""))
      indexWatch = lastWatchIndex + 1
    }
    const watch = new Watch("watch_" + indexWatch,title,timezone,this)
    this.arrWatch.push(watch)
    watch.render(document.getElementById("board").lastElementChild, afterElement)
    if (!afterElement) {
      watch.resetTime() //resetTime for the watch created by button Create Button - avoid the different with exact time
    }
    return watch;
   }

  addEvent(){

    let timeFlies = setInterval( () => {
      let innerTimer = setInterval( () => {
        this.timeFlies()
        clearInterval(innerTimer);  // Clear inner interval after one execution
      }, 1000);

    }, 1000);
    
    const openCreateModalModalBtn = document.getElementById("openCreateModalModal");
    const modal = document.getElementById("CreateWatchModal")


    openCreateModalModalBtn.onclick = () => {
       this.modal.render([{id: "title_watch", type: "text", label:"Title"}, {id:"timezone_watch", type: "select",label: "Time zone", listValue: utils.timezoneList}],this.createWatch,this)
    }

    const resetTimeBtn = document.getElementById("resetWatch");
    resetTimeBtn.onclick = () => {
      this.arrWatch.forEach((watch) => {
        watch.resetTime()
      })
    }

    const showAMPMBtn = document.getElementById("showAMPM");
    showAMPMBtn.onclick = () => {
      
      if(this.AMPMMode){
        showAMPMBtn.classList.remove("selected")
      } else {
        showAMPMBtn.classList.add("selected")
      }
      this.AMPMMode = ! this.AMPMMode

      this.arrWatch.forEach((watch) => {
        watch.updateHTML()
      })
    }
 
   }

  timeFlies():void{
      this.arrWatch.forEach((watch) => {watch.addTime()})
   }

 
  toHTMLText(): string {

    const title = '<div class="board_title"><p>Welcome to the world of Watch</p></div>'

    const btnPanel = '<div class="board_btn_panel">'+
                      '<button id="openCreateModalModal">Create Watch</button>' +
                      '<button id="resetWatch">reset Time</button> '+
                      '<button id="showAMPM">show/hide AM/PM</button> '+
                      '</div>'
    const boardContent =  '<div class="board_content">'

    return title + btnPanel + boardContent
  }
}