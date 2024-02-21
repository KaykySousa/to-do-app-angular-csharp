import { Component, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TasksService } from "../tasks.service";
import { TaskComponent } from "../task/task.component";
import { ITask } from "../../types/task.interface";

@Component({
	selector: "app-task-list",
	standalone: true,
	imports: [ReactiveFormsModule, TaskComponent],
	templateUrl: "./task-list.component.html",
})
export class TaskListComponent implements OnInit {
	tasks: ITask[] = [];
	inputTitle = new FormControl("");

	constructor(private tasksService: TasksService) {}

	ngOnInit(): void {
		this.tasksService.getTasks().subscribe((data) => {
			this.tasks = data;
			console.log(data);
		});
	}

	toggleTask(task: ITask): void {
		this.tasksService
			.updateTask(task.id, {
				done: !task.done,
			})
			.subscribe((data) => {
				console.log(data);
			});
	}

	removeTask(task: ITask): void {
		this.tasksService.removeTask(task.id).subscribe((data) => {
			this.tasks = this.tasks.filter((t) => t.id !== task.id);
			console.log(data);
		});
	}

	handleSubmit(e: Event): void {
		e.preventDefault();

		this.tasksService
			.createTask(this.inputTitle.value!)
			?.subscribe((data) => {
				this.tasks.push(data);
				this.inputTitle.setValue("");
				console.log(data);
			});
	}
}
