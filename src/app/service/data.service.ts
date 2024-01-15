import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selected_Question: any = [];

  start_time = '';

  correctAnswerCount:number = 0;

  quiz_Finish = '';

  constructor() { }





}
