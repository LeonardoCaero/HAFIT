import { Component } from '@angular/core';
import { Iexercice } from '../interfaces/iexercice';
import { ExerciceDataService } from '../services/exercice-data.service';
import { AuthServiceService } from '../services/auth-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exercices',
  templateUrl: './exercices.component.html',
  styleUrls: ['./exercices.component.scss']
})
export class ExercicesComponent {
constructor(private exerciceService: ExerciceDataService, private authService : AuthServiceService,){}

ngOnInit():void {
  this.exerciceService.getExercices().subscribe(resp=>{
    if (resp.body != null) {
      this.exercices = resp.body;
      this.authService.checkUser().subscribe(
        resp=>{
          this.user = resp.userResponse._id
          this.userType = resp.userResponse.type
        }
      )
      this.exercices.forEach(exercice=>{
        if (exercice.featuredImg === 'default') {
          exercice.featuredImg = environment.defaultImage;
        }else if (exercice.featuredImg == 'null'){
          this.exerciceService.deleteExercice('exerciceId',exercice.exerciceId).subscribe()
        }
      })
    } 
  })
}
exercices: Iexercice [] = []
user: any = {}
userType: string = '';
}
