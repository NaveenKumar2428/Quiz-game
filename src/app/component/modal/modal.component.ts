import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {


  constructor(
    public dialog: MatDialogRef<HomeComponent>,
    private router: Router,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialog.close();
  }


  startQuiz(){
    this.dialog.close();
    this.router.navigate(['/quiz-Game']); 
    this.dataService.start_time = 'start';
  }
  



}
