
import { Component } from '@angular/core';
import { MilestoneTracker } from './milestone-tracker/milestone-tracker';
import { ProgressNotes } from './progress-notes/progress-notes';

@Component({
  selector: 'app-root',
  imports: [MilestoneTracker, ProgressNotes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Project Progress Tracker';
}
