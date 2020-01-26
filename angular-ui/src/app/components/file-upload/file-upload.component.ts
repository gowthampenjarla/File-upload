import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"]
})
export class FileUploadComponent implements OnInit {
  uploadedFiles: Array<File>;
  constructor(private http: HttpClient) {}
  ngOnInit() {}
  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }
  upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        "uploads[]",
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    this.http.post("/api/upload", formData).subscribe(response => {
      console.log("response received is ", response);
    });
  }
}
