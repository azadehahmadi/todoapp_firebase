import { Component, OnInit } from '@angular/core';
import {TodoService} from './shared/todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers:[TodoService]
})
export class TodoComponent implements OnInit {
  private toDoListArray:any[]=[];
  constructor(private ToDoService:TodoService) { }

  ngOnInit(){
    this.ToDoService.getToDoList().snapshotChanges().subscribe((item:any)=>{this.toDoListArray=[];
    item.forEach((element:any) => {var x=element.payload.toJSON();
      x["$key"]=element.key;
      this.toDoListArray.push(x);
    });
    this.toDoListArray.sort((a:any,b:any)=>{return a.isChecked - b.isChecked})
  })
  }

  onAdd(itemTitle:string){
    this.ToDoService.addTitle(itemTitle);
    itemTitle='';
  }
  alterCheck($key:string,isChecked:boolean){
   this.ToDoService.checkOrUncheckTitle($key,!isChecked);
  }
  onDelete($key:string){
    this.ToDoService.removeTitle($key);
  }
}
