import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ModalComponent } from '../component/modal/modal.component';
import { DataService } from '../service/data.service';


export class SelectedItems {
  html_Questions: boolean | undefined;
  javaScript_Questions: boolean | undefined;
  angular_Questions: boolean | undefined;
  bootstrap_Questions: boolean | undefined;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedItems: SelectedItems = new SelectedItems();

  Question: any = [];

  configUrl = 'assets/files/questions.json';

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.getQuestion()
  }

  getQuestion(){
    this.http.get(this.configUrl).subscribe((res) => {
      this.Question = res;
    })
  }

  start() {

    const trueItems = Object.entries(this.selectedItems).filter(([key, value]) => value === true).map(([key]) => key)

    if (trueItems.length > 0) {
      this.dialog.open(ModalComponent);

      for (const topic of trueItems) {
        const topicQuestions = this.Question.find((item: any) => item.hasOwnProperty(topic))

        if (topicQuestions) {
          this.dataService.selected_Question.push(...topicQuestions[topic]);
          console.log(this.dataService.selected_Question)
        }
        
      }
      


    } else {
      this.openSnackBar('Please Select the topic', 'Close')
    }

  }

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'end'; // Set the horizontal position (e.g., 'start', 'center', 'end')
    config.verticalPosition = 'top'; // Set the vertical position (e.g., 'top', 'bottom')

    this._snackBar.open(message, action, config);
  }





}
