import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexNonAxisChartSeries, ApexChart, ApexResponsive, ChartComponent, ApexDataLabels } from 'ng-apexcharts';
import { DataService } from 'src/app/service/data.service';



export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  dataLabels: ApexDataLabels;
  colors: String[];
};


@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;


  correctAnswer:number = 0;
  wrongAnswer:number = 0;
  totalQuestions:number = 0;

  constructor(
    private dataService: DataService,
    private router:Router
    ) { }

  ngOnInit(): void {

    if (this.dataService.quiz_Finish !== 'finish'){
      this.router.navigate(['/'])
    }

  this.totalQuestions = this.dataService.selected_Question.length

   this.correctAnswer = this.dataService.correctAnswerCount;

   this.wrongAnswer = this.totalQuestions - this.correctAnswer;

      this.chartOptions = {
        series: [this.correctAnswer, this.wrongAnswer],
        fontFamily: 'cursive',
        chart: {
          width: 380,
          type: "pie"
        },
        colors:['#228b22','#dc143c'],
        dataLables: {
          style:{
            fontSize: '14px',
            fontFamily: 'cursive',
          }
        },
        labels: ["Correct Answer", "Wrong Answer"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ]
      };

  }



  replay(){
    this.dataService.selected_Question.length = 0;
    this.router.navigate(['/'])
    this.correctAnswer = 0;
    this.dataService.correctAnswerCount = 0;
  }






}
