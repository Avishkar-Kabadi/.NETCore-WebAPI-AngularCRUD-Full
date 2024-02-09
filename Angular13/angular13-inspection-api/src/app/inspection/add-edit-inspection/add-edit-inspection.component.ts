import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-add-edit-inspection',
  templateUrl: './add-edit-inspection.component.html',
  styleUrls: ['./add-edit-inspection.component.css']
})
export class AddEditInspectionComponent implements OnInit {

  @Input() inspection:any;
  id: number = 0;
  status: string = "";
  comments: string = "";
  inspectionName: string="";
  inspectionTypeId!:Number;
  amount:Number=0;
  totalAmount:Number=0;
  selectedDate: Date = new Date;
  inspectionList$!: Observable<any[]>;
  statusList$!: Observable<any[]>;
  inspectionTypesList$!: Observable<any[]>;
  inspectionTypesList: any[] = [];  

  

  constructor(private service:InspectionApiService) { }
  ngOnInit(): void {
    
    this.id = this.inspection.id;
    this.status = this.inspection.status;
    this.comments = this.inspection.comments;
    this.selectedDate = this.inspection.selectedDate;
    this.amount = this.inspection.amount;
    this.inspectionName = this.inspection.inspectionName;
    this.inspectionTypeId =this.inspection.inspectionTypeId;
    this.statusList$ = this.service.getStatusList();
    this.inspectionList$ = this.service.getInspectionList();
    this.inspectionTypesList$ = this.service.getInspectionTypesList();
    this.inspectionTypesList$.subscribe(types => {
      console.log(types); 
      this.inspectionTypesList = types;
      this.updateTotalAmount();
    });
    

  }



  updateTotalAmount() {
    console.log('Updating totalAmount:', this.inspectionName);
  
    this.inspectionTypesList$.subscribe(types => {
      console.log('Fetched types:', types);
      
      const selectedType = types.find(type => type.inspectionName === this.inspectionName);
      this.totalAmount = selectedType ? selectedType.totalAmount : 0;
  
      console.log('Updated totalAmount:', this.totalAmount);
    });
  }
  
  


  private getTotalAmountByInspectionName(inspectionName: string): number {
    const selectedType = this.inspectionTypesList.find(type => type.inspectionName === inspectionName);

    return selectedType ? selectedType.totalAmount : 0;
  }

  addInspection() {
    var inspection = {
      status:this.status,
      comments:this.comments,
      selectedDate:this.selectedDate,
      amount:this.amount,
      totalAmount:this.totalAmount,
      inspectionName:this.inspectionName,
      inspectionTypeId :this.inspectionTypeId,

    }

    this.service.addInspection(inspection).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');

      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }

      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })

  }

  

  updateInspection() {
    var inspection = {
      id: this.id,
      status:this.status,
      comments:this.comments,
      inspectionName:this.inspectionName,
      inspectionTypeId :this.inspectionTypeId,
      selectedDate:this.selectedDate,
      amount:this.amount,
      totalAmount:this.totalAmount,
       }
    var id:number = this.id;
    this.service.updateInspection(id,inspection).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })

  }

}