import { Component, OnInit } from '@angular/core';
import { ExamService } from '../../exams/shared/exam.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../shared/admin.service';
import { AlertsService } from '../../notification/alerts.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {

  exams: any[];
  showContent: boolean;

  constructor(private examService: ExamService,
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertsService: AlertsService) {
  }

  ngOnInit() {
    this.fetchExams();
  }

  fetchExams() {
    this.examService.getExams().subscribe((exams: any) => {
      this.exams = exams.data;
      this.showContent = true;
    });
  }

  deleteExam(examId: string) {
    this.showContent = false;
    setTimeout(() => {
      this.examService.deleteExamById(examId).subscribe(data => {
        this.alertsService.success('EXAM_DELETED');
        this.fetchExams();
        this.showContent = true;
      });
    }, 1000);
  }

  navigateToEdit(itemId: string) {
    if (itemId) {
      this.router.navigate(['backoffice-exams/', itemId]);
    } else {
      this.router.navigate(['backoffice-exams/', 'new']);
    }
  }

  navigateToBackoffice() {
    this.router.navigate(['backoffice/']);
  }
  navigateToEditLessons(itemId: string) {
    if (itemId) {
      this.router.navigate(['backoffice-exams-lessons/', itemId]);
    }
  }
  navigateToEditResults(itemId: string) {
    if (itemId) {
      this.router.navigate(['backoffice-exams-results/', itemId]);
    }
  }

}
