
import { Component } from '@angular/core';
import { MilestoneTracker } from './milestone-tracker/milestone-tracker';
import { ProgressNotes } from './progress-notes/progress-notes';
import { MilestoneApi } from './milestone-api/milestone-api';
import { ProjectCrud } from './project-crud/project-crud';

@Component({
  selector: 'app-root',
  imports: [
    MilestoneTracker,
    ProgressNotes,
    MilestoneApi,
    ProjectCrud
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Project Progress Tracker';
}
