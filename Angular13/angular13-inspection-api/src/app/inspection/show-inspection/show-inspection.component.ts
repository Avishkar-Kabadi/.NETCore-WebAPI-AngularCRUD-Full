import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

interface InspectionItem {
  id: number;
  status: string;
  amount: number ; // Assuming amount is a number, adjust the type accordingly
  comments: string;
  userDate: string; // Assuming userDate is a string, adjust the type accordingly
  inspectionTypeId: number;}

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {

  inspectionList$!:Observable<any[]>;
  inspectionTypesList$!:Observable<any[]>;
  statusList$!: Observable<any[]>;
  inspectionTypesList:any=[];
  totalExpense: number = 0; // Store the total expense
  // Map to display data associate with foreign keys
  inspectionTypesMap:Map<number, string> = new Map()
  

  constructor(private service:InspectionApiService) { }

  ngOnInit(): void {

    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
    this.statusList$ = this.service.getStatusList();
    this.refreshInspectionTypesMap();
    
    var showUpdateSuccess = document.getElementById('update-success-alert');
    if(showUpdateSuccess) {
      showUpdateSuccess.style.display = "none";
    }
    
    var showAddSuccess = document.getElementById('add-success-alert');
    if(showAddSuccess) {
      showAddSuccess.style.display = "none";
    }
    
    var showdeleteSuccess = document.getElementById('delete-success-alert');
    if(showdeleteSuccess) {
      showdeleteSuccess.style.display = "none";
    }
    
    var showdeleteError = document.getElementById('delete-error-alert');
    if(showdeleteError) {
      showdeleteError.style.display = "none";
    }

    this.inspectionList$ = this.service.getInspectionList();
    // Subscribe only once to calculate the initial total expense
    this.inspectionList$.subscribe(items => {
      this.calculateTotalExpense(items);
    });
  }

  calculateTotalExpense(items: InspectionItem[] | null): number {
    if (items) {
      return items.reduce((total, item) => total + Number(item.amount || 0), 0);
    }
    return 0;
  }
  // Variables (properties)
  modalTitle:string = '';
  activateAddEditInspectionComponent:boolean = false;
  activateAddEditStatusComponent:boolean = false;
  activateAddEditTypesComponent:boolean = false;
  
  inspection:any;
  status:any;
  inspectiontypes:any;

  modalAdd() {
    this.inspection = {
      id:0,
      status:null,
      comments:null,
      inspectionTypeId:null,
      totalAmount:null,
    }
    this.modalTitle = "Add Expense";
    this.activateAddEditInspectionComponent = true;
  }

  modalEdit(item:any) {
    this.inspection = item;
    this.modalTitle = "Edit Expense";
    this.activateAddEditInspectionComponent = true;
  }

  modalClose() {
    this.activateAddEditInspectionComponent = false;
    this.inspectionList$ = this.service.getInspectionList();
  }

  modalAddStatus() {
    this.status = {
      id:0,
      statusOption:null,
    }
    this.modalTitle = "Add Status";
    this.activateAddEditStatusComponent = true;
  }

  modalEditStatus(item:any) {
    this.status = item;
    this.modalTitle = "Edit Status";
    this.activateAddEditStatusComponent = true;
  }

  modalCloseStatus() {
    this.activateAddEditStatusComponent = false;
    this.statusList$ = this.service.getStatusList();
  }

  modalAddTypes() {
    this.inspectiontypes = {
      id:0,
      inspectionName:null,
      totalAmount:null,
    }
    this.modalTitle = "Add Types";
    this.activateAddEditTypesComponent = true;
  }

  modalEditTypes(item:any) {
    this.inspectiontypes = item;
    this.modalTitle = "Edit Types";
    this.activateAddEditTypesComponent = true;
  }

  modalCloseTypes() {
    this.activateAddEditTypesComponent = false;
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
  }
  
  delete(item:any) {
    if(confirm(`Are you sure you want to delete Expense ${item.id}`)) {
      this.service.deleteInspection(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.inspectionList$ = this.service.getInspectionList();
      })
    }
  }
  
  delete_types(item:any) {

    if(confirm(`Are you sure you want to delete type ${item.inspectionName} and Expense related?`)) { 

      this.service.deleteInspectionTypes(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.inspectionTypesList$ = this.service.getInspectionTypesList();
      })
    }
  }
  
  delete_status(item:any) {
    if(confirm(`Are you sure you want to delete status ${item.id}?`)) {
      this.service.deleteStatus(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.statusList$ = this.service.getStatusList();
      })
    }
  }

  refreshInspectionTypesMap() {
    this.service.getInspectionTypesList().subscribe(data => {
      this.inspectionTypesList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.inspectionTypesMap.set(this.inspectionTypesList[i].id, 
          this.inspectionTypesList[i].inspectionName);
      }
    })
  }

}