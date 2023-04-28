import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iexercice } from 'src/app/interfaces/iexercice';
import { ExerciceDataService } from 'src/app/services/exercice-data.service';

@Component({
  selector: 'app-exercices-view',
  templateUrl: './exercices-view.component.html',
  styleUrls: ['./exercices-view.component.scss']
})
export class ExercicesViewComponent {
  errorMessage: string = '';
  exercice : Iexercice | null = null;

  constructor( private exerciceServices: ExerciceDataService, private route: ActivatedRoute){

  }

  
 
  ngOnInit(): void {
    const exercicesId = this.route.snapshot.paramMap.get('exerciceId');
    this.exerciceServices.getExercice('exerciceId',exercicesId).subscribe(
      (data) => {
        this.exercice = data.body;  
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
}
