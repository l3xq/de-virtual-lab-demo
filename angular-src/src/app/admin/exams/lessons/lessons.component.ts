import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../exams/shared/exam.service';
import { AdminService } from '../../shared/admin.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  examId: string;
  showContent: boolean;
  exam: any;
  lessons: any[];

  constructor(private examService: ExamService,
    private adminService: AdminService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {

      this.examId = params['examId'];

      this.showContent = true;
      this.fetchLessons();
      this.fetchExam();
    });
  }

  fetchLessons() {
    this.examService.getLessonsByExamId(this.examId).subscribe((lessons: any) => {
      this.lessons = lessons.data;
    });
  }

  fetchExam() {
    this.examService.getExamById(this.examId).subscribe(exam => {
      this.exam = exam.data[0];
    });
  }

  navigateToEditLesson(itemId: string) {
    if (itemId) {
      this.router.navigate(['backoffice-exams-lessons/', this.examId, itemId]);
    } else {
      this.router.navigate(['backoffice-exams-lessons/', this.examId, 'new']);
    }
  }

  deleteLesson(lessonId: string) {
    this.showContent = false;
    setTimeout(() => {
      this.examService.deleteLessonByExamAndId(lessonId).subscribe(data => {
        this.fetchLessons();
        this.showContent = true;
      });
    }, 1000);
  }

  ngOnInit() {
  }


}
