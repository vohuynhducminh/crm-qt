import { Component, OnInit, EventEmitter, Output, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/category/services/category.service';
import { Category } from 'src/app/category/models/category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  modalRef: BsModalRef;
  isCreating: boolean;
  formGroup: FormGroup;
  name: string;
  description: string;

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { ignoreBackdropClick: true });
    this.isCreating = false;
  }

  createCategory(name: string) {
    const category: Category = {
      Id: null,
      Name: name,
    };
    this.categoryService.createCategory(category)
      .then(() => {
        this.modalService.hide(1);
        this.refresh.emit();
        this.isCreating = false;
      })
      .catch(error => console.error(error));
  }

}
