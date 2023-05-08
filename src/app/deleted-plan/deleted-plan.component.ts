import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleted-plan',
  templateUrl: './deleted-plan.component.html',
  styleUrls: ['./deleted-plan.component.scss']
})
export class DeletedPlanComponent {
  constructor(private elementRef :ElementRef,
    private router: Router,){}
  
  ngOnInit():void{
    const continueBtn = this.elementRef.nativeElement.querySelector('#continueBtn')
    continueBtn.addEventListener('click',() =>{
      this.router.navigate(['plans'])
    })
  }
}
