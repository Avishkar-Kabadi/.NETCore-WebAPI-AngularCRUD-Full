import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InspectionApiService {

  readonly inspectionAPIUrl = "https://localhost:7164/api";

  // Create Subjects for each entity
  private inspectionListSubject = new Subject<any[]>();
  private inspectionTypesListSubject = new Subject<any[]>();
  private statusListSubject = new Subject<any[]>();

  constructor(private http: HttpClient) { }

  // Inspection
  getInspectionList() {
    this.http.get<any>(this.inspectionAPIUrl + '/Inspections')
      .subscribe(data => this.inspectionListSubject.next(data));
    return this.inspectionListSubject.asObservable();
  }

  addInspection(data: any) {
    return this.http.post(this.inspectionAPIUrl + '/Inspections', data);
  }

  updateInspection(id: number | string, data: any) {
    return this.http.put(this.inspectionAPIUrl + `/Inspections/${id}`, data);
  }

  deleteInspection(id: number | string) {
    return this.http.delete(this.inspectionAPIUrl + `/Inspections/${id}`);
  }

  // InspectionTypes
  getInspectionTypesList() {
    this.http.get<any>(this.inspectionAPIUrl + '/InspectionTypes')
      .subscribe(data => this.inspectionTypesListSubject.next(data));
    return this.inspectionTypesListSubject.asObservable();
  }

  addInspectionTypes(data: any) {
    return this.http.post(this.inspectionAPIUrl + '/InspectionTypes', data);
  }

  updateInspectionTypes(id: number | string, data: any) {
    return this.http.put(this.inspectionAPIUrl + `/InspectionTypes/${id}`, data);
  }

  deleteInspectionTypes(id: number | string) {
    return this.http.delete(this.inspectionAPIUrl + `/InspectionTypes/${id}`);
  }

  // Status
  getStatusList() {
    this.http.get<any>(this.inspectionAPIUrl + '/Status')
      .subscribe(data => this.statusListSubject.next(data));
    return this.statusListSubject.asObservable();
  }

  addStatus(data: any) {
    return this.http.post(this.inspectionAPIUrl + '/Status', data);
  }

  updateStatus(id: number | string, data: any) {
    return this.http.put(this.inspectionAPIUrl + `/Status/${id}`, data);
  }

  deleteStatus(id: number | string) {
    return this.http.delete(this.inspectionAPIUrl + `/Status/${id}`);
  }
}
