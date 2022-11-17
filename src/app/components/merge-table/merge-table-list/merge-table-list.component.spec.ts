import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeTableListComponent } from './merge-table-list.component';

describe('MergeTableListComponent', () => {
  let component: MergeTableListComponent;
  let fixture: ComponentFixture<MergeTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeTableListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
