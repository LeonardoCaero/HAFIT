import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleted-exercice',
  templateUrl: './deleted-exercice.component.html',
  styleUrls: ['./deleted-exercice.component.scss']
})
export class DeletedExerciceComponent {
  constructor(private elementRef :ElementRef,
    private router: Router,){}
  
  ngOnInit():void{
    const continueBtn = this.elementRef.nativeElement.querySelector('#continueBtn')
    continueBtn.addEventListener('click',() =>{
      this.router.navigate(['exercices'])
    })
  }
}
