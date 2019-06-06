import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepieviewPage } from './recepieview.page';

describe('RecepieviewPage', () => {
  let component: RecepieviewPage;
  let fixture: ComponentFixture<RecepieviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepieviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepieviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
