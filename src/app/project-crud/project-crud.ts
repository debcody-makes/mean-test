
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ProjectApi } from '../project-api';
import { Project, ProjectInput } from '../project';

@Component({
  selector: 'app-project-crud',
  imports: [ReactiveFormsModule],
  templateUrl: './project-crud.html',
  styleUrl: './project-crud.css'
})
export class ProjectCrud implements OnInit {
  private fb = inject(FormBuilder);
  private projectApi = inject(ProjectApi);
  private cdr = inject(ChangeDetectorRef);

  projects: Project[] = [];
  selectedProject: Project | null = null;
  editingId: string | null = null;
  message = '';
  errorMessage = '';

  projectForm = this.fb.nonNullable.group({
    projectName: ['', Validators.required],
    description: ['', Validators.required],
    startDate: ['', Validators.required],
    status: ['Not Started', Validators.required],
    teamMember: ['', Validators.required],
    progressNote: ['']
  });

  ngOnInit(): void {
    this.loadProjects();
  }

  // READ: Retrieve all saved projects.
  loadProjects(): void {
    this.projectApi.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Unable to load projects.';
        this.cdr.detectChanges();
      }
    });
  }

  // READ: Retrieve one project by ID.
  viewProject(id: string): void {
    this.projectApi.getProject(id).subscribe({
      next: (project) => {
        this.selectedProject = project;
        this.errorMessage = '';
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Unable to load project details.';
        this.cdr.detectChanges();
      }
    });
  }

  // Prepare the form for updating an existing project.
  editProject(project: Project): void {
    this.editingId = project._id;
    this.projectForm.patchValue({
      projectName: project.projectName,
      description: project.description,
      startDate: project.startDate.substring(0, 10),
      status: project.status,
      teamMember: project.teamMember,
      progressNote: project.progressNote
    });
    this.message = '';
    this.errorMessage = '';
  }

  // CREATE or UPDATE, depending on whether a record is selected.
  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const projectData: ProjectInput =
      this.projectForm.getRawValue();

    if (this.editingId) {
      this.projectApi.updateProject(
        this.editingId,
        projectData
      ).subscribe({
        next: (updated) => {
          this.message = 'Project updated successfully!';
          this.selectedProject = updated;
          this.resetForm();
          this.loadProjects();
        },
        error: () => {
          this.errorMessage = 'Unable to update project.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.projectApi.addProject(projectData).subscribe({
        next: () => {
          this.message = 'Project saved successfully!';
          this.resetForm();
          this.loadProjects();
        },
        error: () => {
          this.errorMessage = 'Unable to save project.';
          this.cdr.detectChanges();
        }
      });
    }
  }

  // DELETE: Remove a project from MongoDB.
  deleteProject(id: string): void {
    this.projectApi.deleteProject(id).subscribe({
      next: () => {
        this.message = 'Project deleted successfully!';
        if (this.selectedProject?._id === id) {
          this.selectedProject = null;
        }
        if (this.editingId === id) {
          this.resetForm();
        }
        this.loadProjects();
      },
      error: () => {
        this.errorMessage = 'Unable to delete project.';
        this.cdr.detectChanges();
      }
    });
  }

  // Return the form to Create mode.
  resetForm(): void {
    this.editingId = null;
    this.projectForm.reset({
      projectName: '',
      description: '',
      startDate: '',
      status: 'Not Started',
      teamMember: '',
      progressNote: ''
    });
    this.errorMessage = '';
    this.cdr.detectChanges();
  }
}
