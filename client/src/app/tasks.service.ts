import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ITask } from "../types/task.interface";

@Injectable({
	providedIn: "root",
})
export class TasksService {
	private baseUrl = "http://localhost:5034";

	constructor(private http: HttpClient) {}

	getTasks() {
		return this.http.get<ITask[]>(this.baseUrl + "/todos");
	}

	updateTask(taskId: number, task: Partial<Pick<ITask, "title" | "done">>) {
		return this.http.patch<ITask>(this.baseUrl + "/todos/" + taskId, task);
	}

	createTask(title: string) {
		if (!title) return;

		return this.http.post<ITask>(this.baseUrl + "/todos", { title });
	}

	removeTask(taskId: number) {
		return this.http.delete<{ success: boolean }>(
			this.baseUrl + "/todos/" + taskId
		);
	}
}
