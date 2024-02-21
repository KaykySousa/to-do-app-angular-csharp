import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TaskListComponent } from "./task-list/task-list.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, TaskListComponent],
	templateUrl: "./app.component.html",
})
export class AppComponent {
	title = "Todo";
}
