import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  currentQuestionNumber:number = 0;

  questionList: any = []


  countdownValue:number = 10;


  items = [1, 2, 3, 4];
  isMobile = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    private breakpointObserver: BreakpointObserver
    ) {}


  ngOnInit(): void {
    this.dataList();
    if(this.questionList.length == 0){
        this.router.navigate(['/']);
    }

    if (this.dataService.start_time == 'start'){
      this.countdown();
    }

    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait,
      Breakpoints.HandsetLandscape
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });

  }



  dataList(){
   this.questionList = this.dataService.selected_Question
  }

  nextQuestion(){
    if(this.currentQuestionNumber < this.questionList.length){
      this.currentQuestionNumber ++;
      this.countdownValue = 10;
    }
  }


  countdown(){
    if(this.countdownValue != 0){
      setTimeout(()=>{
        this.countdownValue --;
        this.countdown();
      },1000)
    }
    if(this.countdownValue == 0){
      this.nextQuestion();
      this.countdownValue = 10;
      if(this.currentQuestionNumber < this.questionList.length){
        this.countdown();
      }
    }
  }

  selectedOption(option:any){
    if(option.is_Correct){
      this.dataService.correctAnswerCount ++;
    }
    option.isSelected = true;
  }

  finish(){
    this.dataService.quiz_Finish = 'finish';
    this.router.navigate(['/finish'])
  }

  disableOptions(options:any){

  const count = options.filter((m:any)=> m.isSelected == true).length

   if(count == 0){
      return false;
   }else{
    return true
   }
    

  }


}
