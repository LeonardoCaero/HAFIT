import { Component } from '@angular/core';
import { Iexercice } from '../interfaces/iexercice';
import { ExerciceDataService } from '../services/exercice-data.service';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.scss']
})
export class ExercicesComponent {
constructor(private exerciceService: ExerciceDataService){}

ngOnInit():void {
  this.exerciceService.getExercices().subscribe(resp=>{
    if (resp.body != null) {
      this.exercices = resp.body;
    }
  })
}
exercices: Iexercice [] = []
}
