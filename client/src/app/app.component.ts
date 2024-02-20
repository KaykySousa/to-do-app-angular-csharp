import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TasksService } from "./tasks.service";
import { HttpClientModule } from "@angular/common/http";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, HttpClientModule, ReactiveFormsModule],
	templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
	title = "Todo";
	tasks: any[] = [];
	inputTitle = new FormControl("");

	constructor(private tasksService: TasksService) {}

	ngOnInit(): void {
		this.tasksService.getTasks().subscribe((data: any) => {
			this.tasks = data;
			console.log(data);
		});
	}

	toggleTask(task: any): void {
		this.tasksService
			.updateTask(task.id, {
				done: !task.done,
			})
			.subscribe((data: any) => {
				console.log(data);
			});
	}

	removeTask(task: any): void {
		this.tasksService.removeTask(task.id).subscribe((data: any) => {
			this.tasks = this.tasks.filter((t) => t.id !== task.id);
			console.log(data);
		});
	}

	handleSubmit(e: Event): void {
		e.preventDefault();

		this.tasksService
			.createTask(this.inputTitle.value!)
			?.subscribe((data: any) => {
				this.tasks.push(data);
				this.inputTitle.setValue("");
				console.log(data);
			});
	}
}
