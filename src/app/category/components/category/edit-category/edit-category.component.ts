import { Component, OnInit, EventEmitter } from '@angular/core';
import { Category } from 'src/app/category/models/category';
import { BsModalRef } from 'ngx-bootstrap';
import { CategoryService } from 'src/app/category/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {

  category: Category;
  refresh: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public modalRef: BsModalRef,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.category = { ...this.category };
  }

  updateWorkFlow() {
    this.categoryService.updateCategory(this.category)
      .then(() => {
        this.modalRef.hide();
        this.refresh.emit();
      })
      .catch(error => console.error(error));
  }

}
