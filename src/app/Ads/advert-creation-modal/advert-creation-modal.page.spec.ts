import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertCreationModalPage } from './advert-creation-modal.page';

describe('AdvertCreationModalPage', () => {
  let component: AdvertCreationModalPage;
  let fixture: ComponentFixture<AdvertCreationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvertCreationModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertCreationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
