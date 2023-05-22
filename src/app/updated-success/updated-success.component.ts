import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updated-success',
  templateUrl: './updated-success.component.html',
  styleUrls: ['./updated-success.component.scss']
})
export class UpdatedSuccessComponent {
  constructor(private elementRef :ElementRef,
    private router: Router,){}
  
  ngOnInit():void{
    const continueBtn = this.elementRef.nativeElement.querySelector('#continueBtn')
    continueBtn.addEventListener('click',() =>{
      this.router.navigate(['plans'])
    })
  }
}
