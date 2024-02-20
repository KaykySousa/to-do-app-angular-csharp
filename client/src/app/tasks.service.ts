import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class TasksService {
	private baseUrl = "http://localhost:5034";

	constructor(private http: HttpClient) {}

	getTasks() {
		return this.http.get(this.baseUrl + "/todos");
	}

	updateTask(taskId: number, task: any) {
		return this.http.patch(this.baseUrl + "/todos/" + taskId, task);
	}

	createTask(title: string) {
		if (!title) return;

		return this.http.post(this.baseUrl + "/todos", { title });
	}

	removeTask(taskId: number) {
		return this.http.delete(this.baseUrl + "/todos/" + taskId);
	}
}
