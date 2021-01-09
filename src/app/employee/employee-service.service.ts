import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private apiUrl ='http://localhost:8080/';
  
  constructor(private http:HttpClient) { }


  
   getEmployees(){
    return this.http.get(this.apiUrl+"getEmployees").pipe(
      retry(1), 
      catchError(this.handleError) 
    );
  }

   getEmployeesByDesignation(desig){
    return this.http.get(this.apiUrl+"getEmployees/"+desig).pipe(
      retry(1), 
      catchError(this.handleError) 
    );;
  }

   downloadReport(reportType){
    return this.http.get(this.apiUrl+"report/"+reportType,{responseType:'text' as 'json'}).pipe(
      retry(1), 
      catchError(this.handleError) 
    );;
  }

   downloadReportWithData(reportType,employees){

    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };

    return this.http.post<any>(this.apiUrl+"reportWithData/"+reportType,employees,httpOptions).pipe(
      retry(1), 
      catchError(this.handleError) 
    );;
  }



  handleError(error) {

    let errorMessage = ''; 
    if (error.error instanceof ErrorEvent) {
 
      // client-side error
 
      errorMessage = `Error: ${error.error.message}`;
 
    } else {
 
      // server-side error
 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
 
    }
 
    window.alert(errorMessage);
 
    return throwError(errorMessage);
 
  }
  
}
  

