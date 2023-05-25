import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updated-success-exercices',
  templateUrl: './updated-success-exercices.component.html',
  styleUrls: ['./updated-success-exercices.component.scss']
})
export class UpdatedSuccessExercicesComponent {
  constructor(private elementRef :ElementRef,
    private router: Router,){}
  
  ngOnInit():void{
    const continueBtn = this.elementRef.nativeElement.querySelector('#continueBtn')
    continueBtn.addEventListener('click',() =>{
      this.router.navigate(['exercices'])
    })
  }
}
