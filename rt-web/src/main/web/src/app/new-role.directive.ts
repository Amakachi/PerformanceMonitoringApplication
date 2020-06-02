import { Directive, TemplateRef, ViewContainerRef, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { UserService } from './services/user/user.service';

@Directive({
  selector: '[appNewRole]'
})
export class NewRoleDirective implements OnInit {
  @Input() appNewRole: string;
  userObj:any;
  check: string[] = [];
  permissions =[];

  constructor(private user:UserService,
    private templateRef:TemplateRef<any>, private viewContainerRef: ViewContainerRef,private elmRef: ElementRef,renderer: Renderer2) { }
    ngOnInit(){
      let activities = `${this.appNewRole}`;
   
      this.doCheck(activities);
    }

   doCheck(value: string) {
   
      let userData = this.user.getUserInfo()
      
    this.userObj = this.user.getUserInfo()
    this.permissions =  JSON.parse(userData.roles[0].permissions)
    this.permissions.push(userData.roles[0].roleName);

   
  //second comment
   let newValue = value.split(',');

   console.log(newValue);
   
   for(var i = 0; i < newValue.length; i++)
   {
   
    
      let val = newValue[i]
      let index = this.permissions.indexOf(val)
  

      if(index !== -1){
      
        this.check.push(this.permissions[index]);       
      }
   }
    // check always true with below line
    // check = true;
  
    if (typeof(this.check) != undefined && this.check.length != 0 ) {
    this.updateView(this.check);
    }
   
    }
   
   
    updateView(data){
      this.viewContainerRef.clear();
      if(data){
       this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    }

}
