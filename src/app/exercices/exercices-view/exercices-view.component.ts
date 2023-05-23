import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iexercice } from 'src/app/interfaces/iexercice';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ExerciceDataService } from 'src/app/services/exercice-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exercices-view',
  templateUrl: './exercices-view.component.html',
  styleUrls: ['./exercices-view.component.scss']
})
export class ExercicesViewComponent {
  errorMessage: string = '';
  exercice : Iexercice | null = null;
  defaultImage = environment.defaultImage
  constructor( private exerciceServices: ExerciceDataService, private route: ActivatedRoute,private authService : AuthServiceService,){

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
    this.authService.checkUser().subscribe(//MIRA EL USER LOGGEADO 
    resp=>{
      console.log(resp._id)
      this.user = resp._id
    }
  )
  }
  user: any = {};
}
