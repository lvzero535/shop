import { Component, OnInit, TemplateRef } from '@angular/core';
import { Manager } from 'src/app/interfaces/manager';
import { IPaginationQueryParams } from 'src/app/interfaces/common.interface';
import { ManagerService } from '../manager.service';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  public listOfData: Array<Manager>;
  public totalNumber = 0;
  public currentPage = 1;
  public pageSize = 10;
  public params: { pageNum: number, pageSize: number} = {
    pageNum: 1,
    pageSize: 10
  };
  public loading = false;
  private searchContent: string;
  constructor(private managerService: ManagerService,
              private msgService: NzMessageService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.getManagers(this.params);
  }

  search(content) {
    this.searchContent = content;
    this.getManagers(this.params, content);
  }
  refresh() {
    this.getManagers(this.params, this.searchContent);
  }
  createBtn() {
    this.openModal();
  }
  editBtn(manager: Manager) {
    this.openModal('编辑管理员', manager);
  }
  private openModal(title = '创建管理员', manager: Manager = null) {
    const that = this;
    const modalRef: NzModalRef = this.modalService.create({
      nzTitle: title,
      nzContent: ModalComponent,
      nzMaskClosable: false,
      nzComponentParams: {
        manager
      },
      nzOkDisabled: false,
      nzOnOk(modalComponent) {
        const form: FormGroup = modalComponent.formGroup;
        if (form.invalid) {
          return false;
        }
        if (manager) {
          that.editManager(manager.id, form.value);
        } else {
          that.createManager(form.value);
        }
      }
    });
  }
  private editManager(id: string, manager: Manager) {
    this.managerService.editManager(id, manager).subscribe((resp) => {
      this.msgService.success(`编辑管理员${resp.username}成功`, {
        nzDuration: 5000
      });
      this.getManagers(this.params);
    });
  }
  private createManager(manager: Manager) {
    this.managerService.addManager(manager).subscribe((resp) => {
      this.msgService.success(`添加管理员${resp.username}成功`, {
        nzDuration: 5000
      });
      this.getManagers(this.params);
    });
  }
  deleteBtn(manager: Manager, content: TemplateRef<any>) {
    const that = this;
    this.modalService.warning({
      nzTitle: '删除管理员',
      nzContent: content,
      nzCancelText: '确认',
      nzOkText: '取消',
      nzOnCancel() {
        that.deleteManager(manager);
      },
      nzOnOk() {}
    });
  }
  private deleteManager(manager: Manager) {
    this.managerService.deleteManager(manager.id).subscribe(() => {
      this.msgService.success(`删除管理员${manager.username}成功`, {
        nzDuration: 5000
      });
      this.getManagers(this.params);
    });
  }
  private getManagers(params: IPaginationQueryParams, username?: string) {
    this.loading = true;
    this.managerService.getManagers(params, username).subscribe((resp) => {
      this.loading = false;
      this.listOfData = resp.managers;
      this.totalNumber = resp.total;
    });
  }
}
