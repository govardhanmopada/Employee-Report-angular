import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

 
  employees:any;
  desig:string;
  reportType:String;
  inprogress:String="Generating...";
  successMsgShow:boolean=false;
  failedMsgShow:boolean=false;
  inprogressMsgShow:boolean=false;
  successMsg:String;

  pdfImageIcon:String="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png";
  excelImageIcon:String="data:image/png;base64,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";
  constructor(private service:EmployeeServiceService, private sanitizer: DomSanitizer) { }




public findByDesignation(){
  let resp= this.service.getEmployeesByDesignation(this.desig);
  resp.subscribe((data)=>this.employees=data);
 }

  ngOnInit() {
    let resp=this.service.getEmployees();
    resp.subscribe((data)=>this.employees=data);
  }

  generateReport(reportType){
    this.inprogressMsgShow=true;
    this.reportType=reportType;
    let resp=this.service.downloadReport(reportType);
    resp.subscribe((data)=>{
      console.info("data======>"+data);
      if(data.toString().indexOf("report generated in path :") !== -1){
        this.successMsgShow=true;
        this.inprogressMsgShow=false;
      }
    });
  }

  generateReportWithData(reportType){

    this.inprogressMsgShow=true;
    this.reportType=reportType;
    let resp=this.service.downloadReportWithData(reportType,this.employees);
    resp.subscribe((response)=>{
      console.info("data======>"+response);
      if(response.toString().indexOf("report generated in path :") !== -1){
        this.successMsg=response.toString();
        this.successMsgShow=true;
        
      }
      else if(reportType=="pdf"){
        const file = new Blob([response], { type: 'application/pdf' });
        
        FileSaver.saveAs(file, "Employee.pdf");
        this.inprogressMsgShow=false;
        
      }else if(reportType=="excel"){
        const file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        FileSaver.saveAs(file, "Employee.xlsx");
               this.inprogressMsgShow=false;
        
      }
    });

  }

}
