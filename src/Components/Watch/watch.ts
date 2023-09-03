import { animatedElement } from "../AnimatedPanel"
import { Board } from "../Board"
import "./watch.css"

export class Watch {
  date: Date
  hour: number
  minute: number
  seconde: number
  mode: number // 0 , 1,2 : 1 for addHour, 2 for addMinute, 0 for anything
  constructor(public id :string ,private readonly title: string, private readonly timeZone : string, public board:Board) {
    this.mode = 0
    this.initWatch();
  }
  render(parentElement: Element, afterElement: HTMLElement = null) {
      const watchHtML = document.createElement("div")
      watchHtML.className="watch"
      watchHtML.id = this.id
      if(afterElement){
        afterElement.insertAdjacentElement("afterend", watchHtML)
      }else{
        parentElement.appendChild(watchHtML)
      }
      watchHtML.innerHTML = this.toHTMLText()
      const animatedPanel = new animatedElement(this)
      animatedPanel.render(watchHtML)
      this.addEvent()
  }

  timeFlies(){
    if(this.seconde < 59){
      this.seconde++
    }else{
      this.seconde = 0;
      if(this.minute<59){
        this.minute++
      }else{
        this.minute = 0
        if(this.hour<23){
          this.hour = 0;
        }
      }
    }
    this.updateHTML()
  }
  addTime(mode:number = 0){
    switch(mode){
      case 0:
        if(this.seconde < 59){
          this.seconde++
        } else { 
          this.seconde = 0
          this.addTime(2)
        }
        break
      case 1: // hours
        if(this.hour<23){
          this.hour++
        }else{
          this.hour = 0
        }
        break
      case 2: //minute
        if(this.minute<59){
          this.minute++
        }else{
          this.minute = 0
          this.addTime(1)
        }
        break
      
    }
    this.updateHTML()
   

  }
  initWatch(){ 
    var currentDate = new Date()
    this.date=new Date(Date.parse(currentDate.toLocaleString("en-US", {timeZone: this.timeZone})))
    this.hour = this.date.getHours()
    this.minute = this.date.getMinutes()
    this.seconde = this.date.getSeconds()
  }
  resetTime(){
    this.initWatch()
    this.updateHTML()

  }
  addEvent(){
    const self = this;
    const watchElement = document.getElementById(this.id)
    const animatedPanel = watchElement.getElementsByClassName("animatedPanel") as HTMLCollectionOf<HTMLElement>
    const modeBtn = document.getElementById(this.id+'_mode_btn')
    const addBtn = document.getElementById(this.id + '_add_btn')
    const lightBtn = document.getElementById(this.id + '_light_btn')
    const contentWatch  = document.getElementById(this.id + '_content')

    modeBtn.onclick = () => {
      if(self.mode < 2){
        self.mode++
      }else{
        self.mode = 0
      }
    }
    addBtn.onclick = () => {
      if(self.mode === 1){
        this.addTime(1)
      }else if(self.mode === 2){
        this.addTime(2)
      }
    }
    lightBtn.onclick = () => {
      if(contentWatch.classList.contains("lightON")){
        contentWatch.classList.remove("lightON")
      }else{
        contentWatch.classList.add("lightON")
      }
    }
  }
  duplicateWatch(){
    const newWatch = this.board.createWatch(this.title,this.timeZone,document.getElementById(this.id))
    newWatch.hour = this.hour
    newWatch.minute = this.minute
    newWatch.seconde = this.seconde
    newWatch.updateHTML()
  }
  move(XPosition: number, YPosition: number){
    const watchElement = document.getElementById(this.id)
    watchElement.style.gridRow = XPosition.toString()
    watchElement.style.gridColumn = YPosition.toString()
  }

  
  updateHTML(){
    const contentWatch = document.getElementById(this.id + "_content")
    contentWatch.innerHTML = ' <p>' +(this.board.AMPMMode && this.hour > 12 ?  this.hour - 12 : this.hour) + ":" + this.minute +":" + this.seconde +
                               (this.board.AMPMMode ? (this.hour > 12 ? " PM" : " AM") : "") + '</p>'
  }
  destroy(){
    this.board.arrWatch = this.board.arrWatch.filter((watch)=> {
      return watch.id !== this.id
    })
    document.getElementById(this.id).remove()
    delete this.id;
  }

 
  toHTMLText(): string {
  
    let htmlText = '<div class ="watch_title">' + this.title + '</div>' +
                      '<div id= "'+this.id+'_content" class = "watch_content"> <p>'+
                          (this.board.AMPMMode && this.hour > 12 ?  this.hour - 12 : this.hour) + ":" + this.minute +":" + this.seconde +
                          (this.board.AMPMMode ? (this.hour > 12 ? " PM" : " AM") : "") + '</p></div>' +
                      '<div id = "'+this.id+'_mode_btn" class="watch_mode_btn"> </div>' +
                      '<div id = "'+this.id+'_add_btn" class="watch_add_btn"> </div>' + 
                      '<div id = "'+this.id+'_light_btn" class="watch_light_btn"> </div>'
                      
    return htmlText
  }
}
