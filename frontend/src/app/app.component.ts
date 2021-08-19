import { Component, OnInit, ViewChild } from '@angular/core';
import { error } from 'protractor';
import { User } from './app.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  title = 'dashboard';
  users : User[] = []
  user : User;
  userForm : User
  operationType : string
  notificationFlag : boolean = false;
  notification : string = ''
  modal1 : boolean = true
  modal2 : boolean = false;
  constructor(private appService : AppService){
  }

  ngOnInit(){
    this.resetForm()
    this.getUsers()
  }

 async getUsers(){
    try{
     let res = await this.appService.getUsers().toPromise()
     this.users = res.data
    }catch(e){
      console.log(e)
    }
  }

  viewUser(id : number){
    console.log(id)
    console.log(this.users)
    let userData = JSON.parse(JSON.stringify(this.users.find(e => e.id == id)));
    this.user = userData
    this.modal2 = true
  }

  async addUser(openModal){
    if(openModal){
      this.notificationFlag = false
      this.resetForm()
      this.operationType = 'Add'
      this.modal1 = true
      return
    }
    try{
       await this.appService.addUser(this.userForm).toPromise()
       await this.getUsers()
      this.modal1 = false;
      this.notificationFlag = true
      this.closebutton.nativeElement.click();
      //document.getElementsByClassName("modal-backdrop")[0].remove()
    }catch(e){
      console.log(e)
      this.notificationFlag = true
      this.notification = e
      this.modal1 = true;
    }
  }

  async deleteUser(id : number){
    await this.appService.deleteUser(id).toPromise()
    this.getUsers()
  }

 async updateUser(id : number){
   console.log(id)
    if(id){
      this.notificationFlag = false
      this.operationType = 'Update'
      this.userForm = JSON.parse(JSON.stringify(this.users.find(e => e.id = id)))
      this.modal1 = true
      return
    }
    try{
      await this.appService.updateUser(this.userForm).toPromise()
      await this.getUsers()
     this.modal1 = false;
     this.notificationFlag = true
     this.closebutton.nativeElement.click();
     //document.getElementsByClassName("modal-backdrop")[0].remove()
   }catch(e){
     console.log(e)
     this.notificationFlag = true
     this.notification = e
     this.modal1 = true;
   }
    
    //this.userForm = userData
  }

  resetForm(){
    this.userForm = { 
      fname:"",
      lname:"",
      email:"",
      password:"",
      mobile:"",
    };
  }

}

