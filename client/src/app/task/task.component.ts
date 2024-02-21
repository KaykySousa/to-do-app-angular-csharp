import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ITask } from "../../types/task.interface";

@Component({
	selector: "app-task",
	standalone: true,
	imports: [],
	templateUrl: "./task.component.html",
})
export class TaskComponent {
	@Input() task!: ITask;
	@Output() check = new EventEmitter();
	@Output() remove = new EventEmitter();
}
