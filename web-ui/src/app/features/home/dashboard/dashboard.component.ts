import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  classesForm: FormGroup;
  classesError: string;
  process = 'progress';
  invalidData: any;
  classes;
  show = false;
  data = [];

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService,
  ) {

  }
  ngOnInit() {
    this.authService.getClasses()
    .subscribe(
        response => {
          console.log(response);
          this.classes = response['data'];
          this.classesForm = this.fb.group({
            'classes': [],
        });
        this.show = true;
        },
    );
  }

  submitData() {
    for(let i of this.classesForm.value['classes']){
      console.log(i);
      this.data.push(i['text']);
    }
    this.authService.showClasses(this.data)
    .subscribe(
        response => {
          this.classesForm.reset();
        },
    );
      
  }
  selectedClasses(event){
    
  }


  }



