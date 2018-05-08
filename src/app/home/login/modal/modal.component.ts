import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modalInstance: NgbModalRef;
  modalOptions: NgbModalOptions;
  userForm: FormGroup;

  constructor(
    private _modalService: NgbModal,
    private _fb: FormBuilder
    ){
    this.modalOptions = { centered: true, windowClass: 'dark-modal'};
    this.userForm = this.createForm();
  }
  ngOnInit(){

  }

  private createForm(): FormGroup {
    return this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public open(modal): void {
    this.modalInstance = this._modalService.open(modal, this.modalOptions);
  }

  public onSubmit(result): any {
    this.modalInstance.close();
    console.log(result);
  }
}
