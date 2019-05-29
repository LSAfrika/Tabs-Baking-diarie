import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipesPage } from './my-recipes.page';

describe('MyRecipesPage', () => {
  let component: MyRecipesPage;
  let fixture: ComponentFixture<MyRecipesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRecipesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
