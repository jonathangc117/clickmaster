import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelHomeComponent } from './level-home.component';

describe('LevelHomeComponent', () => {
  let component: LevelHomeComponent;
  let fixture: ComponentFixture<LevelHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
