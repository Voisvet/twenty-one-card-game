import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsControlsComponent } from './chips-controls.component';

describe('ChipsControlsComponent', () => {
  let component: ChipsControlsComponent;
  let fixture: ComponentFixture<ChipsControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipsControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipsControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
