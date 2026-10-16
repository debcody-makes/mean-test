
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress-notes',
  imports: [ReactiveFormsModule],
  templateUrl: './progress-notes.html',
  styleUrl: './progress-notes.css'
})
export class ProgressNotes {

  progressNotesForm = new FormGroup({
    projectCode: new FormControl(''),
    projectName: new FormControl(''),
    date: new FormControl(''),
    currentStatus: new FormControl('On Track'),
    teamMember: new FormControl(''),
    progressNote: new FormControl('')
  });

  projectCodes: Record<string, string> = {
    PPT101: 'Project Progress Tracker',
    WEB202: 'Website Redesign',
    APP303: 'Mobile Application Development',
    DATA404: 'Data Analytics Dashboard'
  };

  errorMessage = '';

  onProjectCodeBlur(): void {
    const code = (this.progressNotesForm.get('projectCode')?.value ?? '')
      .trim()
      .toUpperCase();

    this.progressNotesForm.get('projectCode')?.setValue(code);

    const projectName = this.projectCodes[code];

    if (projectName) {
      this.progressNotesForm.get('projectName')?.setValue(projectName);
      this.errorMessage = '';
    } else {
      this.progressNotesForm.get('projectName')?.setValue('');
      this.errorMessage = code ? 'Project code not found.' : '';
    }
  }
}