import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PockerPageComponent } from './pocker-page.component';

describe('PockerPageComponent', () => {
  let component: PockerPageComponent;
  let fixture: ComponentFixture<PockerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PockerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PockerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
