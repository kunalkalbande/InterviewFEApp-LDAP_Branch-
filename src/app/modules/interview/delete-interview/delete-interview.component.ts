import { Component, OnInit, Inject } from "@angular/core";
import { InterviewService } from "../../../shared/services/interview.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AddupdateEventEmmiterService } from "../../../shared/services/addupdate-event-emmiter.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-delete-interview",
  templateUrl: "./delete-interview.component.html",
  styleUrls: ["./delete-interview.component.scss"]
})
export class DeleteInterviewComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteInterviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: InterviewService,
    private eventService: AddupdateEventEmmiterService,
    private alertService: NotificationService,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(interviewId: number): void {
    this.service.deleteInterview(interviewId).subscribe(
      success => {
        this.alertService.success("Interview details deleted successfully.");
        this.eventService.onSaveOnUpdate();
      },
      error => {
        this.alertService.error("Error : Not able to update.");
      }
    );
  }
}
