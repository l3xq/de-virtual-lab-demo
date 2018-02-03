import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ExamService } from '../../../../exams/shared/exam.service';
import { AdminService } from '../../../shared/admin.service';

@Component({
  selector: 'app-edit-results',
  templateUrl: './edit-results.component.html',
  styleUrls: ['./edit-results.component.scss']
})
export class EditResultsComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<any>();
  
    tokenId: number;
    examId: string;
    periodId: string;
    showContent: boolean;
    period: any;
    form: any;
    file: any;
    students: any;
  
    constructor(private fb: FormBuilder, private examService: ExamService, private adminService: AdminService, private router: Router, private activatedRoute: ActivatedRoute) {
      this.form = fb.group({
        title: ['', Validators.required]
      });
  
      this.activatedRoute.params.subscribe(params => {
  
        this.tokenId = Number(params['id']);
        this.examId = params['examId'];
        this.periodId = params['periodId'];
  
        this.adminService.getToken().subscribe(authObject => {
          if (!(this.tokenId && this.tokenId === authObject.tokenId)) {
            this.router.navigate(['/admins/']);
          } else {
            this.showContent = true;
          }
        });
      });
    }

  ngOnInit() {
    if (this.periodId != 'new') {
      this.getPeriod();
    }
  }

  getPeriod() {
    this.examService.getPeriodById(this.periodId).subscribe(period => {
      this.period = period;
      this.form.value['title'] = period.name;
      this.examService.getStudentsByExamAndPeriod(this.examId, this.periodId).subscribe(students => {
        this.students = students;
      });
    });
  }

  submit() {
    const title = this.form.value['title'];
    let object = {
      name: title,
      examId: this.examId
    }
    if (this.periodId != 'new') {
      this.examService.updatePeriodById(this.periodId, object).subscribe(period => { });
    } else {
      this.examService.createNewPeriod(object).subscribe(period => { });
    }
    this.onSubmit.emit();
    this.form.reset();
    setTimeout(() => {
      this.showContent = false;
      this.router.navigate(['/backoffice/exams/results',this.examId, this.tokenId]);
    }, 1000);
    this.showContent = false;
  }

  deleteStudent(studentId: string) {
    this.showContent = false;
    setTimeout(() => {      
      this.examService.deleteStudentById(studentId).subscribe(data => { 
      this.getPeriod();
      this.showContent = true;
      });      
    }, 1000); 
  }

  navigateToEditStudent(periodId, studentId) {
    this.router.navigate(['backoffice/exams/periods/students/',this.examId, this.tokenId, periodId, studentId]);
  }

}