import { JointService } from './../shared/joint.service';
import { NodeValidator } from './../shared/customValidators';
import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { FlowbsterNode } from 'app/editor/models/flowbsterNode'

@Component({
  selector: 'toil-editor-node-properties',
  templateUrl: './node-properties.component.html',
  styleUrls: ['./node-properties.component.scss']
})
export class NodePropertiesComponent implements OnInit {

  userform: FormGroup;
  nodeProps: FlowbsterNode;

  isExistingNode: boolean;
  // @Input() isExistingNode: boolean;

  @Output() onUpdateDialog = new EventEmitter<FlowbsterNode>();
  @Output() onCreateDialog = new EventEmitter<FlowbsterNode>();
  @Output() onCloneDialog = new EventEmitter<FlowbsterNode>();
  @Output() NodePropsChange = new EventEmitter<FlowbsterNode>(); // not neccessary

  @ViewChild('f') myNgForm; // check issue#4190 on Angular material2 github site.

  @Input()
  get NodeProps() {
    return this.nodeProps;
  }

  set NodeProps(val: FlowbsterNode) {
    this.nodeProps = val;
    this.NodePropsChange.emit(this.nodeProps);
  }

  constructor(private fb: FormBuilder, private jointSVC: JointService) { }

  ngOnInit() {
    this.userform = this.initForm();

    this.jointSVC.isExistingNodeSubject.subscribe(
      next => this.isExistingNode = next,
      err => console.log(err),
      () => console.log('Completed')
    );
  }

  initForm() {
    return this.fb.group({
      'name': new FormControl('', Validators.required, NodeValidator.isUnique(this.jointSVC)), // TODO: custom validator for node match
      'execname': new FormControl('', Validators.required),
      'args': new FormControl(''),
      'execurl': new FormControl('', Validators.required),
      'scalingmin': new FormControl('1', [Validators.min(1), Validators.required]), // TODO:custom validator for  whole number
      'scalingmax': new FormControl('1', [Validators.min(1), Validators.required]) // TODO: custom validator for whole number
    });
  }

  // emits FlowbsterNode information from the component and resets the form.
  onCreate() {
    this.onCreateDialog.emit(this.userform.value);
    this.myNgForm.resetForm();
  }

  onUpdate() {
    this.onUpdateDialog.emit(this.userform.value);
    this.myNgForm.resetForm();
  }

  onClone() {
    this.onCloneDialog.emit(this.userform.value);
    this.myNgForm.resetForm();
  }

  // hasonlóra van szükség a isExistingNode-al egyetemben, de nem biztos hogy ez rendjén való.
  // this.userform.get('infraname').valueChanges.subscribe(
  //   (infraname: string) => {
  //     this.userform.get('infraname').setValidators([Validators.required, forbiddenNameValidator(this.jointSVC.getNodeNames())]);
  //     this.userform.get('infraname').updateValueAndValidity();
  //   }
  // );
}
